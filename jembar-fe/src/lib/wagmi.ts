import { http } from "wagmi";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { arbitrumSepolia } from "viem/chains";
import { caChain } from "./data/chain-data";


export const config = getDefaultConfig({
  appName: "MyDApp",
  projectId: "YOUR_PROJECT_ID",
  chains: [caChain, arbitrumSepolia],
  transports: {
    [caChain.id]: http(),
    [arbitrumSepolia.id]: http(),
  },
});
