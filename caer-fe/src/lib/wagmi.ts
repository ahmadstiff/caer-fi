import { http } from "wagmi";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { arbitrumSepolia } from "viem/chains";
import { eduChain } from "./data/chain-data";


export const config = getDefaultConfig({
  appName: "MyDApp",
  projectId: "YOUR_PROJECT_ID",
  chains: [eduChain, arbitrumSepolia],
  transports: {
    [eduChain.id]: http(),
    [arbitrumSepolia.id]: http(),
  },
});
