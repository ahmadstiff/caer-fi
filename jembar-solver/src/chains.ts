import { defineChain } from "viem";

export const caChain = defineChain({
  id: 62851553,
  name: "Ca Chain",
  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["http://44.213.128.45:8547/"] },
  },
  testnet: true,
  iconBackground: "#fff",
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
