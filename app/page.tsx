"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import ConnectWallet from "./components/ConnectWallet";
import Contributions from "./components/Contributions";
import FundProject from "./components/FundProject";
import NetworkWarning from "./components/NetworkWarning";
import OwnerControls from "./components/OwnerControls";
import ContractInfo from "./components/ContractInfo";
import TransactionHistory from "./components/TransactionHistory";
import { Web3ErrorBoundary } from "./components/errors/Web3ErrorBoundary";

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">FundMe dApp</h1>
          <ConnectButton />
        </div>
      </header>

      <NetworkWarning />

      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 text-black">
        {!isConnected ? (
          <ConnectWallet />
        ) : (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <Web3ErrorBoundary>
                <FundProject />
              </Web3ErrorBoundary>
              <div className="space-y-6">
                <Web3ErrorBoundary>
                  <Contributions />
                </Web3ErrorBoundary>
                <Web3ErrorBoundary>
                  <OwnerControls />
                </Web3ErrorBoundary>
                <ContractInfo />
              </div>
            </div>
            <TransactionHistory />
          </div>
        )}
      </main>
    </div>
  );
}
