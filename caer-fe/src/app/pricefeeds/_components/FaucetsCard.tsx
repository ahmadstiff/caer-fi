import { Card } from "@/components/ui/card";
import React from "react";
import FaucetsCardHeader from "./FaucetsCardHeader";
import FaucetsCardForm from "./FaucetsCardForm";

const FaucetsCard = () => {
  return (
    <div>
      <Card className="bg-white border-[#01ECBE]/30 shadow-xl overflow-hidden">
        <FaucetsCardHeader />
        <FaucetsCardForm />
      </Card>
    </div>
  );
};

export default FaucetsCard;
