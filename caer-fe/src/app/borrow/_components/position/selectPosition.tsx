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
import React, { useEffect } from "react";
import CreatePositionsByUser from "@/components/subgraph/createPositionsByUser";

import { headersGraphql } from "@/lib/subgraph/headersGraphql";
import { urlGraphql } from "@/lib/subgraph/urlGraphql";
import { useQuery } from "@tanstack/react-query";
import { gql, request } from "graphql-request";
import { useAccount, useReadContract } from "wagmi";
import { lendingPool } from "@/constants/addresses";
import { poolAbi } from "@/lib/abi/poolAbi";
interface CreatePositionsResponse {
  createPositions: Array<{
    id: string;
    user: string;
    blockNumber: string;
    positionAddress: string;
  }>;
}
const SelectPosition = ({
  positionAddress,
  setPositionAddress,
  setPositionLength,
}: {
  positionAddress: string | undefined;
  setPositionAddress: (address: string) => void;
  setPositionLength: (length: number) => void;
}) => {
  const { address } = useAccount();
  const [positions, setPositions] = React.useState<[any, bigint][]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const { data: currentPosition } = useReadContract({
    address: lendingPool,
    abi: poolAbi,
    functionName: "addressPositions",
    args: [address, BigInt(currentIndex)],
  }) as { data: [any, bigint] | undefined };

  React.useEffect(() => {
    if (!address) {
      setPositions([]);
      setPositionLength(0);
      setIsLoading(false);
      return;
    }

    if (currentPosition) {
      setPositions(prev => [...prev, currentPosition]);
      setCurrentIndex(prev => prev + 1);
    } else {
      setPositionLength(positions.length);
      setIsLoading(false);
    }
  }, [currentPosition, address, positions.length, setPositionLength]);

  return (
    <div>
      <Select
        value={positionAddress}
        onValueChange={(value) => setPositionAddress(value)}
      >
        <SelectTrigger className="w-full bg-white border-[#01ECBE]/30 text-[#07094d]">
          <SelectValue placeholder="Select a position address" />
        </SelectTrigger>
        <SelectContent className="bg-white border-[#01ECBE]/30">
          <SelectGroup>
            <SelectLabel className="text-[#07094d]">
              Positions Address
            </SelectLabel>
            {(() => {
              if (isLoading) {
                return <div className="text-[#07094d] p-2">Loading positions...</div>;
              }
              if (positions.length > 0) {
                return positions.map((position, index) => (
                  <SelectItem
                    className="transition-colors duration-100 cursor-pointer text-[#07094d]"
                    key={index}
                    value={position.toString()}
                  >
                    {position}
                  </SelectItem>
                ));
              }
              return <div className="text-[#07094d] p-2">No positions found</div>;
            })()}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectPosition;
