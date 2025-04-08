"use client";

import Link from "next/link"
import React from "react";

interface LogoProps {
  text: string;
}

const Logo: React.FC<LogoProps> = ({ text }: LogoProps) => {
  return (
    <Link
      href="/"
      className="text-2xl font-bold bg-gradient-to-r from-[#141beb] to-[#01ECBE] 
        animate-gradient-x bg-[length:200%_100%] 
        bg-clip-text text-transparent 
        hover:opacity-80 transition-opacity"
    >
      {text}
    </Link>
  );
};

export default Logo;