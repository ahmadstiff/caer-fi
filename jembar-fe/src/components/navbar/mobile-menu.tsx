"use client"

import React from "react";
import { X, PiggyBank, LineChart, LayoutDashboard } from "lucide-react";
import NavLink from "./navbar-link";
import ButtonConnectWallet from "./button-connect-wallet";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-md"
        onClick={onClose}
        role="presentation"
      />
      <div
        className="fixed top-0 right-0 h-full w-full bg-gradient-to-b from-[#0d0d21] to-[#0d0d21]/95 backdrop-blur-lg transform transition-transform duration-300 ease-in-out"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
      >
        <div className="flex justify-between items-center px-6 h-16 border-b border-white/10">
          <span className="">
            Menu
          </span>
          <button
            onClick={onClose}
            className="text-gray-200 hover:text-white transition-colors"
            aria-label="Close menu"
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-2">
          <NavLink href="/borrow" onClick={onClose}>
            <span>Borrow</span>
          </NavLink>

          <NavLink href="/lending" onClick={onClose}>
            <span>Lending</span>
          </NavLink>

          <NavLink href="/dummy" onClick={onClose}>
            <span>Dummy</span>
          </NavLink>

          <div className="px-6 pt-4 mt-4 border-t border-white/10">
            <ButtonConnectWallet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
