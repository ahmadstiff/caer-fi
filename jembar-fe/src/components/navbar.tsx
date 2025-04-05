"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Logo from "./navbar/logo";
import DesktopNavigation from "./navbar/desktop-navbar";
import MobileMenuButton from "./navbar/mobile-button";
import MobileMenu from "./navbar/mobile-menu";
import ButtonConnectWallet from "./navbar/button-connect-wallet";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest("nav")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  const closeMenu = (): void => {
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0backdrop-blur-md " />
      <div className="relative flex items-center justify-between h-16 px-4 md:px-16 max-w-9xl mx-auto">
        <div className="flex items-center space-x-8">
          <Logo text="JEMBAR" />
          <DesktopNavigation />
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <ButtonConnectWallet />
        </div>

        <MobileMenuButton isOpen={isOpen} onClick={toggleMenu} />
        <MobileMenu isOpen={isOpen} onClose={closeMenu} />
      </div>
    </nav>
  );
};

export default Navbar;
