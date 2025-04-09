import { CardFooter } from "@/components/ui/card";
import React from "react";

const PoolFooter = () => {
  return (
    <div className="space-y-6 pt-2 px-6">
      <div className="bg-gradient-to-tl from-[#141beb] to-[#01ECBE] rounded-lg border p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="text-gray-800 text-sm font-medium">Health Factor</div>
          <div className="text-emerald-600 font-semibold">1.8</div>
        </div>

        <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
            style={{ width: "80%" }}
          ></div>
        </div>

        <div className="text-xs text-slate-100 mt-2">
          Safe · Liquidation at &lt; 1.0
        </div>
      </div>
    </div>
  );
};

export default PoolFooter;
