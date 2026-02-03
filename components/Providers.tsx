"use client";

/**
 * Providers Component
 *
 * This wraps the entire app and provides:
 * 1. WagmiProvider - Gives access to wallet connection and contract interaction hooks
 * 2. QueryClientProvider - Manages caching and state for blockchain data
 * 3. RainbowKitProvider - Provides beautiful wallet connection UI
 *
 * Why 'use client'?
 * These providers need browser APIs (like window.ethereum), so they must
 * run on the client side, not the server.
 */

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { config } from "@/config/wagmi";
import "@rainbow-me/rainbowkit/styles.css";
import { ReactNode, useState } from "react";
import { TransactionProvider } from "@/app/contexts/TransactionContext";
import { ToastProvider } from "@/app/components/ToastProvider";
import { ErrorBoundary } from "@/app/components/errors/ErrorBoundary";

export function Providers({ children }: { children: ReactNode }) {
  // Create a QueryClient instance
  // This manages caching, refetching, and state for all our blockchain queries
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Don't refetch on window focus by default (blockchain data doesn't change that often)
            refetchOnWindowFocus: false,
            // Keep data fresh for 5 seconds
            staleTime: 5_000,
          },
        },
      }),
  );

  return (
    <ErrorBoundary>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <TransactionProvider>
              <ToastProvider />
              {children}
            </TransactionProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ErrorBoundary>
  );
}
