"use client";

import { useState } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { erc20Abi, parseUnits, Address } from "viem";
import { lendingPool } from "@/constants/addresses";
import { poolAbi } from "@/lib/abi/poolAbi";
import { toast } from "sonner";

interface SwapTokenParams {
  fromToken: {
    address: string;
    name: string;
    decimals: number;
  };
  toToken: {
    address: string;
    name: string;
    decimals: number;
  };
  fromAmount: string;
  toAmount: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  positionAddress: Address;
  arrayLocation: bigint;
}

export const useSwapToken = () => {
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { writeContract } = useWriteContract();

  const swapToken = async ({
    fromToken,
    toToken,
    fromAmount,
    toAmount,
    onSuccess,
    onError,
    positionAddress,
    arrayLocation,
  }: SwapTokenParams) => {
    if (!address) {
      setError("Please connect your wallet");
      return;
    }

    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    try {
      setError("");
      setIsLoading(true);

      // Calculate the amount with proper decimals
      const amountIn = parseUnits(fromAmount, fromToken.decimals);
      console.log("arrayLocation", arrayLocation);      

      // First approve the token spending
      await writeContract({
        address: fromToken.address as Address,
        abi: erc20Abi,
        functionName: "approve",
        args: [positionAddress, BigInt(amountIn)],
      });

      // Then perform the swap
      await writeContract({
        address: lendingPool,
        abi: poolAbi,
        functionName: "swapTokenByPosition",
        args: [
          toToken.address,
          fromToken.address,
          BigInt(amountIn),
          arrayLocation,
        ], // Position index 0
      });

      toast.success(
        `Swap successful: ${fromAmount} ${fromToken.name} to ${toAmount} ${toToken.name}`
      );

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error("Error during swap:", err);
      setError("Failed to execute swap. Please try again.");
      toast.error("Swap failed");

      if (onError && err instanceof Error) {
        onError(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    swapToken,
    isLoading,
    error,
    setError,
  };
};
