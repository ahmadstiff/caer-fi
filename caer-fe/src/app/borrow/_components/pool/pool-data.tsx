"use client";
import Image from "next/image";
import { useReadLendingData } from "@/hooks/read/useReadLendingData";
import { formatUnits } from "viem";
import BorrowDialog from "@/components/dialog/borrow/borrow-dialog";
import { RepayDialog } from "@/components/dialog/repay-dialog";
import SupplyDialogCol from "@/components/dialog/suppy-collateral-dialog";
import { WithdrawDialog } from "@/components/dialog/withdraw-collateral-dialog";
import { TOKEN_OPTIONS } from "@/constants/tokenOption";
import { mockUsdc } from "@/constants/addresses";

const PoolData = () => {

  const {
    checkAvailability,

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
    <div className="space-y-6 px-6 py-4 bg-slate-50">
      {/* Collateral Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-blue-700 uppercase tracking-wider">
            COLLATERAL
          </h3>
          <div className="text-xs bg-blue-50 border border-blue-200 text-blue-700 px-2 py-0.5 rounded-full font-medium">
            Supplied
          </div>
        </div>
        <div className="rounded-xl border border-blue-100 bg-white overflow-hidden p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-blue-100 flex items-center justify-center overflow-hidden bg-blue-50">
                <Image
                  src={
                    TOKEN_OPTIONS.find(
                      (token) => token.address
                    )?.logo ?? "/placeholder.svg"
                  }
                  alt="Token logo"
                  width={36}
                  height={36}
                />
              </div>
              <div>
                <div className="font-semibold text-gray-800">WETH</div>
                <div className="text-xs text-blue-500">Collateral Asset</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-gray-800">
                {/* {formatValue(userCollateral)} */}
              </div>
              <div className="text-xs text-blue-500">
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
          <h3 className="text-sm font-medium text-emerald-700 uppercase tracking-wider">
            BORROW
          </h3>
          <div className="text-xs bg-emerald-50 border border-emerald-200 text-emerald-700 px-2 py-0.5 rounded-full font-medium">
            Available
          </div>
        </div>
        <div className="rounded-xl border border-emerald-100 bg-white overflow-hidden p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-emerald-100 flex items-center justify-center overflow-hidden bg-emerald-50">
                <Image
                  src={
                    TOKEN_OPTIONS.find(
                      (token) => token.address === mockUsdc
                    )?.logo ?? "/placeholder.svg"
                  }
                  alt="USDC logo"
                  width={36}
                  height={36}
                />
              </div>
              <div>
                <div className="font-semibold text-gray-800">USDC</div>
                <div className="text-xs text-emerald-500">Borrow Asset</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-gray-800">
                {/* {formatValue(tokenBalanceByPosition, 6)} */}
              </div>
              <div className="text-xs text-emerald-500">
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