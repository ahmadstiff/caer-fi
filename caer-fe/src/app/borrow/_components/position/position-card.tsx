"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ChevronUp,
  ChevronDown,
  Wallet,
  HandCoins,
  TrendingUp,
  CircleDollarSign,
  Plus,
  Loader2,
} from "lucide-react";

import {
  lendingPool,
  mockUsdc,
  mockWbtc,
  mockWeth,
} from "@/constants/addresses";
import type { Address } from "viem";
import { TOKEN_OPTIONS } from "@/constants/tokenOption";
import PositionToken from "./position-token";
import { useReadLendingData } from "@/hooks/read/useReadLendingData";
import { useBorrowBalance } from "@/hooks/useBorrowBalance";
import SelectPosition from "./selectPosition";
import { useWriteContract } from "wagmi";
import { poolAbi } from "@/lib/abi/poolAbi";
const PositionCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [positionAddress, setPositionAddress] = useState<string | undefined>(
    undefined
  );
  const [positionLength, setPositionLength] = useState<number>(0);

  const { collateralAddress, borrowAddress, userCollateral } =
    useReadLendingData();

  const userBorrowShares = useBorrowBalance();

  const findNameToken = (address: Address | unknown) => {
    const token = TOKEN_OPTIONS.find((asset) => asset.address === address);
    return token?.name;
  };

  const convertRealAmount = (amount: number | unknown, decimal: number) => {
    const realAmount = Number(amount) ? Number(amount) / decimal : 0; // convert to USDC
    return realAmount;
  };
  const {
    isPending: isPositionPending,
    writeContract: createPositionTransaction,
  } = useWriteContract();
  const handleAddPosition = () => {
    createPositionTransaction({
      address: lendingPool,
      abi: poolAbi,
      functionName: "createPosition",
      args: [],
    });
  };

  return (
<<<<<<< HEAD
    <Card className="bg-[#F0F2FF] border border-[#141beb]/20 shadow-lg overflow-hidden">
      <CardHeader className="pb-2 border-b py-2 border-[#141beb]/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 py-2">
            <CircleDollarSign className="h-5 w-5 text-[#141beb]" />
            <CardTitle className="text-xl text-[#0f172a] w-full">
=======
    <Card className="bg-white border border-slate-200 shadow-lg overflow-hidden">
      <CardHeader className="pb-2 border-b py-2 border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 py-2">
            <CircleDollarSign className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-xl text-slate-800 w-full">
>>>>>>> c6b875e69ae144be0a78f1d418a3b001f8b89b93
              <div className="flex items-center gap-1">
                <div>Your Position</div>
                <div className="ml-3">
                  <SelectPosition
                    positionAddress={positionAddress}
                    setPositionAddress={setPositionAddress}
                    setPositionLength={setPositionLength}
                  />
                </div>
                <div>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={isPositionPending}
<<<<<<< HEAD
                    className="ml-3 bg-[#00db99] hover:bg-[#02EEC4] transform transition-all duration-200 rounded-lg cursor-pointer"
=======
                    className="ml-3 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-teal-500 hover:to-blue-600 text-white font-medium shadow-md hover:shadow-lg transition-colors duration-300 rounded-lg cursor-pointer"
>>>>>>> c6b875e69ae144be0a78f1d418a3b001f8b89b93
                    onClick={handleAddPosition}
                  >
                    {isPositionPending ? (
                      <div className="flex items-center justify-center">
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        <span>Processing Transaction...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-white">
                        <Plus className="h-4 w-4" />
                        Add Position
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
<<<<<<< HEAD
            className="text-slate-600 bg-[#00db99] hover:bg-[#02EEC4] transform transition-all duration-200"
=======
            className="text-slate-400 hover:text-teal-500 hover:bg-slate-100"
>>>>>>> c6b875e69ae144be0a78f1d418a3b001f8b89b93
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
<<<<<<< HEAD
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <CardContent className="px-4 md:px-6">
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4 p-4 bg-gradient-to-tl from-[#141beb] to-[#01ECBE] rounded-lg">
                  <div className="space-y-2 text-center">
                    <div className="text-xs md:text-sm text-white flex items-center justify-center gap-1">
                      <Wallet className="h-3.5 w-3.5 text-[#141beb]" />
                      Collateral
                    </div>
                    <div className="text-base md:text-lg font-medium text-white">
                      {userCollateral
                        ? convertRealAmount(userCollateral, 1e18).toFixed(5)
                        : "0"}{" "}
                      <span className="text-[#01ECBE]">
                        ${findNameToken(collateralAddress)}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2 text-center">
                    <div className="text-xs md:text-sm text-white flex items-center justify-center gap-1">
                      <HandCoins className="h-3.5 w-3.5 text-red-400" />
                      Debt
                    </div>
                    <div className="text-base md:text-lg font-medium text-white">
                      {userBorrowShares || "0"}{" "}
                      <span className="text-[#01ECBE]">
                        ${findNameToken(borrowAddress)}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2 text-center">
                    <div className="text-xs md:text-sm text-white flex items-center justify-center gap-1">
                      <TrendingUp className="h-3.5 w-3.5 text-[#01ECBE]" />
                      APY
                    </div>
                    <div className="text-base md:text-lg font-medium text-[#01ECBE]">
                      {userBorrowShares ? "14.45%" : "0%"}
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-lg border border-[#141beb]">
                  {positionAddress === undefined ? (
                    <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
                      <div className="bg-blue-200 p-4 rounded-full">
                        <Wallet className="h-10 w-10 text-[#01ECBE]" />
                      </div>
                      <span className="text-xl md:text-2xl text-[#e2e2ff]">
                        {positionLength === 0
                          ? "No positions available"
                          : "Select position address"}
                      </span>
                      <p className="text-sm text-slate-400 max-w-md">
                        {positionLength === 0
                          ? "You don't have any active positions. Start by supplying collateral and borrowing assets."
                          : "Select a position address to view your position."}
                      </p>
                      {positionLength === 0 && (
                        <Button className="mt-2 bg-gradient-to-r from-[#141beb] to-[#01ECBE] hover:from-[#01ECBE] hover:to-[#141beb]">
                          Create Position
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div>
                      <div className="grid grid-cols-3 gap-2 p-3 text-sm font-medium text-[#1016BC]">
                        <div className="pl-4">Assets</div>
                        <div className="text-center">Value</div>
                        <div className="text-center">Actions</div>
                      </div>
                      <div className="divide-y divide-[#141beb]">
                        {/* WETH */}
                        <PositionToken
                          name={findNameToken(mockWeth)}
                          address={mockWeth}
                          decimal={1e18}
                          addressPosition={positionAddress as `0x${string}`}
                        />
                        {/* WBTC */}
                        <PositionToken
                          name={findNameToken(mockWbtc)}
                          address={mockWbtc}
                          decimal={1e8}
                          addressPosition={positionAddress as `0x${string}`}
                        />
                        {/* USDC */}
                        <PositionToken
                          name={findNameToken(mockUsdc)}
                          address={mockUsdc}
                          decimal={1e6}
                          addressPosition={positionAddress as `0x${string}`}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
=======
      {isExpanded && (
        <CardContent className="px-4 md:px-6">
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg">
              <div className="space-y-2 text-center">
                <div className="text-xs md:text-sm text-slate-600 flex items-center justify-center gap-1">
                  <Wallet className="h-3.5 w-3.5 text-blue-600" />
                  Collateral
                </div>
                <div className="text-base md:text-lg font-medium text-slate-800">
                  {userCollateral
                    ? convertRealAmount(userCollateral, 1e18).toFixed(5)
                    : "0"}{" "}
                  <span className="text-teal-500">
                    ${findNameToken(collateralAddress)}
                  </span>
                </div>
              </div>
              <div className="space-y-2 text-center">
                <div className="text-xs md:text-sm text-slate-600 flex items-center justify-center gap-1">
                  <HandCoins className="h-3.5 w-3.5 text-red-400" />
                  Debt
                </div>
                <div className="text-base md:text-lg font-medium text-slate-800">
                  {userBorrowShares || "0"}{" "}
                  <span className="text-teal-500">
                    ${findNameToken(borrowAddress)}
                  </span>
                </div>
              </div>
              <div className="space-y-2 text-center">
                <div className="text-xs md:text-sm text-slate-600 flex items-center justify-center gap-1">
                  <TrendingUp className="h-3.5 w-3.5 text-teal-500" />
                  APY
                </div>
                <div className="text-base md:text-lg font-medium text-teal-500">
                  {userBorrowShares ? "14.45%" : "0%"}
                </div>
              </div>
            </div>
  
            <div className="overflow-x-auto rounded-lg border border-slate-200">
              {positionAddress === undefined ? (
                <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
                  <div className="bg-slate-50 p-4 rounded-full">
                    <Wallet className="h-10 w-10 text-teal-500" />
                  </div>
                  <span className="text-xl md:text-2xl text-slate-800">
                    {positionLength === 0
                      ? "No positions available"
                      : "Select position address"}
                  </span>
                  <p className="text-sm text-slate-500 max-w-md">
                    {positionLength === 0
                      ? "You don't have any active positions. Start by supplying collateral and borrowing assets."
                      : "Select a position address to view your position."}
                  </p>
                  {positionLength === 0 && (
                    <Button className="mt-2 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-teal-500 hover:to-blue-600">
                      Create Position
                    </Button>
                  )}
                </div>
              ) : (
                <div>
                  <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 text-sm font-medium text-slate-600">
                    <div className="pl-4">Assets</div>
                    <div className="text-center">Value</div>
                    <div className="text-center">Actions</div>
                  </div>
                  <div className="divide-y divide-slate-200">
                    {/* WETH */}
                    <PositionToken
                      name={findNameToken(mockWeth)}
                      address={mockWeth}
                      decimal={1e18}
                      addressPosition={positionAddress as `0x${string}`}
                    />
                    {/* WBTC */}
                    <PositionToken
                      name={findNameToken(mockWbtc)}
                      address={mockWbtc}
                      decimal={1e8}
                      addressPosition={positionAddress as `0x${string}`}
                    />
                    {/* USDC */}
                    <PositionToken
                      name={findNameToken(mockUsdc)}
                      address={mockUsdc}
                      decimal={1e6}
                      addressPosition={positionAddress as `0x${string}`}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      )}
>>>>>>> c6b875e69ae144be0a78f1d418a3b001f8b89b93
    </Card>
  );
};

export default PositionCard;