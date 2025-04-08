"use client";
import { headersGraphql } from "@/lib/subgraph/headersGraphql";
import { urlGraphql } from "@/lib/subgraph/urlGraphql";
import { useQuery } from "@tanstack/react-query";
import { gql, request } from "graphql-request";
const query = gql`
  {
    createPositions(
      orderBy: blockTimestamp
      where: { user: "0x6fa7DEDDEfdC6907b7a7ca1A52d338f96788b936" }
    ) {
      id
      user
      blockNumber
      positionAddress
    }
  }
`;
export default function Data() {
  // the data is already pre-fetched on the server and immediately available here,
  // without an additional network call
  const { data } = useQuery({
    queryKey: ["data"],
    async queryFn() {
      return await request(urlGraphql, query, {}, headersGraphql);
    },
  });
  
  return <div>{JSON.stringify(data ?? {})}</div>;
}
