import { defineChain } from "viem";

export const eduChain = defineChain({
  id: 656476,
  name: "EDU Chain",
  nativeCurrency: { name: "EDU", symbol: "EDU", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.open-campus-codex.gelato.digital"] },
  },
  blockExplorers: {
    default: { 
      name: "Blockscout",
      url: "https://edu-chain-testnet.blockscout.com"
    }
  },
  testnet: true,
  iconBackground: "#ffff",
  iconUrl: "/edu.png"
});

export const arbitrumSepolia = defineChain({
  id: 421614,
  name: "Arbitrum Sepolia",
  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://sepolia-rollup.arbitrum.io/rpc"] },
  },
  testnet: true,
});
