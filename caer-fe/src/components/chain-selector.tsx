"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, X, ChevronDown } from "lucide-react";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Chain, ChainSelectorProps } from "@/types/type";

export default function ChainSelector({
  onSelect,
  onClose,
  selectorType,
}: ChainSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const availableChains: Chain[] =
    selectorType === "from"
      ? [
          {
            id: 421614,
            name: "Arbitrum",
            type: "Testnet",
            logoUrl: "/arbitrum-arb-logo.png",
          },
        ]
      : [
          {
            id: 421614,
            name: "Arbitrum",
            type: "Testnet",
            logoUrl: "/arbitrum-arb-logo.png",
          },
          {
            id: 62851553,
            name: "Ca Chain",
            type: "Testnet",
            logoUrl: "/caer.png",
          },
          {
            id: 8453,
            name: "Base",
            type: "Testnet",
            logoUrl: "/base-logo.png",
          },
        ];

  const filteredChains = availableChains.filter(
    (chain) =>
      chain.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chain.id.toString().includes(searchQuery)
  );

  return (
    <div className="bg-white rounded-xl">
      <CardHeader className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Chain Name or ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full"
          />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center">
            <span className="font-medium">Sort</span>
            <Button variant="ghost" className="ml-2 text-sm">
              Routes From Arbitrum <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div className="flex items-center">
            <span className="font-medium">Filter</span>
            <Button variant="ghost" className="ml-2 text-sm flex items-center">
              None <X className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>

        <div className="max-h-[300px] overflow-y-auto">
          {filteredChains.map((chain) => (
            <button
              key={chain.id}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50 border-b"
              onClick={() => onSelect(chain)}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 relative mr-3">
                  <Image
                    src={chain.logoUrl || "/placeholder.svg"}
                    alt={chain.name}
                    fill
                    className="rounded-full object-contain"
                  />
                </div>
                <div>
                  <p className="font-medium text-left">{chain.name}</p>
                  <p className="text-sm text-gray-500 text-left">
                    {chain.type}
                  </p>
                </div>
              </div>

              <div className="text-right">
                {chain.name === "Arbitrum" ? (
                  <p className="text-gray-600">0 route</p>
                ) : (
                  <p className="text-gray-600">1 route</p>
                )}
                <p className="text-sm text-gray-500">Routes from Arbitrum</p>
              </div>
            </button>
          ))}
        </div>

        <div className="p-4">
          <Button
            className="w-full bg-amber-500 hover:bg-amber-600 text-black font-medium py-6"
            onClick={onClose}
          >
            Continue
          </Button>
        </div>
      </CardContent>
    </div>
  );
}
