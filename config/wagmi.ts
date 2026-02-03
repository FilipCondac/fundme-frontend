import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia, mainnet, hardhat } from "wagmi/chains";

/**
 * Wagmi Configuration
 *
 * This configures:
 * - Supported blockchain networks (chains)
 * - Wallet connection options (via RainbowKit)
 * - RPC providers for blockchain communication
 */
export const config = getDefaultConfig({
  // Your app's name - shown in wallet connection dialogs
  appName: "FundMe dApp",

  // Project ID from WalletConnect Cloud (https://cloud.walletconnect.com)
  // This enables WalletConnect v2 for mobile wallets
  projectId:
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "YOUR_PROJECT_ID",

  // Blockchain networks to support
  chains: [
    sepolia, // Ethereum Sepolia testnet - for testing
    mainnet, // Ethereum mainnet - for production
    hardhat, // Local Hardhat network - for development
  ],

  // Optional: Alchemy/Infura API keys for better RPC reliability
  // By default, wagmi uses public RPCs
  ssr: true, // Enable server-side rendering support
});
