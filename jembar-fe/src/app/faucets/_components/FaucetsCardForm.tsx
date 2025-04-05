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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { mockErc20Abi } from "@/lib/abi/mockErc20Abi";
import { useAccount, useWriteContract } from "wagmi";
const FaucetsCardForm = () => {
  const { address } = useAccount();
  const [selectedToken, setSelectedToken] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [isClaiming, setIsClaiming] = useState<boolean>(false);
  const { writeContract } = useWriteContract();

  const handleClaim = () => {
    if (!selectedToken || !amount) {
      toast.error("Please select a token and enter an amount");
      console.log("Please select a token and enter an amount");
      return;
    }
    setIsClaiming(true);
    const decimal = TOKEN_OPTIONS.find(
      (token) => token.address === selectedToken
    )?.decimals;
    try {
      setIsClaiming(false);
      writeContract({
        address: selectedToken as `0x${string}`,
        abi: mockErc20Abi,
        functionName: "mint",
        args: [address, BigInt(amount) * BigInt(10 ** (decimal ?? 18))],
      });
      toast.success("Claimed successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to claim");
    } finally {
      setIsClaiming(false);
      setAmount("");
      setSelectedToken("");
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
        <Input
          value={amount}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "" || /^\d*\.?\d*$/.test(value)) {
              setAmount(value);
            }
          }}
          className="w-full bg-slate-900/90 border-slate-800 text-slate-100 mt-5"
          placeholder="0.00"
        />
        <Button
          onClick={handleClaim}
          className="w-full bg-blue-950/90 text-blue-400 border-blue-800 hover:bg-blue-800/50 cursor-pointer mt-5 transition-colors duration-300"
        >
          {isClaiming ? "Claiming..." : "Claim"}
        </Button>
        {/* add token address to your wallet*/}

        {/* selectedt token copy shortcut */}
        {selectedToken ? (
          <p className="text-slate-100 text-sm mt-5">
            Add token address to your wallet:{" "}
            <button
              className="text-blue-400 cursor-pointer hover:underline"
              onClick={() => {
                navigator.clipboard.writeText(selectedToken);
                toast.success("Token address copied to clipboard");
              }}
              title="Click to copy"
            >
              {selectedToken}
            </button>
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default FaucetsCardForm;
