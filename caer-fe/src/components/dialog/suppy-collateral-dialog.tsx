"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Shield } from "lucide-react";
import { useWethBalance } from "@/hooks/useTokenBalance";
import { useSupplyCollateral } from "@/hooks/useSupplyCollateral";

interface SupplyDialogProps {
  token: string | undefined;
}

export default function SupplyDialogCol({ token }: SupplyDialogProps) {
  const wethBalance = useWethBalance();
  const { amount, setAmount, isOpen, setIsOpen, handleSupply, isProcessing } =
    useSupplyCollateral();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-[#141beb] hover:bg-blue-700 text-white font-medium shadow-md hover:shadow-lg transition-colors duration-300 rounded-lg cursor-pointer"
          size="lg"
        >
          Supply {token}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-gradient-to-b from-white to-slate-50 border-0 shadow-xl rounded-xl backdrop-blur-md">
        <DialogHeader className="pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-purple-500" />
            <DialogTitle className="text-xl font-bold text-slate-800">
              Supply {token} as Collateral
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <Card className="border border-slate-200 bg-white shadow-sm">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-slate-700">
                  Supply Amount
                </h3>
                <Badge
                  variant="outline"
                  className="bg-purple-50 text-purple-700 border-purple-200"
                >
                  Collateral
                </Badge>
              </div>

              <div className="flex items-center space-x-2 bg-slate-50 p-2 rounded-lg border border-slate-200">
                <Input
                  placeholder={`Enter amount of ${token} to supply`}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={isProcessing}
                  type="number"
                  min="0"
                  step="0.01"
                  className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-lg font-medium"
                />
                <div className="flex items-center gap-1 bg-slate-200 px-3 py-1 rounded-md">
                  <span className="font-semibold text-slate-700">{token}</span>
                </div>
              </div>

              <div className="mt-3 text-xs text-slate-500 flex justify-between items-center">
                <span className="mr-1">Your Balance:</span>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 mx-2">
                    {wethBalance} WETH
                  </span>
                  <button
                    onClick={() => setAmount(wethBalance)}
                    className="text-xs p-0.5 border border-purple-500 rounded-md text-purple-500 hover:bg-purple-200 cursor-pointer"
                  >
                    Max
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter>
          <Button
            onClick={handleSupply}
            disabled={isProcessing || !amount}
            className={`w-full h-12 text-base font-medium rounded-lg ${
              isProcessing
                ? "bg-slate-200 text-slate-500"
                : "bg-gradient-to-r from-[#01ECBE] to-[#141beb] hover:from-[#141beb] hover:to-[#01ECBE] text-white font-medium shadow-md hover:shadow-lg transition-colors duration-300 rounded-lg cursor-pointer"
            }`}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                <span>Processing Transaction...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Shield className="mr-2 h-5 w-5" />
                <span>{`Supply ${token} as Collateral`}</span>
              </div>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
