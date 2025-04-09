"use client";

import React, { useState, useEffect } from "react";
import { ArrowDownIcon } from "@heroicons/react/24/outline";
import { TOKEN_OPTIONS, TokenOption } from "@/constants/tokenOption";
import { useAccount, } from "wagmi";
import { formatUnits, Address } from "viem";
import { usePositionBalance } from "@/hooks/useTokenBalance";
import { useSwapToken } from "@/hooks/useSwapToken";
import { useTokenPrice } from "@/hooks/useTokenPrice";
import { useReadLendingData } from "@/hooks/read/useReadLendingData";
import SelectPosition from "@/app/borrow/_components/position/selectPosition";

export default function SwapPanel() {
  const { address } = useAccount();
  const [fromToken, setFromToken] = useState<TokenOption>(TOKEN_OPTIONS[0]);
  const [toToken, setToToken] = useState<TokenOption>(TOKEN_OPTIONS[1]);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [slippage, setSlippage] = useState("0.5");
  const [isMounted, setIsMounted] = useState(false);
  const [positionAddress, setPositionAddress] = useState<Address | undefined>(
    undefined
  );
  const [positionLength, setPositionLength] = useState(0);
  const [positionsArray, setPositionsArray] = useState<`0x${string}`[]>([]);

  // Use our custom hooks
  const { balance: fromTokenBalance } = usePositionBalance(
    positionAddress as Address,
    fromToken.address as Address,
    fromToken.decimals
  );
  const { balance: toTokenBalance } = usePositionBalance(
    positionAddress as Address,
    toToken.address as Address,
    toToken.decimals
  );
  const { price } = useTokenPrice(
    fromToken.address as Address,
    toToken.address as Address
  );
  const { swapToken, isLoading, error, setError } = useSwapToken();

  const { userCollateral } = useReadLendingData();

  const arrayLocation = positionsArray.indexOf(positionAddress as `0x${string}`);

  // Set mounted state to true after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Calculate exchange rate and to amount
  useEffect(() => {
    if (fromAmount && price) {
      try {
        const amount = parseFloat(fromAmount);
        if (!isNaN(amount) && amount > 0) {
          const calculatedAmount = amount * price;
          setToAmount(calculatedAmount.toFixed(6));
        } else {
          setToAmount("");
        }
      } catch (err) {
        console.error("Error calculating exchange rate:", err);
        setToAmount("");
      }
    } else {
      setToAmount("");
    }
  }, [fromAmount, price, fromToken, toToken]);

  // Swap positions of tokens
  const switchTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  // Handle token swap
  const handleSwap = async () => {
    console.log("toToken", toToken);
    const fromAmountReal = parseFloat(fromAmount) * 10 ** fromToken.decimals;
    const toAmountReal = parseFloat(toAmount) * 10 ** toToken.decimals;
    const fromTokenBalanceReal =
      fromToken.name === "WETH"
        ? Number(userCollateral?.toString() ?? "0")
        : Number(fromTokenBalance) * 10 ** fromToken.decimals;
    console.log("fromAmount", fromAmountReal);
    console.log("toAmount", toAmountReal);
    if (!address) {
      setError("Please connect your wallet");
      return;
    }

    if (!fromAmountReal || fromAmountReal <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (fromAmountReal > Number(fromTokenBalanceReal)) {
      setError("Insufficient balance");
      return;
    }

    try {
      const slippagePercent = parseFloat(slippage);
      const minToAmount = parseFloat(toAmount) * (1 - slippagePercent / 100);

      // Asumsi positionIndex adalah 0 (dapat diubah jika user memiliki multiple positions)
      const positionIndex = 0;

      await swapToken({
        fromToken,
        toToken,
        fromAmount,
        toAmount,
        onSuccess: () => {
          // Reset form after successful swap
          setFromAmount("");
          setToAmount("");
        },
        onError: (error) => {
          console.error("Swap error:", error);
        },
        positionAddress: positionAddress as Address,
        arrayLocation: BigInt(arrayLocation),
      });
    } catch (err) {
      console.error("Swap error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to execute swap. Please try again."
      );
    }
  };

  // Determine button text based on client-side state only
  const getButtonText = () => {
    if (!isMounted) return "Swap"; // Default text for SSR
    if (!address) return "Connect Wallet";
    if (isLoading) return "Processing...";
    return "Swap";
  };

  const handlePositionAddressChange = (address: string) => {
    setPositionAddress(address as `0x${string}`);
  };

  return (
    <div className="max-w-md mx-auto w-full px-4 py-2">
      <h2 className="text-2xl font-bold text-center text-[#07094d] mb-6">Swap Token</h2>
      <div className="w-full mb-4">
        <SelectPosition
          positionAddress={positionAddress}
          setPositionAddress={handlePositionAddressChange}
          setPositionLength={setPositionLength}
          setPositionsArray={setPositionsArray}
        />
      </div>

      <div className="space-y-4">
        {/* From Token */}
        <div className="bg-white border border-[#01ECBE]/30 rounded-xl p-4 shadow-sm">
          <div className="flex justify-between mb-2">
            <label className="text-[#07094d]/80 font-medium">From</label>
            <span className="text-[#07094d]/80 text-sm truncate">
              Balance:{" "}
              {fromToken.name === "WETH"
                ? formatUnits(
                  BigInt(userCollateral?.toString() ?? "0"),
                  fromToken.decimals
                )
                : fromTokenBalance}{" "}
              {fromToken.name}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="number"
              className="w-full bg-transparent text-[#07094d] text-xl focus:outline-none p-2 border-b border-[#01ECBE]/30"
              placeholder="0.0"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              aria-label="Amount to swap"
            />
            <select
              className="bg-[#141beb]/10 text-[#07094d] py-2 px-3 rounded-lg border border-[#141beb]/20"
              value={fromToken.address}
              onChange={(e) =>
                setFromToken(
                  TOKEN_OPTIONS.find((t) => t.address === e.target.value) ||
                  TOKEN_OPTIONS[0]
                )
              }
              aria-label="Select token to swap from"
            >
              {TOKEN_OPTIONS.map((token, index) => (
                <option key={index} value={token.address}>
                  {token.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Switch button */}
        <div className="flex justify-center -my-2">
          <button
            onClick={switchTokens}
            className="bg-white p-2 rounded-full hover:bg-[#01ECBE]/20 border border-[#01ECBE]/30 transition-colors z-10 cursor-pointer"
            aria-label="Switch tokens"
          >
            <ArrowDownIcon className="h-5 w-5 text-[#141beb]" />
          </button>
        </div>

        {/* To Token */}
        <div className="bg-white border border-[#01ECBE]/30 rounded-xl p-4 shadow-sm">
          <div className="flex justify-between mb-2">
            <label className="text-[#07094d]/80 font-medium">To</label>
            <span className="text-[#07094d]/80 text-sm truncate">
              Balance: {toTokenBalance} {toToken.name}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="number"
              className="w-full bg-transparent text-[#07094d] text-xl focus:outline-none p-2 border-b border-[#01ECBE]/30"
              placeholder="0.0"
              value={toAmount}
              readOnly
              aria-label="Amount to receive"
            />
            <select
              className="bg-[#141beb]/10 text-[#07094d] py-2 px-3 rounded-lg border border-[#141beb]/20"
              value={toToken.address}
              onChange={(e) =>
                setToToken(
                  TOKEN_OPTIONS.find((t) => t.address === e.target.value) ||
                  TOKEN_OPTIONS[1]
                )
              }
              aria-label="Select token to receive"
            >
              {TOKEN_OPTIONS.map((token, index) => (
                <option key={index} value={token.address}>
                  {token.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap Rate */}
        <div className="bg-white border border-[#01ECBE]/30 rounded-xl p-3 text-sm text-[#07094d]/80 shadow-sm">
          <div className="flex justify-between">
            <span>Exchange Rate:</span>
            <span className="truncate">
              {price
                ? `1 ${fromToken.name} ≈ ${price.toFixed(6)} ${toToken.name}`
                : "Loading..."}
            </span>
          </div>
        </div>

        {/* Slippage Setting */}
        <div className="bg-white border border-[#01ECBE]/30 rounded-xl p-3 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <span className="text-[#07094d]/80 font-medium">Slippage Tolerance</span>
            <div className="flex flex-wrap gap-1">
              {["0.5", "1", "2", "3"].map((value) => (
                <button
                  key={value}
                  className={`px-3 py-1 rounded text-sm ${slippage === value
                    ? "bg-[#141beb] text-white"
                    : "bg-[#141beb]/10 text-[#07094d] hover:bg-[#141beb]/20 cursor-pointer"
                    }`}
                  onClick={() => setSlippage(value)}
                >
                  {value}%
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-sm bg-red-100 p-3 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        {/* Swap Button */}
        <button
          onClick={handleSwap}
          disabled={isLoading || !fromAmount || !toAmount || !address || positionAddress === undefined || arrayLocation === -1}
          className={`w-full py-3.5 rounded-xl font-bold transition-colors ${isLoading || !fromAmount || !toAmount || !address || positionAddress === undefined || arrayLocation === -1
            ? "bg-[#141beb]/30 text-white cursor-not-allowed"
            : "bg-[#141beb] text-white hover:bg-[#141beb]/90 cursor-pointer shadow-md hover:shadow-lg "
            }`}
        >
          {getButtonText()}
        </button>
      </div>
    </div>
  );
}
