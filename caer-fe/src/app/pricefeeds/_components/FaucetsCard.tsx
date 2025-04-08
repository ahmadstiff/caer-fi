import { Card } from "@/components/ui/card";
import React from "react";
import FaucetsCardHeader from "./FaucetsCardHeader";
import FaucetsCardForm from "./FaucetsCardForm";

const FaucetsCard = () => {
  return (
    <div>
      <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700/50 shadow-xl overflow-hidden">
        <FaucetsCardHeader />
        <FaucetsCardForm />
      </Card>
    </div>
  );
};

export default FaucetsCard;
