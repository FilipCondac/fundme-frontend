# FundMe dApp

A decentralized crowdfunding platform built on Ethereum. Users can fund projects with ETH and owners can withdraw contributions.

## Tech Stack

- Next.js 16 with TypeScript
- Wagmi v2 + Viem for Web3 interactions
- RainbowKit for wallet connections
- Tailwind CSS for styling

## Prerequisites

- Node.js v21.4.0+
- Web3 wallet (MetaMask, etc.)
- Sepolia ETH ([get from faucet](https://sepoliafaucet.com/))

## Setup

1. Clone and install:

```bash
git clone https://github.com/FilipCondac/fundme-frontend.git
cd fundme-frontend
npm install
```

2. Configure environment:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:

**Required:**

- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` - Get from [cloud.walletconnect.com](https://cloud.walletconnect.com/)
- `NEXT_PUBLIC_FUNDME_CONTRACT_ADDRESS` - Contract address (already set for Sepolia)

**Optional (for transaction history):**

- `ETHERSCAN_API_KEY` - Get from [etherscan.io/myapikey](https://etherscan.io/myapikey)

- `ETHERSCAN_API_KEY` stays server-side only and is proxied through `/api/etherscan`

3. Run development server:

```bash
npm run dev
```

OpeFeatures

- 🔗 Connect with multiple wallets (MetaMask, WalletConnect, Coinbase Wallet, etc.)
- 💰 Fund projects with ETH (minimum $5 USD equivalent)
- 📊 Real-time USD price conversion using Chainlink oracles
- 🔐 Owner-only withdraw functionality
- 📜 Transaction history with Fund/Withdraw tracking
- 🔄 Live transaction status updates
- 🎨 Responsive UI with loading states

## Smart Contract

- Network: Sepolia Testnet
- Address: `0xa5bc62e923a7cfdf47747f6d48fa5a3b1655f76b`
- Repository: [fundme-transaction-contract](https://github.com/FilipCondac/fundme-transaction-contract)

## Deployment

When deploying to Vercel or other platforms:

1. Add environment variables in your platform's dashboard:
   - `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
   - `NEXT_PUBLIC_FUNDME_CONTRACT_ADDRESS`
   - `ETHERSCAN_API_KEY`

2. For production security:
   - Add domain restrictions in [WalletConnect Cloud Dashboard](https://cloud.walletconnect.com)
   - Never commit `.env.local` to version control
   - Rotate API keys if exposed
     npm run dev # Development server
     npm run build # Production build
     npm run start # Production server
     npm run lint # Run linter

```

## Smart Contract

- Network: Sepolia Testnet
- Address: `0xa5bc62e923a7cfdf47747f6d48fa5a3b1655f76b`
- Repository: [fundme-transaction-contract](https://github.com/FilipCondac/fundme-transaction-contract)

## License

MIT
```
