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

  const formatValue = (value: bigint | undefined, decimals = 18) => {
    if (!value) return "0.0000";
    return Number.parseFloat(formatUnits(value, decimals)).toFixed(4);
  };

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
      {/* Collateral Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wider">
            COLLATERAL
          </h3>
          <div className="text-xs bg-gray-100 border border-gray-300 text-gray-800 px-2 py-0.5 rounded-full">
            Supplied
          </div>
        </div>
        <div className="rounded-xl border border-gray-300 bg-white overflow-hidden p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center overflow-hidden">
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
                <div className="font-semibold text-gray-900">WETH</div>
                <div className="text-xs text-gray-500">Collateral Asset</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-gray-900">
                {/* {formatValue(userCollateral)} */}
              </div>
              <div className="text-xs text-gray-500">
                {/* ≈ {formatUSD(userCollateral)} */}
              </div>
            </div>
            <div className="flex gap-2">
              <SupplyDialogCol token="WETH" />
              <WithdrawDialog />
            </div>
          </div>
        </div>
      </div>

      {/* Borrow Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wider">
            BORROW
          </h3>
          <div className="text-xs bg-gray-100 border border-gray-300 text-gray-800 px-2 py-0.5 rounded-full">
            Available
          </div>
        </div>
        <div className="rounded-xl border border-gray-300 bg-white overflow-hidden p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center overflow-hidden">
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
                <div className="font-semibold text-gray-900">USDC</div>
                <div className="text-xs text-gray-500">Borrow Asset</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-gray-900">
                {/* {formatValue(tokenBalanceByPosition, 6)} */}
              </div>
              <div className="text-xs text-gray-500">
                {/* ≈ {formatUSD(tokenBalanceByPosition, 6)} */}
              </div>
            </div>
            <div className="flex gap-2">
              <BorrowDialog token="USDC" />
              <RepayDialog />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoolData;