import { useState, useEffect } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseUnits } from "viem";
import { mockErc20Abi } from "@/lib/abi/mockErc20Abi";
import { poolAbi } from "@/lib/abi/poolAbi";
import { lendingPool, mockWeth } from "@/constants/addresses";

export function useSupplyCollateral() {
  const [amount, setAmount] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);

  const {
    data: approveHash,
    isPending: isApprovePending,
    writeContract: approveTransaction,
  } = useWriteContract();

  const {
    data: supplyHash,
    isPending: isSupplyPending,
    writeContract: supplyTransaction,
  } = useWriteContract();

  const { isLoading: isApproveLoading } = useWaitForTransactionReceipt({
    hash: approveHash,
  });
  const { isLoading: isSupplyLoading, isSuccess } =
    useWaitForTransactionReceipt({ hash: supplyHash });

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
      setIsBlurred(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isOpen) {
      setIsBlurred(true);
    } else {
      setTimeout(() => setIsBlurred(false), 300);
    }
  }, [isOpen]);

  const handleSupply = async () => {
    try {
      if (!amount || Number.parseFloat(amount) <= 0) {
        alert("Please enter a valid amount to supply");
        return;
      }

      const parsedAmount = parseUnits(amount.toString(), 18);

      await approveTransaction({
        abi: mockErc20Abi,
        address: mockWeth,
        functionName: "approve",
        args: [lendingPool, parsedAmount],
      });

      await supplyTransaction({
        address: lendingPool,
        abi: poolAbi,
        functionName: "supplyCollateralByPosition",
        args: [parsedAmount],
      });
      setAmount("");
    } catch (error) {
      alert("Supply error:");
    }
  };

  const isProcessing =
    isApprovePending || isSupplyPending || isApproveLoading || isSupplyLoading;

  return {
    amount,
    setAmount,
    isOpen,
    setIsOpen,
    isBlurred,
    handleSupply,
    isProcessing,
  };
}
