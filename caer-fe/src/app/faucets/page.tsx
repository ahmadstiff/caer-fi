import React from "react";
import PositionHeader from "./_components/PositionHeader";
import FaucetsCard from "./_components/FaucetsCard";


const page = () => {
  return (
    <div className="p-4 md:p-8">
      <div className="mx-auto max-w-3xl space-y-8 mt-5">
        <PositionHeader />
        <FaucetsCard />
      </div>
    </div>
  );
};

export default page;
