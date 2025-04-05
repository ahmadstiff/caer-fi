import { headersGraphql } from "@/lib/subgraph/headersGraphql";
import { urlGraphql } from "@/lib/subgraph/urlGraphql";
import { gql, request } from "graphql-request";
import { CreatePositionsResponse } from "@/types/type";

export async function createPositionsByUser(address: string): Promise<
  Array<{
    id: string;
    user: string;
    blockNumber: string;
    positionAddress: string;
  }>
> {
  const query = gql`
    {
      createPositions(
        orderBy: blockTimestamp
        where: { user: "${
          address ?? "0x6fa7DEDDEfdC6907b7a7ca1A52d338f96788b936"
        }" }
      ) {
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
