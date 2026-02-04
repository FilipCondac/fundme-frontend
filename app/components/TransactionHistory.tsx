"use client";

import { memo } from "react";
import { formatEther } from "viem";
import { useFundHistory } from "../hooks/useFundHistory";
import { Skeleton } from "./LoadingSkeleton";

const TransactionHistory = memo(() => {
  const { transactions, isLoading, error } = useFundHistory();

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        All Contract Transactions
      </h3>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-3 w-32 mb-1" />
              <Skeleton className="h-3 w-40" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-4">
          <p className="text-sm text-red-600">{error}</p>
          <p className="text-xs text-gray-500 mt-1">
            Add NEXT_PUBLIC_ETHERSCAN_API_KEY to your .env file
          </p>
        </div>
      ) : transactions.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-4">
          No transactions found
        </p>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {transactions.map((tx) => (
            <div
              key={tx.hash}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      tx.type === "fund"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {tx.type === "fund" ? "Fund" : "Withdraw"}
                  </span>
                  <p className="text-sm font-medium text-gray-900">
                    {tx.value === "0" ? (
                      <span className="text-gray-500 text-xs">
                        See Etherscan →
                      </span>
                    ) : (
                      <>{formatEther(BigInt(tx.value))} ETH</>
                    )}
                  </p>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  From: {tx.from.slice(0, 6)}...{tx.from.slice(-4)}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(tx.timestamp).toLocaleDateString()}{" "}
                  {new Date(tx.timestamp).toLocaleTimeString()}
                </p>
              </div>
              <a
                href={`https://sepolia.etherscan.io/tx/${tx.hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
              >
                View →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

TransactionHistory.displayName = "TransactionHistory";

export default TransactionHistory;
