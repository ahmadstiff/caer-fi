"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRightLeft, ChevronDown } from "lucide-react";
import type { Chain } from "@/types/type";
import ChainSelector from "@/components/chain-selector";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface Props {
  fromChain: Chain;
  toChain: Chain;
  setFromChain: (chain: Chain) => void;
  setToChain: (chain: Chain) => void;
}

export default function ChainSelectorButton({
  fromChain,
  toChain,
  setFromChain,
  setToChain,
}: Props) {
  const [isChainSelectorOpen, setIsChainSelectorOpen] = useState(false);
  const [activeSelectorType, setActiveSelectorType] = useState<"from" | "to">(
    "to"
  );

  const handleSwapChains = () => {
    setFromChain(toChain);
    setToChain(fromChain);
  };

  const handleOpenChainSelector = (type: "from" | "to") => {
    setActiveSelectorType(type);
    setIsChainSelectorOpen(true);
  };

  const handleChainSelect = (chain: Chain) => {
    if (activeSelectorType === "from") {
      setFromChain(chain);
    } else {
      setToChain(chain);
    }
    setIsChainSelectorOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="w-[45%]">
          <p className="text-sm text-gray-600 mb-2">From</p>
          <button
            className="w-full flex items-center border rounded-lg p-3 bg-white cursor-pointer"
            disabled
          >
            <Image
              src={fromChain.logoUrl || "/placeholder.svg"}
              alt={fromChain.name}
              width={24}
              height={24}
              className="mr-2 rounded-full"
            />
            <span className="font-medium">{fromChain.name}</span>
          </button>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-gray-100 p-2 rounded-full mt-7 hover:bg-gray-200 transition-colors cursor-pointer"
            onClick={handleSwapChains}
            aria-label="Swap chains"
          >
            <ArrowRightLeft className="h-5 w-5 text-gray-600" />
          </button>
        </div>
        <div className="w-[45%]">
          <p className="text-sm text-gray-600 mb-2">To</p>
          <button
            className="w-full flex items-center justify-between border rounded-lg p-3 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => handleOpenChainSelector("to")}
          >
            <div className="flex items-center">
              <Image
                src={toChain.logoUrl || "/placeholder.svg"}
                alt={toChain.name}
                width={24}
                height={24}
                className="mr-2 rounded-full"
              />
              <span className="font-medium">{toChain.name}</span>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>

      <Dialog open={isChainSelectorOpen} onOpenChange={setIsChainSelectorOpen}>
        <DialogContent className="p-0 max-w-md">
          <DialogTitle className="sr-only">
            Select Destination Chain
          </DialogTitle>
          <ChainSelector
            onSelect={handleChainSelect}
            onClose={() => setIsChainSelectorOpen(false)}
            selectorType={activeSelectorType}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
