import { createConfig } from "ponder";
import { http } from "viem";
import { poolAbi } from "./abis/poolAbi";
import { lendingPool } from "./addresses";

export default createConfig({
  networks: {
    mainnet: {
      chainId: 656476,
      transport: http(process.env.PONDER_RPC_URL_1),
    },
  },
  contracts: {
    poolAbi: {
      network: "educhainTestnet",
      abi: poolAbi,
      address: lendingPool,
      startBlock: 33586662,
    },
  },
});
