import React from "react";
import { Coins, HandCoins, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const PositionHeader = () => {
  return (
    <div>
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-2 text-3xl md:text-4xl font-bold text-white">
          <HandCoins className="h-8 w-8 md:h-12 md:w-12 text-blue-500" />
          <h1>Price Feeds</h1>
        </div>
        <p className="text-slate-400 text-sm md:text-base">
          The Best DeFi Yields In 1-Click
        </p>
        <div className="flex justify-center gap-2">
          <Badge
            variant="outline"
            className="bg-blue-950/30 text-blue-400 border-blue-800 px-3 py-1"
          >
            <TrendingUp className="h-3.5 w-3.5 mr-1" />
            High Yields
          </Badge>
          <Badge
            variant="outline"
            className="bg-emerald-950/30 text-emerald-400 border-emerald-800 px-3 py-1"
          >
            <Coins className="h-3.5 w-3.5 mr-1" />
            Multiple Assets
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default PositionHeader;
