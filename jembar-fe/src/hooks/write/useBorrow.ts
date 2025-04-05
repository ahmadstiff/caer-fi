import { useState, useEffect } from "react";
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from "wagmi";
import { parseUnits } from "viem";
import { poolAbi } from "@/lib/abi/poolAbi";
import { lendingPool } from "@/constants/addresses";

export function useBorrow() {
  const { address } = useAccount();
  const [amount, setAmount] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  
  const {
    data: borrowHash,
    isPending: isBorrowPending,
    writeContract: borrowTransaction,
  } = useWriteContract();

  const { isLoading: isBorrowLoading, isSuccess } = useWaitForTransactionReceipt({
    hash: borrowHash,
  });

  const handleBorrow = async () => {
    try {
      if (!amount || Number.parseFloat(amount) <= 0) {
        throw new Error("Please enter a valid borrow amount");
      }
      
      const decimal = 6;
      const parsedAmount = parseUnits(amount, decimal);

      await borrowTransaction({
        address: lendingPool,
        abi: poolAbi,
        functionName: "borrowByPosition",
        args: [parsedAmount, address],
      });

      setAmount("");
    } catch (error) {
      console.error("Borrow error:", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
    }
  }, [isSuccess]);

  const isProcessing = isBorrowPending || isBorrowLoading;

  return {
    amount,
    setAmount,
    isOpen,
    setIsOpen,
    handleBorrow,
    isProcessing,
  };
}
