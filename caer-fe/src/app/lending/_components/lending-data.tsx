"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { TOKEN_OPTIONS } from "@/constants/tokenOption";
import DialogSupply from "./DialogSupply";
import DialogWithdraw from "./DialogWithdraw";
import { useReadLendingData } from "@/hooks/read/useReadLendingData";
import { usePriceBorrow } from "@/hooks/read/readPrice";
import { mockUsdc } from "@/constants/addresses";
import { Button } from "@/components/ui/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

const LendingData = () => {
  const { totalSupplyAssets } = useReadLendingData();
  const { isConnected } = useAccount();
  const realTotalSupplyAssets = Number(
    (Number(totalSupplyAssets) / 1e6).toFixed(2)
  );

  const price = usePriceBorrow(mockUsdc);
  const realPrice = Number(
    (realTotalSupplyAssets * (Number(price) / 1e6)).toFixed(2)
  );

  const formatPrice = (price: number) => {
    const formatted = new Intl.NumberFormat("en-US", {
      notation: "compact",
      compactDisplay: "short",
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(price);
    return formatted;
  };
  return (
    <div className="min-h-screen text-white">
      <main className="max-w-7xl mx-auto">
        <div className="bg-[#F0F2FF] border border-[#9EC6F3] rounded-lg overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#9EC6F3]">
                    <th className="text-center p-4 text-sm font-medium text-[#1016BC]">
                      Loan
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-[#1016BC]">
                      <div className="flex items-center">Liquidity</div>
                    </th>

                    <th className="text-left p-4 text-sm font-medium text-[#1016BC]">
                      Collateral
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-[#1016BC]">
                      APY
                    </th>
                    <th className="text-center p-4 text-sm font-medium text-[#1016BC]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#9EC6F3]">
                    <td className="px-4 text-left">
                      <div className="flex items-center justify-center space-x-1">
                        <div>
                          <Image
                            src={
                              TOKEN_OPTIONS.find(
                                (token) => token?.name === "USDC"
                              )?.logo ?? "/placeholder.svg"
                            }
                            alt="USDC"
                            width={100}
                            height={100}
                            className="w-7 h-7 rounded-full"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-gray-700">$USDC</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-500">
                      <div>
                        <div className="font-medium">
                          <p>
                            {realTotalSupplyAssets.toLocaleString("en-US")}{" "}
                            $USDC
                          </p>
                        </div>
                        <div className="text-sm text-gray-500">
                          {/* <p>{formatPrice(realPrice)}</p> */}
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center space-x-1 text-gray-400 gap-3">
                        <div>
                          <Image
                            src={
                              TOKEN_OPTIONS.find(
                                (token) => token?.name === "WETH"
                              )?.logo ?? "/placeholder.svg"
                            }
                            alt="USDC"
                            width={100}
                            height={100}
                            className="w-7 h-7 rounded-full"
                          />
                        </div>
                        <div>$WETH</div>
                      </div>
                    </td>
                    <td className="p-4 text-left">
                      <div className="font-medium text-green-500">5.62%</div>
                    </td>
                    <td className="p-4 text-center flex justify-center">
                      <div className="flex items-center gap-2">
                        <div>
                          <DialogSupply />
                        </div>
                        <div>
                          <DialogWithdraw />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-[#9EC6F3]">
                    <td className="px-4 text-left">
                      <div className="flex items-center justify-center space-x-1">
                        <div>
                          <Image
                            src={
                              TOKEN_OPTIONS.find(
                                (token) => token?.name === "USDT"
                              )?.logo ?? "/placeholder.svg"
                            }
                            alt="USDT"
                            width={100}
                            height={100}
                            className="w-7 h-7 rounded-full"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-gray-700">$USDT</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-500">
                      <div>
                        <div className="font-medium">
                          <p>
                            90,100
                            $USDT
                          </p>
                        </div>
                        <div className="text-sm text-gray-500">
                          {/* <p>{formatPrice(realPrice)}</p> */}
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center space-x-1 text-gray-400 gap-3">
                        <div>
                          <Image
                            src={
                              TOKEN_OPTIONS.find(
                                (token) => token?.name === "WETH"
                              )?.logo ?? "/placeholder.svg"
                            }
                            alt="USDC"
                            width={100}
                            height={100}
                            className="w-7 h-7 rounded-full"
                          />
                        </div>
                        <div>$WETH</div>
                      </div>
                    </td>
                    <td className="p-4 text-left">
                      <div className="font-medium text-green-500">5.62%</div>
                    </td>
                    <td className="p-4 text-center flex justify-center">
                      <div className="flex items-center gap-2">
                        <div>
                          <DialogSupply />
                        </div>
                        <div>
                          <DialogWithdraw />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </div>
      </main>
      <div className="mt-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-[#F0F2FF] backdrop-blur-sm border border-[#9EC6F3] p-5 rounded-xl">
          <h3 className="text-lg font-medium text-[#1016BC] mb-4">
            Market Overview
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-[#1192FC] bg-opacity-20 rounded-full"></div>
                <span>Total Market Size</span>
              </div>
              <span className="font-medium">$495.84M</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-[#00EDBE] bg-opacity-20 rounded-full"></div>
                <span>Total Available</span>
              </div>
              <span className="font-medium">$130.97M</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-[#1016BC] bg-opacity-20 rounded-full"></div>
                <span>Utilization Rate</span>
              </div>
              <span className="font-medium">73.6%</span>
            </div>
          </div>
        </Card>

        <Card className="bg-[#F0F2FF] backdrop-blur-sm border border-[#9EC6F3] p-5 rounded-xl">
          <h3 className="text-lg font-medium text-[#1016BC] mb-4">
            Your Position
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-[#1192FC] bg-opacity-20 rounded-full"></div>
                <span>Supplied</span>
              </div>
              <span className="font-medium">$0.00</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-[#00EDBE] bg-opacity-20 rounded-full"></div>
                <span>Borrowed</span>
              </div>
              <span className="font-medium">$0.00</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-[#1016BC] bg-opacity-20 rounded-full"></div>
                <span>Net APY</span>
              </div>
              <span className="font-medium">0.00%</span>
            </div>
            <div className="flex justify-center mx-auto">
              {!isConnected ? <ConnectButton /> : ""}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LendingData;
