import { CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownUp, TrendingUp } from "lucide-react";
import React from "react";

const PoolHeader = () => {
  return (
    <CardHeader className="pb-2 pt-6 px-6 bg-slate-50">
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Lending Pool
          </CardTitle>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-2 mt-4">
        <div className="bg-white border border-blue-100 rounded-xl p-4 shadow-sm">
          <div className="text-xs text-blue-500 mb-1 flex items-center gap-1 font-medium">
            <TrendingUp className="h-3 w-3" /> APY
          </div>
          <div className="text-emerald-600 font-semibold text-lg">3.2%</div>
        </div>
        <div className="bg-white border border-emerald-100 rounded-xl p-4 shadow-sm">
          <div className="text-xs text-emerald-500 mb-1 flex items-center gap-1 font-medium">
            <ArrowDownUp className="h-3 w-3" /> LTV
          </div>
          <div className="text-blue-600 font-semibold text-lg">75%</div>
        </div>
      </div>
    </CardHeader>
  );
};

export default PoolHeader;