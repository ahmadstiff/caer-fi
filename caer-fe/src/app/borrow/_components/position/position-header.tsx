import { Badge } from "@/components/ui/badge";
import { Coins, HandCoins, TrendingUp } from "lucide-react";
import React from "react";

const PositionHeader: React.FC = () => {
  return (
    <div className="text-center space-y-3">
      <div className="flex items-center justify-center gap-2 text-3xl md:text-4xl font-bold text-white">
        <HandCoins className="h-8 w-8 md:h-12 md:w-12 text-blue-500" />
        <h1>Borrow</h1>
      </div>
      <p className="text-slate-400 text-sm md:text-base">
        The Best DeFi Yields In 1-Click
      </p>
    </div>
  );
};

export default PositionHeader;
