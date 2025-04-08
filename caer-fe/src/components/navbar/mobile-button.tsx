"use client";

import React from "react";
import { Menu, X } from "lucide-react";

interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({
  isOpen,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="md:hidden p-2 text-gray-200 hover:text-white transition-colors"
      aria-label="Toggle menu"
      type="button"
    >
      {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-4 h-4" />}
    </button>
  );
};

export default MobileMenuButton;