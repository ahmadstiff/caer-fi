"use client";
import Image from "next/image";
import { useReadLendingData } from "@/hooks/read/useReadLendingData";
import { useAccount } from "wagmi";
import { formatUnits } from "viem";
import BorrowDialog from "@/components/dialog/borrow/borrow-dialog";
import { RepayDialog } from "@/components/dialog/repay-dialog";
import SupplyDialogCol from "@/components/dialog/suppy-collateral-dialog";
import { WithdrawDialog } from "@/components/dialog/withdraw-collateral-dialog";
import { TOKEN_OPTIONS } from "@/constants/tokenOption";

const PoolData = () => {
  const { address } = useAccount();

  const {
    checkAvailability,
    totalSupplyAssets,
    totalSupplyShares,
    collateralAddress,
    borrowAddress,
    userCollateral,
    tokenBalanceByPosition,
    totalBorrowAssets,
    totalBorrowShares,
    userSupply,
  } = useReadLendingData();

  // Format values from BigInt to readable numbers
  const formatValue = (value: bigint | undefined, decimals = 18) => {
    if (!value) return "0.0000";
    return Number.parseFloat(formatUnits(value, decimals)).toFixed(4);
  };

  // Format USD value
  const formatUSD = (value: bigint | undefined, decimals = 18, price = 1) => {
    if (!value) return "$0.00";
    return `$${(
      Number.parseFloat(formatUnits(value, decimals)) * price
    ).toFixed(2)}`;
  };

  const healthFactor = checkAvailability ? 1.8 : 0;
  const healthFactorPercentage = Math.min(
    Math.max((healthFactor / 3) * 100, 0),
    100
  );

  return (
    <div className="space-y-6 px-6">
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-slate-300 uppercase tracking-wider">
            COLLATERAL
          </h3>
          <div className="text-xs bg-slate-800 border border-slate-700 text-slate-300 px-2 py-0.5 rounded-full">
            Supplied
          </div>
        </div>
        <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden">
                <Image
                  src={
                    TOKEN_OPTIONS.find(
                      (token) => token.address === collateralAddress
                    )?.logo ?? "/placeholder.svg"
                  }
                  alt="Token logo"
                  width={36}
                  height={36}
                />
              </div>
              <div>
                <div className="font-semibold text-white">WETH</div>
                <div className="text-xs text-slate-400">Collateral Asset</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-white">
                {/* {formatValue((userCollateral))} */}
              </div>
              <div className="text-xs text-slate-400">
                {/* ≈ {formatUSD((userCollateral))} */}
              </div>
            </div>
            <div className="flex gap-2 ">
              <SupplyDialogCol token="WETH" />
              <WithdrawDialog />
            </div>
          </div>
        </div>
      </div>

      {/* Borrow Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-slate-300 uppercase tracking-wider">
            BORROW
          </h3>
          <div className="text-xs bg-slate-800 border border-slate-700 text-slate-300 px-2 py-0.5 rounded-full">
            Available
          </div>
        </div>
        <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden">
                <Image
                  src={
                    TOKEN_OPTIONS.find(
                      (token) => token.address === borrowAddress
                    )?.logo ?? "/placeholder.svg"
                  }
                  alt="USDC logo"
                  width={36}
                  height={36}
                />
              </div>
              <div>
                <div className="font-semibold text-white">USDC</div>
                <div className="text-xs text-slate-400">Borrow Asset</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-white">
                {/* {formatValue(Number(tokenBalanceByPosition), 6)} */}
              </div>
              <div className="text-xs text-slate-400">
                {/* ≈ {formatUSD(Number(tokenBalanceByPosition), 6)} */}
              </div>
            </div>
            <div className="flex gap-2">
              <BorrowDialog token={"USDC"} />
              <RepayDialog />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoolData;
