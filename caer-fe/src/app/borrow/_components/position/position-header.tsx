import { Badge } from "@/components/ui/badge";
import { Coins, HandCoins, TrendingUp } from "lucide-react";
import React from "react";

const PositionHeader: React.FC = () => {
  return (
    <div className="text-center space-y-3">
      <div className="flex items-center justify-center gap-2 text-3xl md:text-4xl font-bold text-slate-800">
        <HandCoins className="h-8 w-8 md:h-12 md:w-12 text-blue-600" />
        <h1>Borrow</h1>
      </div>
      <p className="text-slate-600 text-sm md:text-base">
        The Best DeFi Yields In 1-Click
      </p>
<<<<<<< HEAD
=======
      <div className="flex justify-center gap-2">
        <Badge
          variant="outline"
          className="bg-blue-50 text-blue-600 border-blue-200 px-3 py-1"
        >
          <TrendingUp className="h-3.5 w-3.5 mr-1" />
          High Yields
        </Badge>
        <Badge
          variant="outline"
          className="bg-emerald-50 text-emerald-600 border-emerald-200 px-3 py-1"
        >
          <Coins className="h-3.5 w-3.5 mr-1" />
          Multiple Assets
        </Badge>
      </div>
>>>>>>> c6b875e69ae144be0a78f1d418a3b001f8b89b93
    </div>
  );
};

export default PositionHeader;