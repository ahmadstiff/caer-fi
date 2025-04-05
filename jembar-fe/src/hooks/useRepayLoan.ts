import { useState, useMemo } from "react";
import { useWriteContract, useReadContract, useAccount } from "wagmi";
import { useBorrowBalance } from "./useBorrowBalance";
import { poolAbi } from "@/lib/abi/poolAbi";
import { lendingPool, mockUsdc, priceFeed } from "@/constants/addresses";
import { mockErc20Abi } from "@/lib/abi/mockErc20Abi";
import { priceAbi } from "@/lib/abi/price-abi";
import { useReadLendingData } from "./read/useReadLendingData";

interface UseRepayLoanProps {
  tokenAddress: `0x${string}`;
}

export const useRepayLoan = ({ tokenAddress }: UseRepayLoanProps) => {
  const [valueAmount, setValueAmount] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const borrowBalance = useBorrowBalance();
  const { writeContract, isPending } = useWriteContract();
  const { address } = useAccount();
  const { totalBorrowAssets, totalBorrowShares } = useReadLendingData(
    address,
    tokenAddress
  );

  // Fetch Real-time Price
  const { data: realPrice } = useReadContract({
    address: priceFeed,
    abi: priceAbi,
    functionName: "getPrice",
    args: [tokenAddress, mockUsdc],
  });

  // Calculate Debt Equivalent in USDC
  const debtEquals = () => {
    if (
      !totalBorrowAssets ||
      !totalBorrowShares ||
      !borrowBalance ||
      Number(totalBorrowShares) === 0
    ) {
      return 0;
    }
    return Number(
      (Number(borrowBalance) * Number(totalBorrowAssets)) /
        Number(totalBorrowShares)
    );
  };

  const handleApproveAndRepay = async () => {
    if (!valueAmount || Number(valueAmount) <= 0) {
      alert("Please enter a valid amount to repay");
      return;
    }

    const amount = BigInt(Math.round(Number(valueAmount) * 1e6)); // Convert to USDC precision
    const approvalAmount = amount * BigInt(2); // Approving twice to ensure full coverage

    try {
      await writeContract({
        address: mockUsdc,
        abi: mockErc20Abi,
        functionName: "approve",
        args: [lendingPool, approvalAmount],
      });

      await writeContract({
        address: lendingPool,
        abi: poolAbi,
        functionName: "repayWithSelectedToken",
        args: [amount, address],
      });

      setValueAmount("");
      setIsOpen(false);
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Transaction failed. Check the console for more details.");
    }
  };

  return {
    valueAmount,
    setValueAmount,
    isOpen,
    setIsOpen,
    realPrice: realPrice ? Number(realPrice) / 1e6 : 1,
    debtEquals,
    handleApproveAndRepay,
    isPending,
  };
};
