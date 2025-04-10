import { Button } from "@/components/ui/button";
import { positionAbi } from "@/lib/abi/positionAbi";
import Link from "next/link";
import type { Address } from "viem";
import { useReadContract } from "wagmi";
import { RepaySelectedToken } from "./repay-selected-token";
import { TOKEN_OPTIONS } from "@/constants/tokenOption";
import { ArrowRightLeft } from "lucide-react";
import { useReadLendingData } from "@/hooks/read/useReadLendingData";

interface PositionTokenProps {
  name: string | undefined;
  address: Address;
  decimal: number;
  addressPosition: Address | undefined;
  arrayLocation: bigint;
}

const PositionToken = ({
  name,
  address,
  decimal,
  addressPosition,
  arrayLocation,
}: PositionTokenProps) => {
  const { userCollateral, collateralAddress } = useReadLendingData();

  const { data: tokenBalanceUSDC } = useReadContract({
    address: addressPosition as Address,
    abi: positionAbi,
    functionName: "tokenBalances",
    args: [address as Address],
  });

  const convertRealAmount = (amount: bigint | undefined, decimal: number) => {
    const realAmount = amount ? Number(amount) / decimal : 0;
    return realAmount;
  };

  const getDecimal = (address: Address | unknown) => {
    const token = TOKEN_OPTIONS.find((asset) => asset.address === address);
    return token?.decimals;
  };

  const tokenBalance =
    collateralAddress === address
      ? convertRealAmount(userCollateral as bigint, decimal).toFixed(2)
      : convertRealAmount(tokenBalanceUSDC as bigint, decimal).toFixed(2);

  return (
    <div className="grid grid-cols-3 gap-2 p-3 items-center hover:bg-emerald-100 transition-colors rounded-lg">
      <div className="flex items-center gap-2 pl-2">
        <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold">
          {name?.charAt(0)}
        </div>
        <span className="font-medium text-gray-800">${name}</span>
      </div>

      <div className="text-center">
        <span className="text-gray-800 font-medium">{tokenBalance}</span>
      </div>

      <div className="flex justify-center gap-2">
        <Link href="/trade">
          <Button className="bg-emerald-500 hover:bg-emerald-600 cursor-pointer">
            <ArrowRightLeft className="h-3.5 w-3.5 mr-1" />
            <span className="text-xs">Trade</span>
          </Button>
        </Link>

        <div className="text-black">
          <RepaySelectedToken
            name={name}
            balance={tokenBalance}
            address={address}
            decimal={getDecimal(address)}
            arrayLocation={arrayLocation}
          />
        </div>
      </div>
    </div>
  );
};

export default PositionToken;