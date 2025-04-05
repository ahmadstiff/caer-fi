import { headersGraphql } from "@/lib/subgraph/headersGraphql";
import { urlGraphql } from "@/lib/subgraph/urlGraphql";
import { gql, request } from "graphql-request";
import { CreatePositionsResponse } from "@/types/type";

export async function createPositions(): Promise<
  Array<{
    id: string;
    user: string;
    blockNumber: string;
    positionAddress: string;
  }>
> {
  const query = gql`
    {
      createPositions(orderBy: blockTimestamp) {
        id
        user
        blockNumber
        positionAddress
      }
    }
  `;
  const data = await request<CreatePositionsResponse>(
    urlGraphql,
    query,
    {},
    headersGraphql
  );
  return data?.createPositions;
}
