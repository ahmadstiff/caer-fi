import { CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownUp, TrendingUp } from "lucide-react";
import React from "react";

const PoolHeader = () => {
  return (
    <CardHeader className="pb-2">
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#0a0e9d] to-[#01ECBE] bg-clip-text text-transparent">
            Lending Pool
          </CardTitle>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-2 mt-4">
        <div className="bg-white rounded-lg p-3 border border-[#d1e4e8] shadow-sm">
          <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
            <TrendingUp className="h-3 w-3 text-[#0a0e9d]" /> APY
          </div>
          <div className="text-emerald-600 font-semibold">3.2%</div>
        </div>
        <div className="bg-white rounded-lg p-3 border border-[#d1e4e8] shadow-sm">
          <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
            <ArrowDownUp className="h-3 w-3 text-[#0a0e9d]" /> LTV
          </div>
          <div className="text-blue-600 font-semibold">75%</div>
        </div>
      </div>
    </CardHeader>
  );
};

export default PoolHeader;
