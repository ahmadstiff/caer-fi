import { Card } from "@/components/ui/card";
import React from "react";
import PoolHeader from "./pool-header";
import PoolFooter from "./pool-footer";
import PoolData from "./pool-data";

const PoolCard = () => {
  return (
    <Card className="bg-[#F0F2FF] shadow-xl border overflow-hidden">
      <PoolHeader />
      <PoolData />
      <PoolFooter />
    </Card>
  );
};

export default PoolCard;
