"use client"

import React from "react";
import { X } from "lucide-react";
import NavLink from "./navbar-link";
import ButtonConnectWallet from "./button-connect-wallet";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  return (
    <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
      <div
        className="fixed inset-0 bg-black/20 dark:bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        role="presentation"
      />
      <div
        className={`fixed top-0 right-0 h-full w-[85%] max-w-[400px] bg-white dark:bg-[#0d0d21] shadow-lg transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
      >
        <div className="flex justify-between items-center px-6 h-16 border-b border-gray-200 dark:border-white/10">
          <span className="text-gray-900 dark:text-white font-medium">
            Menu
          </span>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors"
            aria-label="Close menu"
            type="button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 flex flex-col">
          <NavLink href="/lending" onClick={onClose}>
            <span className="flex items-center px-6 py-3 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5">
              Lending
            </span>
          </NavLink>

          <NavLink href="/borrow" onClick={onClose}>
            <span className="flex items-center px-6 py-3 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5">
              Borrow
            </span>
          </NavLink>

          <NavLink href="/trade" onClick={onClose}>
            <span className="flex items-center px-6 py-3 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5">
              Trade
            </span>
          </NavLink>

          <NavLink href="/faucets" onClick={onClose}>
            <span className="flex items-center px-6 py-3 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5">
              Faucets
            </span>
          </NavLink>

          <div className="px-6 pt-6 mt-4 border-t border-gray-200 dark:border-white/10">
            <div className="w-full">
              <ButtonConnectWallet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
