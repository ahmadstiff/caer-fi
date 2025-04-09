"use client";

import { useState } from "react";
import { useSignMessage, useAccount } from "wagmi";
import type { TransactionHandlerProps } from "@/types/type";
import {
  TransactionProgressModal,
  type TransactionStep,
} from "@/components/transaction-progress";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionSteps, setTransactionSteps] = useState<TransactionStep[]>(
    []
  );
  const [requestId, setRequestId] = useState("");

  // Helper function to get chain emoji
  const getChainEmoji = (chainName: string) => {
    const chainEmojis: Record<string, string> = {
      Arbitrum: "⚡",
      Base: "🔵",
      "Ca Chain": "🌐",
      Ethereum: "💎",
      Optimism: "🔴",
    };

    return chainEmojis[chainName] || "🔗";
  };

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

  const handleTransaction = async () => {
    try {
      // Validation checks
      if (!amount || Number.parseFloat(amount) <= 0) {
        alert("Please enter a valid amount to borrow.");
        return;
      }

      if (!recipientAddress) {
        alert("Please specify a recipient address.");
        return;
      }

      if (!address) {
        alert("Please connect your wallet before proceeding.");
        return;
      }

      onLoading(true);

      // Generate a unique request ID
      const newRequestId = `REQ-${Math.random()
        .toString(36)
        .substring(2, 10)
        .toUpperCase()}-${Date.now().toString().substring(9)}`;

      setRequestId(newRequestId);

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

      // Update first step to loading
      updateStepStatus("create", "loading");

      // Wait for signature
      const signature = await signMessageAsync({ message: messageToSign });

      // Update first step to completed and second to loading
      updateStepStatus("create", "completed", "0x8315...a1ab");
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

        // Update remaining steps
        updateStepStatus("finality", "completed");
        updateStepStatus("settlement", "loading");

        // Simulate waiting for settlement (in a real app, you'd listen for events)
        setTimeout(() => {
          updateStepStatus("settlement", "completed", txHash);
          updateStepStatus("final", "loading");

          // Simulate waiting for final confirmation
          setTimeout(() => {
            updateStepStatus("final", "completed");
            onSuccess();
          }, 2000);
        }, 3000);
      } else {
        // Handle error
        updateStepStatus("finality", "error");
        throw new Error(data.message || "Transaction failed");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      // Update steps to show error
      setTransactionSteps((prev) =>
        prev.map((step) =>
          step.status === "loading" ? { ...step, status: "error" } : step
        )
      );

      console.error("Transaction failed:", errorMessage);
    } finally {
      onLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return {
    handleTransaction,
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
