"use client";

import { useState } from "react";
import { useWriteContract } from "wagmi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { mockErc20Abi } from "@/lib/abi/mockErc20Abi";
import { poolAbi } from "@/lib/abi/poolAbi";
import { lendingPool, mockUsdc } from "@/constants/addresses";
import { ArrowDown, CreditCard, DollarSign, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useReadLendingData } from "@/hooks/read/useReadLendingData";

const AmountInput = ({ value, onChange, token, label }: any) => {
  const { userBorrow } = useReadLendingData();
  return (
    <Card className="border border-slate-200 bg-white shadow-sm">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-slate-700">{label}</h3>
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            Repay
          </Badge>
        </div>

        <div className="flex items-center space-x-2 bg-slate-50 p-2 rounded-lg border border-slate-200">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-lg font-medium"
            placeholder="0.00"
          />
          <div className="flex items-center gap-1 bg-slate-200 px-3 py-1 rounded-md">
            <DollarSign className="h-4 w-4 text-slate-700" />
            <span className="font-semibold text-slate-700">{token}</span>
          </div>
        </div>

        <div className="mt-3 text-xs text-slate-500 flex items-center justify-between">
          <span className="text-sm text-blue-700">Debt :</span>
          <div className="flex items-center text-xs gap-2">
            <span>{userBorrow ? Number(userBorrow) / 1e6 : "0.00"} $USDC</span>
            <button
              className="text-xs p-0.5 text-blue-500 rounded-md border border-blue-500 hover:bg-blue-300 cursor-pointer"
              onClick={() =>
                onChange(userBorrow ? Number(userBorrow) / 1e6 : "0.00")
              }
            >
              Max
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const RepayDialog = () => {
  const { totalBorrowAssets, totalBorrowShares, userSupply, userBorrow } =
    useReadLendingData();
  const [usdcAmount, setUsdcAmount] = useState("0");
  const [isOpen, setIsOpen] = useState(false);
  const { writeContract, isPending } = useWriteContract();

  const handleApproveAndRepay = async () => {
    if (!usdcAmount || Number(usdcAmount) <= 0) {
      console.error("Please enter a valid amount to repay");
      return;
    }

    setIsOpen(true);
    const amount = Number(usdcAmount) * 1e6;
    const result = Math.round(
      (amount * Number(totalBorrowAssets)) / Number(totalBorrowShares) + amount
    );

    try {
      await writeContract({
        address: mockUsdc,
        abi: mockErc20Abi,
        functionName: "approve",
        args: [lendingPool, BigInt(result)],
      });

      await writeContract({
        address: lendingPool,
        abi: poolAbi,
        functionName: "repayByPosition",
        args: [amount],
      });

      setUsdcAmount("0");
      setIsOpen(false);
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  const debtEquals = () => {
    if (
      !totalBorrowAssets ||
      !totalBorrowShares ||
      !userBorrow ||
      Number(totalBorrowShares) === 0
    ) {
      return 0;
    }
    return (
      (Number(userBorrow) * Number(totalBorrowAssets)) /
      Number(totalBorrowShares)
    );
  };

  return (
    <Dialog open={isOpen || isPending} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-[#141beb] hover:bg-blue-700 text-white font-medium shadow-md hover:shadow-lg transition-colors duration-300 rounded-lg border-0 cursor-pointer"
          size="lg"
        >
          Repay $USDC
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-gradient-to-b from-white to-slate-50 border-0 shadow-xl rounded-xl">
        <DialogHeader className="pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <ArrowDown className="h-6 w-6 text-blue-500" />
            <DialogTitle className="text-xl font-bold text-slate-800">
              Repay Loan
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <AmountInput
            value={usdcAmount}
            onChange={setUsdcAmount}
            token="Shares"
            label="Repay Amount"
          />
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
            <div className="flex items-start">
              <div className="bg-blue-100 p-1 rounded-full mr-2">
                <CreditCard className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h4 className="text-xs font-medium text-blue-700 mb-1">
                  Repayment Information
                </h4>
                <p className="text-xs text-blue-600">
                  Debt: {userBorrow ? Number(userBorrow) / 1e6 : "0.00"} Shares
                </p>
                <p className="text-xs text-blue-600 mt-3">
                  Equals to {debtEquals() / 1e6} USDC
                </p>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleApproveAndRepay}
            disabled={isPending || !usdcAmount || Number(usdcAmount) <= 0}
            className="w-full h-12 text-base font-medium rounded-lg cursor-pointer"
          >
            {isPending ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <ArrowDown className="mr-2 h-5 w-5" />
            )}{" "}
            Repay
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
