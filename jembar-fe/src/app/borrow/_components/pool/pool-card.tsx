import { Card } from "@/components/ui/card";
import React from "react";
import PoolHeader from "./pool-header";
import PoolFooter from "./pool-footer";
import PoolData from "./pool-data";

const PoolCard = () => {
  return (
    <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700/50 shadow-xl overflow-hidden">
      <PoolHeader />
      <PoolData />
      <PoolFooter />
    </Card>
  );
};

export default PoolCard;
