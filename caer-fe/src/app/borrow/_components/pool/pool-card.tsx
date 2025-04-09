import { Card } from "@/components/ui/card";
import React from "react";
import PoolHeader from "./pool-header";
import PoolFooter from "./pool-footer";
import PoolData from "./pool-data";

const PoolCard = () => {
  return (
<<<<<<< HEAD
    <Card className="bg-[#F0F2FF] shadow-xl border border-[#1016BC] overflow-hidden">
=======
    <Card className="bg-white border border-gray-300 text-gray-800 shadow-lg rounded-xl overflow-hidden">
>>>>>>> c6b875e69ae144be0a78f1d418a3b001f8b89b93
      <PoolHeader />
      <PoolData />
      <PoolFooter />
    </Card>
  );
};

export default PoolCard;
