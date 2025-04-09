import React from "react";

const PoolFooter = () => {
  return (
    <div className="space-y-6 pt-2 px-6 pb-4 bg-slate-50">
      <div className="bg-white rounded-xl border border-blue-100 p-5 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <div className="text-gray-800 text-sm font-medium">Health Factor</div>
          <div className="text-emerald-600 font-semibold">1.8</div>
        </div>

        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
            style={{ width: "80%" }}
          ></div>
        </div>

        <div className="flex justify-between mt-2">
          <div className="text-xs text-blue-600 font-medium">
            Safe · Liquidation at &lt; 1.0
          </div>
          <div className="text-xs text-emerald-600 font-medium">80%</div>
        </div>
      </div>
    </div>
  );
};

export default PoolFooter;