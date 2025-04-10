"use client";
import { CheckCircle, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { fetchTransactionData } from "@/lib/data/fetch-transaction-data";
import { useEffect, useState } from "react";

export type TransactionStep = {
  id: string;
  title: string;
  status: "pending" | "loading" | "completed" | "error";
  txHash?: string;
};

type TransactionProgressModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  steps: TransactionStep[];
  fromChain: string;
  toChain: string;
  amount: string;
  token: string;
};

export function TransactionProgressModal({
  isOpen,
  onClose,
  title,
  steps,
  fromChain,
  toChain,
  amount,
  token,
}: TransactionProgressModalProps) {
  const [transactionData, setTransactionData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const { data, error } = await fetchTransactionData();
      if (error) {
        setError(error);
      } else {
        setTransactionData(data);
      }
      setIsLoading(false);
    };

    getData();
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-white border border-gray-200 text-gray-800 shadow-lg">
        <DialogTitle className="text-xl font-bold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              {title}
            </span>
          </div>
        </DialogTitle>

        <div className="mt-2 space-y-1">
          <div className="text-sm text-gray-600 mb-3">
            Bridging {amount} {token} from {fromChain} to {toChain}
          </div>

          {steps.map((step) => (
            <div key={step.id} className="flex items-start gap-3 py-2">
              <div className="mt-0.5">
                {step.status === "completed" ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : step.status === "loading" ? (
                  <div className="flex items-center justify-center h-5 w-5">
                    <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
                  </div>
                ) : step.status === "error" ? (
                  <div className="flex items-center justify-center h-5 w-5 text-red-600">
                    ❌
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-5 w-5 text-gray-400">
                    <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                  </div>
                )}
              </div>

              <div className="flex-1">
                <p
                  className={cn(
                    "text-sm font-medium",
                    step.status === "completed"
                      ? "text-green-600"
                      : step.status === "loading"
                      ? "text-blue-600"
                      : step.status === "error"
                      ? "text-red-600"
                      : "text-gray-600"
                  )}
                >
                  {step.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {steps.some((step) => step.status === "completed") &&
          steps.every(
            (step) => step.status !== "loading" && step.status !== "pending"
          ) && (
            <div className="mt-4 pt-3 border-t border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  {steps.every((step) => step.status === "completed")
                    ? "Transaction completed successfully!"
                    : "Transaction completed with some issues."}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  USDC Token: 0xB55061A1c2dC4E5da0626371f3Bcd322d94aFE7a
                </p>
              </div>
            </div>
          )}
      </DialogContent>
    </Dialog>
  );
}
