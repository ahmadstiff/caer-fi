"use client";

import { useReadContract } from "wagmi";
import { Address } from "viem";
import { priceAbi } from "@/lib/abi/price-abi";
import { priceFeed } from "@/constants/addresses";
import { TOKEN_OPTIONS } from "@/constants/tokenOption";

export const useTokenPrice = (
  fromTokenAddress: Address,
  toTokenAddress: Address
) => {
  const {
    data: price,
    isLoading,
    error,
  } = useReadContract({
    address: priceFeed,
    abi: priceAbi,
    functionName: "getPrice",
    args: [fromTokenAddress, toTokenAddress],
  });

  // Convert price from contract format (usually with 6 decimals precision)
  const formattedPrice = price
    ? Number(price) /
      10 **
        (TOKEN_OPTIONS.find((token) => token.address === toTokenAddress)
          ?.decimals ?? 18)
    : 0;

  return {
    price: formattedPrice,
    isLoading,
    error,
    rawPrice: price,
  };
};

export const usePriceTrade = (
  fromTokenAddress: Address,
  toTokenAddress: Address
) => {
  const { data, isLoading, error } = useReadContract({
    address: priceFeed,
    abi: priceAbi,
    functionName: "getPriceTrade",
    args: [fromTokenAddress, toTokenAddress],
  });

  // Extract prices from the tuple returned by getPriceTrade
  const fromPrice = data && Array.isArray(data) ? Number(data[0]) / 10 ** 6 : 0;
  const toPrice = data && Array.isArray(data) ? Number(data[1]) / 10 ** 6 : 0;

  return {
    fromPrice,
    toPrice,
    isLoading,
    error,
    rawData: data,
  };
};
