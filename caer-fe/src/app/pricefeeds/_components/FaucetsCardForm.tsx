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
import {
  useReadContract,
  useWriteContract,
} from "wagmi";
import { priceAbi } from "@/lib/abi/price-abi";
import { priceFeed } from "@/constants/addresses";

const FaucetsCardForm = () => {
  const [selectedToken, setSelectedToken] = useState<string>("");
  const { isPending: isTransactionPending, writeContract: writeTransaction } =
    useWriteContract();

  //read price basefeed on pricefeed contract
  const { data: price } = useReadContract({
    address: priceFeed,
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
    fetchData(
      `https://min-api.cryptocompare.com/data/price?fsym=${tokenName}&tsyms=USD`
    )
      .then((data) =>
        writeTransaction({
          abi: priceAbi,
          address: priceFeed,
          functionName: "addPriceManual",
          args: [
            `${tokenName}/USD`,
            selectedToken,
            data?.USD * 10 ** 8,
            decimal,
          ],
        })
      )
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Failed to priceFeeds");
      })
      .finally(() => {
        setSelectedToken("");
        toast.success("PriceFeeds successfully");
      });
  };
  return (
    <div>
      <div className="px-7 w-full">
        <Select value={selectedToken} onValueChange={setSelectedToken}>
          <SelectTrigger className="w-full bg-white border-[#01ECBE]/30 text-[#07094d]">
            <SelectValue placeholder="Select a token" />
          </SelectTrigger>
          <SelectContent className="bg-white border-[#01ECBE]/30">
            <SelectGroup>
              <SelectLabel className="text-[#07094d]">Tokens</SelectLabel>
              {TOKEN_OPTIONS.map((token, index) => (
                <SelectItem
                  className="transition-colors duration-100 cursor-pointer"
                  key={index}
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
          className="w-full bg-[#141beb] text-white hover:bg-[#141beb]/80 cursor-pointer mt-5 transition-colors duration-300"
        >
          {isTransactionPending ? "Loading..." : "Pricefeeds"}
        </Button>
        <p className="text-sm text-[#07094d]/70 mt-2">
          Now you can see the price of the token in the price feed{" "}
          {price?.[1]
            ? Number(price[1]) /
              10 ** 8
            : 0} USD
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
