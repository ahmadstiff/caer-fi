"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, onClick }) => {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`no-underline group cursor-pointer relative rounded-full p-px text-xs font-bold leading-6 text-[#1016BC] hover:text-[#00EDBE] inline-block
        ${isActive ? "bg-blue-400 text-blue-600" : ""}`}
    >
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <span
          className={`absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(20,27,235,0.6)_0%,rgba(20,27,235,0)_75%)] transition-opacity duration-500 ${
            isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        ></span>
      </span>
      <div className="relative flex space-x-2 items-center z-10 rounded-full bg-white py-1.5 px-6 ring-1 ring-[#01ECBE]/20 transition-all duration-300 group-hover:scale-105">
        {children}
      </div>
      <span
        className={`absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-[#01ECBE]/0 via-[#01ECBE]/90 to-[#01ECBE]/0 transition-opacity duration-500 ${
          isActive ? "opacity-40" : "opacity-0 group-hover:opacity-40"
        }`}
      ></span>
    </Link>
  );
};

export default NavLink;
