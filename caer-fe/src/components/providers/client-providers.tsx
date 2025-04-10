"use client";

import { useState } from "react";
import { lightTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { config } from "@/lib/wagmi";
import { eduChain } from "@/lib/data/chain-data";
import Navbar from "@/components/navbar";
import { Toaster } from "sonner";
import Providers from "@/app/Providers";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
         initialChain={eduChain}
          theme={lightTheme({
            accentColor: "#141beb",
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
  );
} 