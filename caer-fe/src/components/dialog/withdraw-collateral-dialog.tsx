"use client";

import { useEffect, useState } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { formatUnits, parseUnits } from "viem";
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
import { lendingPool, mockWeth } from "@/constants/addresses";
import { ArrowUpRight, Loader2, Wallet } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

import { Address } from "viem";

const useWethBalance = () => {
  const { address } = useAccount();
  const { data } = useReadContract({
    abi: mockErc20Abi,
    address: mockWeth,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
  });

  return data
    ? Number.parseFloat(formatUnits(BigInt(data as bigint), 18)).toFixed(2)
    : "0.00";
};

const useCollateralBalance = () => {
  const { address } = useAccount();
  const { data } = useReadContract({
    address: lendingPool,
    abi: poolAbi,
    functionName: "userCollaterals",
    args: address ? [address] : undefined,
  });

  return data ? Number(formatUnits(BigInt(data as bigint), 18)) : 0;
};

const AmountInput = ({
  value,
  onChange,
  token,
  label,
  collateralBalance,
}: any) => {
  return (
    <Card className="border border-slate-200 bg-white shadow-sm">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-slate-700">{label}</h3>
          <Badge
            variant="outline"
            className="bg-purple-50 text-purple-700 border-purple-200"
          >
            Withdraw
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
            <Wallet className="h-4 w-4 text-slate-700" />
            <span className="font-semibold text-slate-700">
              {token.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="mt-3 text-xs text-slate-500 flex items-center justify-between">
          <div>
            <span>Your Collateral : </span>
            <span className="font-medium">
              {collateralBalance < 1 / 1e15 ? 0 : collateralBalance}
              $WETH
            </span>
          </div>
          <button
            className="text-xs p-1 text-purple-700 border border-purple-700 rounded-md hover:bg-purple-400 cursor-pointer"
            onClick={() => onChange(collateralBalance)}
          >
            max
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export const WithdrawDialog = () => {
  const [wethAmount, setWethAmount] = useState("0");
  const [isOpen, setIsOpen] = useState(false);
  const wethBalance = useWethBalance();
  const collateralBalance = useCollateralBalance();

  

  const { writeContract, isPending } = useWriteContract();

  const handleWithdraw = async () => {
    if (!wethAmount || Number.parseFloat(wethAmount) <= 0) {
      toast.error("Please enter a valid amount to withdraw");
      return;
    }

    const amount = Number(wethAmount) * 10 ** 18;

    try {
      await writeContract({
        address: lendingPool,
        abi: poolAbi,
        functionName: "withdrawCollateral",
        args: [amount],
      });

      toast.success("Withdrawal in progress...");
      setWethAmount("0");
    } catch (error) {
      toast.error("Withdrawal failed. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-[#141beb] hover:bg-blue-700 text-white font-medium shadow-md hover:shadow-lg transition-colors duration-300 rounded-lg border-0 cursor-pointer"
          size="lg"
        >
          <ArrowUpRight className="mr-2 h-5 w-5" /> Withdraw
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-gradient-to-b from-white to-slate-50 border-0 shadow-xl rounded-xl">
        <DialogHeader className="pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <ArrowUpRight className="h-6 w-6 text-purple-500" />
            <DialogTitle className="text-xl font-bold text-slate-800">
              Withdraw Collateral
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <AmountInput
            value={wethAmount}
            onChange={setWethAmount}
            token="weth"
            label="Withdraw Amount"
            collateralBalance={collateralBalance}
          />

          <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
            <div className="flex items-start">
              <div className="bg-purple-100 p-1 rounded-full mr-2">
                <Wallet className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <h4 className="text-xs font-medium text-purple-700 mb-1">
                  Withdrawal Information
                </h4>
                <p className="text-xs text-purple-600">
                  Withdrawing collateral may affect your borrowing capacity.
                  Ensure you maintain a healthy position to avoid liquidation.
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleWithdraw}
            disabled={
              isPending || !wethAmount || Number.parseFloat(wethAmount) <= 0 || collateralBalance == 0
            }
            className={`w-full h-12 text-base font-medium rounded-lg ${
              isPending
                ? "bg-slate-200 text-slate-500"
                : "bg-gradient-to-r from-[#01ECBE] to-[#141beb] hover:from-[#141beb] hover:to-[#01ECBE] text-white font-medium shadow-md hover:shadow-lg transition-colors duration-300 rounded-lg cursor-pointer"
            }`}
          >
            {isPending ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <ArrowUpRight className="mr-2 h-5 w-5" />
            )}
            Withdraw WETH
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
