import LendingHeader from "./_components/lending-header";
import LendingData from "./_components/lending-data";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-4">
      <LendingHeader />
      <LendingData />
    </div>
  );
};

export default page;
