"use client";
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

export default function CreatePositionsByUser() {
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
  return data?.createPositions;
}
