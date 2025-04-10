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
import { AnimatePresence, motion } from "framer-motion";
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
          <SelectTrigger className="w-full bg-white border-[#01ECBE]/30 text-[#07094d]">
            <SelectValue placeholder="Select a token" />
          </SelectTrigger>
          <SelectContent className="bg-white border-[#01ECBE]/30">
            <SelectGroup>
              <SelectLabel className="text-[#07094d]">Tokens</SelectLabel>
              <AnimatePresence>
                {TOKEN_OPTIONS.filter((token) => token.name !== "USDT").map(
                  (token, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2, delay: index * 0.1 }}
                    >
                      <SelectItem
                        className="transition-colors duration-100 cursor-pointer text-[#07094d] hover:bg-[#01ECBE]/10"
                        value={token.address}
                      >
                        {token.name}
                      </SelectItem>
                    </motion.div>
                  )
                )}
              </AnimatePresence>
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
          className="w-full bg-white border-[#01ECBE]/30 text-[#07094d] mt-5"
          placeholder="0.00"
        />
        <Button
          onClick={handleClaim}
          className="w-full bg-[#141beb] text-white hover:bg-[#141beb]/80 cursor-pointer mt-5 transition-colors duration-300"
        >
          {isClaiming ? "Claiming..." : "Claim"}
        </Button>
        {/* add token address to your wallet*/}

        {/* selectedt token copy shortcut */}
        {selectedToken ? (
          <p className="text-[#07094d] text-sm mt-5">
            Add token address to your wallet:{" "}
            <button
              className="text-[#141beb] cursor-pointer hover:underline "
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
