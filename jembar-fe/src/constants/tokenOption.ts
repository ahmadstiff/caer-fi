import { mockEna, mockUsdc, mockUsde, mockWbtc, mockWeth } from "./addresses";
import usde from "../../public/usde.png";
import ena from "../../public/ena.png";
import usdc from "../../public/usdc.png";
import weth from "../../public/weth.png";
import wbtc from "../../public/wbtc.png";

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
    name: "ENA",
    namePrice: "ENA",
    address: mockEna,
    logo: ena.src,
    decimals: 18,
  },
  {
    name: "USDe",
    namePrice: "USDe",
    address: mockUsde,
    logo: usde.src,
    decimals: 18,
  },
];
