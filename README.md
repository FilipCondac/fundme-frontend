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
cp .env.example .env
```

Edit `.env` with your WalletConnect Project ID from [cloud.walletconnect.com](https://cloud.walletconnect.com/).

3. Run development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Scripts

```bash
npm run dev       # Development server
npm run build     # Production build
npm run start     # Production server
npm run lint      # Run linter
```

## Smart Contract

- Network: Sepolia Testnet
- Address: `0xa5bc62e923a7cfdf47747f6d48fa5a3b1655f76b`
- Repository: [fundme-transaction-contract](https://github.com/FilipCondac/fundme-transaction-contract)

## License

MIT
