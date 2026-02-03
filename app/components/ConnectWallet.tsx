"use client";

import { memo } from "react";

const ConnectWallet = memo(() => {
  return (
    <div className="text-center py-20">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">
        Welcome to FundMe
      </h2>
      <p className="text-xl text-gray-600 mb-8">
        A decentralized crowdfunding platform
      </p>
      <p className="text-gray-500">Connect your wallet to get started</p>
    </div>
  );
});

ConnectWallet.displayName = "ConnectWallet";

export default ConnectWallet;
