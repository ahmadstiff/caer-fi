"use client";
import React, { useState } from "react";
import { Geist, Azeret_Mono as Geist_Mono } from "next/font/google";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { config } from "@/lib/wagmi";
import Navbar from "@/components/navbar";
import { Toaster } from "sonner";
import Providers from "./Providers";

// Initialize fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Define layout props type
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen bg-[#000000]`}
      >
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider
              theme={darkTheme({
                accentColor: "#7b3fe4",
                accentColorForeground: "white",
                borderRadius: "medium",
                fontStack: "system",
                overlayBlur: "small",
              })}
            >
              <div className="">
                <div className="relative z-99">
                  <Navbar />
                </div>
                <div className="mt-5 relative z-10">
                  <Providers>{children}</Providers>
                </div>
                <Toaster />
              </div>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
