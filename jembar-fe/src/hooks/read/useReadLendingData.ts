import { useAccount, useReadContract } from "wagmi";
import { poolAbi } from "@/lib/abi/poolAbi";
import { Address } from "viem";
import { lendingPool } from "@/constants/addresses";

export const useReadLendingData = (
  userAddress?: Address,
  tokenAddress?: Address
) => {
  const { address } = useAccount();

  const { data: checkAvailability } = useReadContract({
    address: lendingPool,
    abi: poolAbi,
    functionName: "addressPosition",
    args: [address],
  });

  const { data: borrowAddress } = useReadContract({
    address: lendingPool,
    abi: poolAbi,
    functionName: "borrowToken",
  });

  const { data: collateralAddress } = useReadContract({
    address: lendingPool,
    abi: poolAbi,
    functionName: "collateralToken",
  });

  const { data: totalSupplyAssets } = useReadContract({
    address: lendingPool,
    abi: poolAbi,
    functionName: "totalSupplyAssets",
    args: [],
  });
  const { data: tokenBalanceByPosition } = useReadContract({
    address: lendingPool,
    abi: poolAbi,
    functionName: "getTokenBalancesByPosition",
    args: [tokenAddress],
  });

  const { data: totalBorrowAssets } = useReadContract({
    address: lendingPool,
    abi: poolAbi,
    functionName: "totalBorrowAssets",
    args: [],
  });
  const { data: totalBorrowShares } = useReadContract({
    address: lendingPool,
    abi: poolAbi,
    functionName: "totalBorrowShares",
    args: [],
  });
  const { data: totalSupplyShares } = useReadContract({
    address: lendingPool,
    abi: poolAbi,
    functionName: "totalSupplyShares",
    args: [],
  });

  const { data: userCollateral } = useReadContract({
    address: lendingPool,
    abi: poolAbi,
    functionName: "userCollaterals",
    args: [address],
  });

  const { data: userSupply } = useReadContract({
    address: lendingPool,
    abi: poolAbi,
    functionName: "userSupplyShares",
    args: [address],

  });

  const { data: supplyAssets } = useReadContract({
    address: lendingPool,
    abi: poolAbi,
    functionName: "totalSupplyAssets",
    args: [],
  });
  const { data: userBorrow } = useReadContract({
    address: lendingPool,
    abi: poolAbi,
    functionName: "userBorrowShares",
    args: [address],
  });
  return {
    checkAvailability,
    totalSupplyAssets,
    totalSupplyShares,
    collateralAddress,
    borrowAddress,
    userCollateral,
    tokenBalanceByPosition,
    totalBorrowAssets,
    totalBorrowShares,
    userSupply,
    userBorrow,
  };
};
