import { Card } from "@/components/ui/card";
import React from "react";
import PoolHeader from "./pool-header";
import PoolFooter from "./pool-footer";
import PoolData from "./pool-data";

const PoolCard = () => {
  return (
    <Card className="bg-white border border-gray-300 text-gray-800 shadow-lg rounded-xl overflow-hidden">
      <PoolHeader />
      <PoolData />
      <PoolFooter />
    </Card>
  );
};

export default PoolCard;
