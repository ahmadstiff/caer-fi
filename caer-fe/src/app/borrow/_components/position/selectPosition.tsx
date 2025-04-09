"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import { lendingPool } from "@/constants/addresses";
import { poolAbi } from "@/lib/abi/poolAbi";

const SelectPosition = ({
  positionAddress,
  setPositionAddress,
  setPositionLength,
  setPositionsArray,
}: {
  positionAddress: string | undefined;
  setPositionAddress: (address: string) => void;
  setPositionLength: (length: number) => void;
  setPositionsArray: (positions: `0x${string}`[]) => void;
}) => {
  const { address } = useAccount();
  const [positions, setPositions] = useState<`0x${string}`[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: currentPosition } = useReadContract({
    address: lendingPool,
    abi: poolAbi,
    functionName: "addressPositions",
    args: [address, BigInt(currentIndex)],
  }) as { data: `0x${string}` | undefined };

  useEffect(() => {
    if (!address) {
      setPositions([]);
      setPositionLength(0);
      setIsLoading(false);
      return;
    }

    if (currentPosition) {
      setPositions((prev) => [...prev, currentPosition]);
      setCurrentIndex((prev) => prev + 1);
    } else {
      setPositionLength(positions.length);
      setPositionsArray?.(positions);
      setIsLoading(false);
    }
  }, [currentPosition, address, positions.length, setPositionLength]);

  return (
    <div>
      <Select
        value={positionAddress}
        onValueChange={(value) => setPositionAddress(value)}
      >
        <SelectTrigger className="w-full bg-white text-gray-800 border border-gray-300 hover:border-gray-400 focus:ring-2 focus:ring-emerald-200 rounded-lg shadow-sm">
          <SelectValue placeholder="Select a position address" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-300 rounded-lg shadow-md">
          <SelectGroup>
            <SelectLabel className="text-gray-700 font-semibold px-3 pt-2">
              Positions Address
            </SelectLabel>
            {(() => {
              if (isLoading) {
                return (
                  <div className="text-gray-600 px-3 py-2 text-sm">
                    Loading positions...
                  </div>
                );
              }
              if (positions.length > 0) {
                return positions.map((position, index) => (
                  <SelectItem
                    className="cursor-pointer px-3 py-2 text-sm text-gray-800 hover:bg-emerald-50 transition-colors"
                    key={index}
                    value={position.toString()}
                  >
                    {position.toString()}
                  </SelectItem>
                ));
              }
              return (
                <div className="text-gray-600 px-3 py-2 text-sm">
                  No positions found
                </div>
              );
            })()}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectPosition;