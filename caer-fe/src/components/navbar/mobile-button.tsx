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
      className="p-2 text-gray-600  hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
      aria-label="Toggle menu"
      type="button"
    >
      {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
    </button>
  );
};

export default MobileMenuButton;