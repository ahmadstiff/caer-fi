"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { CreditCard, Copy } from "lucide-react";
import ChainSelectorButton from "./chain-selector-button";
import AmountInput from "./amount-input";
import RecipientInput from "./recipient-input";
import type { Chain } from "@/types/type";
import useTransactionHandler from "./transaction-handler";
import useOnChainTransactionHandler from "./onchain-transaction-handler";
import { BorrowingDialogProps } from "@/types/type";
import { toast } from "sonner";

export default function BorrowDialog({ token = "USDC" }: BorrowingDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [fromChain, setFromChain] = useState<Chain>({
    id: 656476,
    name: "Edu Chain",
    type: "Testnet",
    logoUrl: "/edu.png",
  });
  const [toChain, setToChain] = useState<Chain>({
    id: 656476,
    name: "Edu Chain",
    type: "Testnet",
    logoUrl: "/edu.png",
  });
  const [amount, setAmount] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [txCompleted, setTxCompleted] = useState(false);

  const isOnChainTransaction = fromChain.id === 656476 && toChain.id === 656476;

  const resetForm = useCallback(() => {
    setAmount("");
    setRecipientAddress("");
    setIsLoading(false);
    setTxCompleted(false);
  }, []);

  // Handle transaction success - must include setIsOpen in dependencies
  const handleTransactionSuccess = useCallback(() => {
    console.log("Transaction success callback triggered");
    setTxCompleted(true);
    setIsLoading(false);

    // Set timeout to close dialog
    setTimeout(() => {
      console.log("Closing dialog after success");
      setIsOpen(false);
    }, 2000);
  }, [setIsOpen]); // Include setIsOpen in dependencies

  // Use the appropriate transaction handler based on the chains
  const onChainHandler = useOnChainTransactionHandler({
    amount,
    token,
    fromChain,
    toChain,
    recipientAddress,
    onSuccess: handleTransactionSuccess,
    onLoading: setIsLoading,
  });

  const crossChainHandler = useTransactionHandler({
    amount,
    token,
    fromChain,
    toChain,
    recipientAddress,
    onSuccess: handleTransactionSuccess,
    onLoading: setIsLoading,
  });

  // Choose the appropriate handler based on the transaction type
  const handler = isOnChainTransaction ? onChainHandler : crossChainHandler;
  const handleTransaction = handler.handleTransaction;
  const TransactionProgress = handler.TransactionProgress;

  const processingState =
    "isProcessing" in handler && typeof handler.isProcessing === "boolean"
      ? handler.isProcessing
      : false;

  // Handle dialog closing with proper access to current state
  const handleDialogChange = useCallback(
    (open: boolean) => {
      // Only allow closing when not processing
      if ((isLoading || processingState) && !open) {
        console.log("Preventing dialog close during processing");
        return;
      }

      // Allow dialog to close and reset state
      console.log("Dialog change:", open);
      setIsOpen(open);
    },
    [isLoading, processingState]
  );

  // Effect to handle dialog open/close
  useEffect(() => {
    if (!isOpen) {
      console.log("Dialog closed, resetting form");
      // Small delay to prevent state updates during render
      const timer = setTimeout(() => {
        resetForm();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, resetForm]);

  // Effect to monitor txCompleted state
  useEffect(() => {
    if (txCompleted) {
      console.log("Transaction completed, will close dialog soon");
    }
  }, [txCompleted]);

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button
          className="bg-[#141beb] hover:bg-blue-700 text-white font-medium shadow-md hover:shadow-lg transition-colors duration-300 rounded-lg cursor-pointer"
          size="lg"
        >
          Borrow ${token}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-gradient-to-b from-white to-slate-50 shadow-xl rounded-xl">
        <DialogHeader className="pb-2 border-b">
          <div className="flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-blue-500" />
            <DialogTitle className="text-xl font-bold text-slate-800">
              {isOnChainTransaction ? "On-Chain Borrow" : "Cross-Chain Borrow"}{" "}
              {token}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <ChainSelectorButton
            fromChain={fromChain}
            toChain={toChain}
            setFromChain={setFromChain}
            setToChain={setToChain}
          />
          <AmountInput token={token} value={amount} onChange={setAmount} />

          {/* Only show recipient input for cross-chain transactions */}
          {!isOnChainTransaction && (
            <>
              <RecipientInput
                value={recipientAddress}
                onChange={setRecipientAddress}
              />
              <div className="p-3 bg-blue-50 rounded-lg">
                <>
                  <span className="text-sm text-blue-600">
                    <strong>Important: </strong>For cross-chain borrowing,
                    please use this gas limit:{" "}
                  </span>
                  <span
                    className="cursor-pointer text-sm text-blue-700 text-bold hover:text-blue-800"
                    onClick={() => {
                      navigator.clipboard.writeText("15694186");
                      toast.success("Gas limit copied to clipboard!");
                    }}
                  >
                    15694186 <Copy className="inline-block w-3 h-3 ml-1" />
                  </span>
                </>
              </div>
            </>
          )}

          {isOnChainTransaction && (
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-600">
                <strong>On-chain Transaction:</strong> Borrowing directly on Edu
                Chain using your position.
              </p>
            </div>
          )}

          {txCompleted && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg animate-pulse">
              <p className="text-sm text-green-600 text-center font-medium">
                Transaction completed successfully! Closing dialog...
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            onClick={handleTransaction}
            className="w-full bg-gradient-to-r from-[#141beb] to-[#01ECBE] hover:from-[#01ECBE] hover:to-[#141beb] text-white font-medium shadow-md hover:shadow-lg transition-colors duration-300 rounded-lg cursor-pointer"
            disabled={isLoading || processingState || txCompleted || !amount}
          >
            {isLoading || processingState
              ? "Processing..."
              : txCompleted
              ? "Completed"
              : `Borrow ${token}`}
            {TransactionProgress}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
