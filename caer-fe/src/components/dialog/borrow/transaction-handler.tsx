"use client";

import { useState, useEffect, useRef } from "react";
import { useSignMessage, useAccount, useWriteContract } from "wagmi";
import type { TransactionHandlerProps } from "@/types/type";
import {
  TransactionProgressModal,
  type TransactionStep,
} from "@/components/transaction-progress";
import { toast } from "sonner";
import { poolAbi } from "@/lib/abi/poolAbi";
import { lendingPool } from "@/constants/addresses";
import { mockUsdc } from "@/constants/addresses";
import { erc20Abi } from "viem";

export default function useTransactionHandler({
  amount,
  token,
  fromChain,
  toChain,
  recipientAddress,
  onSuccess,
  onLoading,
}: TransactionHandlerProps) {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContract: borrowTransaction } = useWriteContract();
  const { writeContract: transferTransaction } = useWriteContract();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionSteps, setTransactionSteps] = useState<TransactionStep[]>(
    []
  );
  const [requestId, setRequestId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Use refs to track already-handled states to prevent repeated effect triggers
  const successHandled = useRef(false);
  const errorHandled = useRef(false);
  const onSuccessCalled = useRef(false);

  // Helper function to update a step's status
  const updateStepStatus = (
    stepId: string,
    status: "pending" | "loading" | "completed" | "error",
    txHash?: string
  ) => {
    setTransactionSteps((prev) =>
      prev.map((step) =>
        step.id === stepId
          ? { ...step, status, ...(txHash ? { txHash } : {}) }
          : step
      )
    );
  };

  // Reset refs when transaction starts
  useEffect(() => {
    if (isProcessing) {
      successHandled.current = false;
      errorHandled.current = false;
      onSuccessCalled.current = false;
    }
  }, [isProcessing]);

  // Cleanup function when component unmounts
  useEffect(() => {
    return () => {
      // Ensure we reset any callbacks if component unmounts during transaction
      if (isProcessing) {
        setIsProcessing(false);
        onLoading(false);
      }
    };
  }, [isProcessing, onLoading]);

  // Helper to call onSuccess only once
  const completeTransaction = () => {
    console.log("Cross-chain transaction completing");
    if (!onSuccessCalled.current) {
      onSuccessCalled.current = true;
      setIsProcessing(false);
      onLoading(false);

      // Slightly delay the onSuccess call to avoid state conflicts
      setTimeout(() => {
        if (onSuccess) {
          console.log("Calling onSuccess for cross-chain transaction");
          onSuccess();
        }
      }, 100);
    }
  };

  const handleTransaction = async () => {
    try {
      // Validation checks
      if (!amount || Number.parseFloat(amount) <= 0) {
        toast.error("Please enter a valid amount to borrow.");
        return;
      }

      if (!recipientAddress) {
        toast.error("Please specify a recipient address.");
        return;
      }

      if (!address) {
        toast.error("Please connect your wallet before proceeding.");
        return;
      }

      // Reset transaction state
      successHandled.current = false;
      errorHandled.current = false;
      onSuccessCalled.current = false;

      onLoading(true);
      setIsProcessing(true);

      // Initialize transaction steps
      const initialSteps: TransactionStep[] = [
        {
          id: "create",
          title: `Order created on origin chain (${fromChain.name})`,
          status: "pending",
        },
        {
          id: "finality",
          title: `Waiting for Espresso finality for created order on origin chain...`,
          status: "pending",
        },
        {
          id: "settlement",
          title: `Waiting for order to be settled on destination chain...`,
          status: "pending",
        },
        {
          id: "final",
          title: `Waiting for Espresso finality for settlement transaction...`,
          status: "pending",
        },
      ];

      setTransactionSteps(initialSteps);
      setIsModalOpen(true);

      // Update first step to loading
      updateStepStatus("borrow", "loading");

      // First borrow on-chain
      try {
        const parsedAmount = BigInt(Number(amount) * 1e6); // Convert to 6 decimals for USDC
        // Replace with actual lending pool address

        // Call borrow transaction
        await borrowTransaction({
          address: lendingPool,
          abi: poolAbi,
          functionName: "borrowByPosition",
          args: [
            parsedAmount,
            address as `0x${string}`, // Borrow to user's address first
          ],
        });

        // Update steps
        updateStepStatus("borrow", "completed");
        updateStepStatus("transfer", "loading");

        // Transfer borrowed amount to solver
        await transferTransaction({
          address: mockUsdc,
          abi: erc20Abi,
          functionName: "transferFrom",
          args: [
            address as `0x${string}`, // From user's address
            recipientAddress as `0x${string}`, // To solver address
            parsedAmount, // Same amount as borrowed
          ],
          gas: BigInt(15694186), // Custom gas fee for transfer
        });

        // Update steps
        updateStepStatus("transfer", "completed");
        updateStepStatus("create", "loading");

        // Continue with cross-chain bridge logic
        // Generate a unique request ID
        const newRequestId = `REQ-${Math.random()
          .toString(36)
          .substring(2, 10)
          .toUpperCase()}-${Date.now().toString().substring(9)}`;

        setRequestId(newRequestId);

        // Format timestamp in ISO format for better standardization
        const timestamp = new Date().toISOString();
        const readableDate = new Date().toLocaleString();

        // Calculate estimated gas fees
        const estimatedGasFee = (Number(amount) * 0.002).toFixed(6);

        // Enhanced professional message to sign
        const messageToSign = `
=== CAER FINANCE: SECURE CROSS-CHAIN BRIDGE REQUEST ===

REQUEST ID: ${newRequestId}
TIMESTAMP: ${readableDate}

TRANSACTION DETAILS:
• Amount: ${amount} ${token}
• From: ${fromChain.name} (Chain ID: ${fromChain.id})
• To: ${toChain.name} (Chain ID: ${toChain.id})
• Recipient: ${recipientAddress}
• Estimated Gas Fee: ~${estimatedGasFee} ${token}

SECURITY VERIFICATION:
• Wallet Address: ${address}
• Nonce: ${Date.now()}
• Request Hash: ${btoa(address + amount + timestamp).substring(0, 16)}

By signing this message, you authorize CAER Finance to process this cross-chain bridge transaction according to the details specified above. This signature does not authorize any other transactions or transfers.

IMPORTANT: CAER Finance will never ask you to sign messages for any purpose other than transaction authorization. Always verify transaction details before signing.

Ref: CF-${timestamp.substring(0, 10)}-${Math.random()
          .toString(36)
          .substring(2, 8)
          .toUpperCase()}
`;

        // Wait for signature
        const signature = await signMessageAsync({ message: messageToSign });

        // Update first step to completed and second to loading
        updateStepStatus("create", "completed");
        updateStepStatus("finality", "loading");

        // Send request to backend
        const response = await fetch(
          "https://caer-finance-sequencer.vercel.app/api/borrow",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              amount,
              userAddress: address,
              recipientAddress,
              fromChain: fromChain.id,
              toChain: toChain.id,
              signature,
              message: messageToSign,
              requestId: newRequestId,
            }),
          }
        );

        const data = await response.json();

        if (data.success) {
          // Format transaction hash for display
          const txHash = data.data?.transactionHash || "";
          console.log("txhash: ", txHash);

          // Update remaining steps
          updateStepStatus("finality", "completed");
          updateStepStatus("settlement", "loading");

          // Simulate waiting for settlement (in a real app, you'd listen for events)
          setTimeout(() => {
            updateStepStatus("settlement", "completed");
            updateStepStatus("final", "loading");

            // Simulate waiting for final confirmation
            setTimeout(() => {
              if (!successHandled.current) {
                successHandled.current = true;
                updateStepStatus("final", "completed");

                // Display success message and clean up
                toast.success(
                  `Successfully borrowed ${amount} ${token} from ${fromChain.name} to ${toChain.name}`
                );

                // Close the modal after success with delay
                setTimeout(() => {
                  setIsModalOpen(false);

                  // Complete the transaction after modal closes
                  setTimeout(() => {
                    completeTransaction();
                  }, 500);
                }, 2000);
              }
            }, 2000);
          }, 3000);
        } else {
          // Handle error
          if (!errorHandled.current) {
            errorHandled.current = true;
            updateStepStatus("finality", "error");
            toast.error(
              `Transaction failed: ${data.message || "Unknown error"}`
            );
            setIsProcessing(false);
            onLoading(false);
          }
        }
      } catch (error) {
        if (!errorHandled.current) {
          errorHandled.current = true;
          const errorMessage =
            error instanceof Error ? error.message : "Unknown error";

          // Update steps to show error
          setTransactionSteps((prev) =>
            prev.map((step) =>
              step.status === "loading" ? { ...step, status: "error" } : step
            )
          );

          console.error("Transaction failed:", errorMessage);
          toast.error(`Transaction failed: ${errorMessage}`);
          setIsProcessing(false);
          onLoading(false);
        }
      }
    } catch (error) {
      if (!errorHandled.current) {
        errorHandled.current = true;
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";

        // Update steps to show error
        setTransactionSteps((prev) =>
          prev.map((step) =>
            step.status === "loading" ? { ...step, status: "error" } : step
          )
        );

        console.error("Transaction failed:", errorMessage);
        toast.error(`Transaction failed: ${errorMessage}`);
        setIsProcessing(false);
        onLoading(false);
      }
    }
  };

  const closeModal = () => {
    if (!isProcessing) {
      setIsModalOpen(false);
    } else {
      toast.warning("Please wait for the transaction to complete");
    }
  };

  return {
    handleTransaction,
    isProcessing,
    TransactionProgress: (
      <TransactionProgressModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="CAER Finance Bridge Progress"
        steps={transactionSteps}
        fromChain={fromChain.name}
        toChain={toChain.name}
        amount={amount}
        token={token}
      />
    ),
  };
}
