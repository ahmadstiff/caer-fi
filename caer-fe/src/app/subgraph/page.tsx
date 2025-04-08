import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { gql, request } from "graphql-request";
import Data from "@/components/Data";


export default async function HomePage() {
  
  return (
    // Neat! Serialization is now as easy as passing props.
    // HydrationBoundary is a Client Component, so hydration will happen there.
    <div >
      <div className="flex flex-col items-center justify-center h-screen text-white">
        <Data />
      </div>
    </div>
  );
}
