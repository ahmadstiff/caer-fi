import React from "react";
import PositionHeader from "./position/position-header";
import PositionCard from "./position/position-card";
import PoolCard from "./pool/pool-card";

const BorrowPage = () => {
  return (
    <div className=" p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-8 mt-5">
        <PositionHeader />
        <PositionCard />
        <PoolCard />
      </div>
    </div>
  );
};

export default BorrowPage;
