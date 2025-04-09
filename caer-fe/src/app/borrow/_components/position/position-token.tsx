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
}

const PositionToken = ({
  name,
  address,
  decimal,
  addressPosition,
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
<<<<<<< HEAD
    <div className="grid grid-cols-3 gap-2 p-3 items-center hover:bg-blue-300/20 transition-colors">
=======
    <div className="grid grid-cols-3 gap-2 p-3 items-center hover:bg-slate-100 transition-colors">
>>>>>>> c6b875e69ae144be0a78f1d418a3b001f8b89b93
      <div className="flex items-center gap-2 pl-2">
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
          {name?.charAt(0)}
        </div>
        <span className="font-medium text-slate-800">${name}</span>
      </div>

      <div className="text-center">
        <span className="text-slate-800 font-medium">{tokenBalance}</span>
      </div>

      <div className="flex justify-center gap-2">
        <Link href="/trade">
          <Button className="bg-teal-500 hover:bg-teal-600">
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
          />
        </div>
      </div>
    </div>
  );
};

export default PositionToken;