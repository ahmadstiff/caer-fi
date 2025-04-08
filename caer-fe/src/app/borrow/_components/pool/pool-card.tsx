import { Card } from "@/components/ui/card";
import React from "react";
import PoolHeader from "./pool-header";
import PoolFooter from "./pool-footer";
import PoolData from "./pool-data";

const PoolCard = () => {
  return (
    <Card className="bg-gradient-to-br from-[#0a0e9d] to-[#01ECBE] border-[#01ECBE]/20 shadow-xl overflow-hidden">
      <PoolHeader />
      <PoolData />
      <PoolFooter />
    </Card>
  );
};

export default PoolCard;
