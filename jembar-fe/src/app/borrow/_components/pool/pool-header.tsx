import { CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownUp, TrendingUp } from "lucide-react";
import React from "react";

const PoolHeader = () => {
  return (
    <CardHeader className="pb-2">
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Lending Pool
          </CardTitle>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-2 mt-4">
        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
          <div className="text-xs text-slate-400 mb-1 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> APY
          </div>
          <div className="text-emerald-400 font-semibold">3.2%</div>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
          <div className="text-xs text-slate-400 mb-1 flex items-center gap-1">
            <ArrowDownUp className="h-3 w-3" /> LTV
          </div>
          <div className="text-blue-400 font-semibold">75%</div>
        </div>
      </div>
    </CardHeader>
  );
};

export default PoolHeader;
