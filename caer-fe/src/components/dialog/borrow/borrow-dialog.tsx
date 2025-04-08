// BorrowingDialog.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { CreditCard } from "lucide-react";
import ChainSelectorButton from "./chain-selector-button";
import AmountInput from "./amount-input";
import RecipientInput from "./recipient-input";
import type { Chain } from "@/types/type";
import { useAccount, useSignMessage } from "wagmi";
import useTransactionHandler from "./transaction-handler";

interface BorrowingDialogProps {
  token?: string;
}

export default function BorrowDialog({ token = "USDC" }: BorrowingDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [fromChain, setFromChain] = useState<Chain>({
    id: 42161,
    name: "Arbitrum",
    type: "Testnet",
    logoUrl: "/arbitrum-arb-logo.png",
  });
  const [toChain, setToChain] = useState<Chain>({
    id: 8453,
    name: "Base",
    type: "Testnet",
    logoUrl: "/base-logo.png",
  });
  const [amount, setAmount] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const { handleTransaction } = useTransactionHandler({
    amount,
    token,
    fromChain,
    toChain,
    recipientAddress,
    onSuccess: () => setIsOpen(false),
    onLoading: setIsLoading,
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-gradient-to-r from-indigo-400 to-blue-600 text-white shadow-md rounded-lg"
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
              Cross-Chain Borrow {token}
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
          <RecipientInput
            value={recipientAddress}
            onChange={setRecipientAddress}
          />
        </div>

        <DialogFooter>
          <Button
            onClick={handleTransaction}
            className="w-full bg-gradient-to-r from-indigo-400 to-blue-600 text-white rounded-lg"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : `Borrow ${token}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
