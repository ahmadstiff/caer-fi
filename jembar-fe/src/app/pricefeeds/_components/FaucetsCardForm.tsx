"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TOKEN_OPTIONS } from "@/constants/tokenOption";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { mockErc20Abi } from "@/lib/abi/mockErc20Abi";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { priceAbi } from "@/lib/abi/price-abi";
import { priceFeed } from "@/constants/addresses";

const FaucetsCardForm = () => {
  const { address } = useAccount();
  const [selectedToken, setSelectedToken] = useState<string>("");
  const { isPending: isTransactionPending, writeContract: writeTransaction } =
    useWriteContract();

  //read price basefeed on pricefeed contract
  const { data: price } = useReadContract({
    address: priceFeed as `0x${string}`,
    abi: priceAbi,
    functionName: "tokenPrices",
    args: [selectedToken],
  }) as { data: [any, bigint] | undefined };

  const handlePriceFeeds = () => {
    if (!selectedToken) {
      toast.error("Please select a token");
      console.log("Please select a token");
      return;
    }

    const decimal = TOKEN_OPTIONS.find(
      (token) => token.address === selectedToken
    )?.decimals;
    const tokenName = TOKEN_OPTIONS.find(
      (token) => token.address === selectedToken
    )?.namePrice;
    try {
      fetchData(
        `https://min-api.cryptocompare.com/data/price?fsym=${tokenName}&tsyms=USD`
      )
        .then((data) =>
          writeTransaction({
            abi: priceAbi,
            address: priceFeed as `0x${string}`,
            functionName: "addPriceManual",
            args: [
              `${tokenName}/USD`,
              selectedToken,
              data?.USD * 10 ** 8,
              decimal,
            ],
          })
        )
        .catch((error) => console.error("Error:", error));
    } catch (error) {
      console.error(error);
      toast.error("Failed to priceFeeds");
    } finally {
      setSelectedToken("");
      toast.success("PriceFeeds successfully");
    }
  };
  return (
    <div>
      <div className="px-7 w-full">
        <Select value={selectedToken} onValueChange={setSelectedToken}>
          <SelectTrigger className="w-full bg-slate-900/90 border-slate-800 text-slate-100">
            <SelectValue placeholder="Select a token" />
          </SelectTrigger>
          <SelectContent className="bg-slate-200 border-0">
            <SelectGroup>
              <SelectLabel className="text-slate-800">Tokens</SelectLabel>
              {TOKEN_OPTIONS.map((token) => (
                <SelectItem
                  className="transition-colors duration-100 cursor-pointer"
                  key={token.address}
                  value={token.address}
                >
                  {token.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button
          onClick={handlePriceFeeds}
          className="w-full bg-blue-950/90 text-blue-400 border-blue-800 hover:bg-blue-800/50 cursor-pointer mt-5 transition-colors duration-300"
        >
          {isTransactionPending ? "Loading..." : "Pricefeeds"}
        </Button>
        <p className="text-sm text-slate-500 mt-2">
          Now you can see the price of the token in the price feed{" "}
          {price?.[1]
            ? Number(price[1]) /
              10 **
                (TOKEN_OPTIONS.find((token) => token.address === selectedToken)
                  ?.decimals ?? 18)
            : 0}
        </p>
      </div>
    </div>
  );
};

const fetchData = async (url: string): Promise<any> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
    throw error;
  }
};

export default FaucetsCardForm;
