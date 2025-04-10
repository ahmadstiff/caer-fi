import { mockUsdc, mockWbtc, mockWeth } from "./addresses";
import usdc from "../../public/usdc.png";
import weth from "../../public/weth.png";
import wbtc from "../../public/wbtc.png";
import usdt from "../../public/usdt.png";

export interface TokenOption {
  name: string;
  namePrice: string;
  address: string;
  logo: string;
  decimals: number;
}

export const TOKEN_OPTIONS: TokenOption[] = [
  {
    name: "WETH",
    namePrice: "ETH",
    address: mockWeth,
    logo: weth.src,
    decimals: 18,
  },
  {
    name: "WBTC",
    namePrice: "BTC",
    address: mockWbtc,
    logo: wbtc.src,
    decimals: 8,
  },
  {
    name: "USDC",
    namePrice: "USDC",
    address: mockUsdc,
    logo: usdc.src,
    decimals: 6,
  },
  {
    name: "USDT",
    namePrice: "USDT",
    address: mockUsdc,
    logo: usdt.src,
    decimals: 6,
  },
];
