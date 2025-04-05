export interface Pool {
  [x: string]: string | number;
  id: number;
  token: string;
  logo: string;
  liquidity: string;
  apy: string;
}

export const SAMPLE_POOLS: Pool[] = [
  {
    id: 1,
    token: "WETH",
    logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
    liquidity: "31.79M",
    apy: "14.45",
  },
  {
    id: 2,
    token: "WBTC",
    logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png",
    liquidity: "134.77M",
    apy: "16.19",
  },
  {
    id: 3,
    token: "USDC",
    logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png",
    liquidity: "134.77M",
    apy: "14.45",
  },
];
