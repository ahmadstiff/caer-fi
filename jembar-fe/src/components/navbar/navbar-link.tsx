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
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`no-underline group cursor-pointer relative shadow-[#1a1b23]rounded-full p-px text-xs font-semibold leading-6 text-white inline-block
        ${isActive ? "shadow-2xl" : ""}`}
    >
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <span
          className={`absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] transition-opacity duration-500 ${
            isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        ></span>
      </span>
      <div className="relative flex space-x-2 items-center z-10 rounded-full bg-[#1a1b23] py-1.5 px-6 ring-1 ring-white/10">
        {children}
      </div>
      <span
        className={`absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 ${
          isActive ? "opacity-40" : "opacity-0 group-hover:opacity-40"
        }`}
      ></span>
    </Link>
  );
};

export default NavLink;
