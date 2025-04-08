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
import { useAccount } from "wagmi";
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
  const query = gql`
      {
        createPositions(
          orderBy: blockTimestamp
          where: { user: "${String(address)}" }
        ) {
          id
          user
          blockNumber
          positionAddress
        }
      }
    `;
  const { data } = useQuery<CreatePositionsResponse>({
    queryKey: ["data"],
    async queryFn() {
      return await request<CreatePositionsResponse>(
        urlGraphql,
        query,
        {},
        headersGraphql
      );
    },
  });
  useEffect(() => {
    setPositionLength(data?.createPositions.length ?? 0);
  }, [data]);
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
            {data
              ? data.createPositions.map((position) => (
                <SelectItem
                  className="transition-colors duration-100 cursor-pointer text-[#07094d]"
                  key={position.id}
                  value={position.positionAddress}
                >
                  {position.positionAddress}
                </SelectItem>
              ))
              : "No positions found"}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectPosition;
