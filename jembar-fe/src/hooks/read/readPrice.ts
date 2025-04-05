import { priceFeed } from "@/constants/addresses";
import { priceAbi } from "@/lib/abi/price-abi";
import { useReadContract } from "wagmi";

export const usePriceBorrow = (address: any) => {
  const { data: price } = useReadContract({
    address: priceFeed,
    abi: priceAbi,
    functionName: "priceBorrow",
    args: [address],
  });
  return price ?? 0;
};
