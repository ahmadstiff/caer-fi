"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AmountInputProps {
  token: string;
  value: string;
  onChange: (value: string) => void;
}

export default function AmountInput({
  token,
  value,
  onChange,
}: AmountInputProps) {
  const handleMaxAmount = () => {
    onChange("10"); // Simulasi nilai maksimum
  };

  return (
    <div>
      <div className="flex justify-between mb-2">
        <p className="text-sm text-gray-600">Token</p>
        <p className="text-sm text-gray-600">Amount</p>
      </div>
      <div className="flex gap-4">
        <div className="w-1/2 border border-gray-200 rounded-lg p-3 bg-gray-50 flex justify-between">
          <span className="font-medium">{token}</span>
          <img
            src="/usdc.png"
            alt="usdc"
            className="w-6 h-6"
          />
        </div>
        <div className="w-1/2 flex">
          <Input
            type="number"
            placeholder="0.00"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="rounded-r-none"
          />
          <Button
            variant="outline"
            className="rounded-l-none border-l-0 text-blue-500 font-medium cursor-pointer"
            onClick={handleMaxAmount}
          >
            Max
          </Button>
        </div>
      </div>
    </div>
  );
}
