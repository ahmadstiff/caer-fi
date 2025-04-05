import { lendingPool } from "@/constants/addresses";
import { poolAbi } from "@/lib/abi/poolAbi";
import { useAccount, useReadContract } from "wagmi";

export const useBorrowBalance = () => {
  const { address } = useAccount();
  const { data: borrowBalance } = useReadContract({
    address: lendingPool,
    abi: poolAbi,
    functionName: "userBorrowShares",
    args: [address],
  });

  return borrowBalance ? Number(borrowBalance) / 1e6 : "0.00";
};
