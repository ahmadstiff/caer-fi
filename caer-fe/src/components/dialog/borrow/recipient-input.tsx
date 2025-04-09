"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAccount } from "wagmi";

interface RecipientInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RecipientInput({
  value,
  onChange,
}: RecipientInputProps) {
  const { address } = useAccount();

  const handleSelfAddress = () => {
    if (address) {
      onChange(address);
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-2">
        <p className="text-sm text-gray-600">Recipient address</p>
        <p className="text-sm text-gray-600">Remote balance: 0</p>
      </div>
      <div className="flex">
        <Input
          placeholder="0x123456..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="rounded-r-none"
        />
        <Button
          variant="outline"
          className="rounded-l-none border-l-0 text-blue-500 font-medium cursor-pointer"
          onClick={handleSelfAddress}
        >
          Self
        </Button>
      </div>
    </div>
  );
}
