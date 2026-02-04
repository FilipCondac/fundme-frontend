"use client";

import { useState, useEffect } from "react";
import { formatEther, parseEther } from "viem";
import { useTransactionState } from "../hooks/useTransactionState";
import { useMinimumUSD } from "../hooks/useFundMeContract";
import { useFundMeContract } from "../hooks/useFundMeContract";
import toast from "react-hot-toast";
import { Skeleton } from "./LoadingSkeleton";

const FundProject = () => {
  const [fundAmount, setFundAmount] = useState("");

  const {
    writeContract,
    isPending,
    isConfirming,
    isConfirmed,
    error: writeError,
    isCorrectNetwork,
    hash,
  } = useTransactionState();

  const { data: minimumUSD, isLoading: isLoadingMinimum } = useMinimumUSD();
  const { address, abi, isSupported } = useFundMeContract();

  useEffect(() => {
    if (isConfirmed) {
      toast.dismiss();
      toast.success(
        "Transaction successful! Your contribution has been recorded.",
      );
      console.log("Transaction confirmed with hash:", hash);
    }
  }, [isConfirmed, hash]);

  useEffect(() => {
    if (writeError) {
      toast.dismiss(); // Dismiss loading toast
      toast.error(writeError.message || "Transaction failed");
    }
  }, [writeError]);

  const handleFund = async () => {
    if (!isCorrectNetwork) {
      toast.error("Please switch to Sepolia network", {
        duration: 4000,
      });
      return;
    }
    if (!fundAmount || parseFloat(fundAmount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    try {
      writeContract({
        address,
        abi,
        functionName: "fund",
        value: parseEther(fundAmount),
      });
      toast.loading("Waiting for wallet confirmation...");
      setFundAmount("");
    } catch (error) {
      console.error("Error funding:", error);
      toast.error("Failed to initiate transaction");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold  mb-6">Fund the Project</h2>

      {!isSupported ? (
        <div className="mb-4 p-4 bg-yellow-50 rounded-lg">
          <p className="text-sm text-yellow-700">
            Switch to Sepolia network to view details
          </p>
        </div>
      ) : isLoadingMinimum ? (
        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <Skeleton className="h-4 w-3/4" />
        </div>
      ) : minimumUSD ? (
        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-600">
            Minimum required: ${formatEther(minimumUSD)} USD worth of ETH
          </p>
        </div>
      ) : null}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Amount (ETH)</label>
          <input
            type="number"
            step="0.001"
            value={fundAmount}
            onChange={(e) => setFundAmount(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="0.01"
            disabled={isPending || isConfirming}
          />
        </div>

        <button
          onClick={handleFund}
          disabled={!isCorrectNetwork || isPending || isConfirming}
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
        >
          {!isCorrectNetwork
            ? "Wrong Network"
            : isPending
              ? "Check Wallet..."
              : isConfirming
                ? "Confirming..."
                : "Fund Project"}
        </button>

        {hash && isConfirmed && (
          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm font-semibold text-green-800">
                Transaction Confirmed!
              </p>
            </div>
            <a
              href={`https://sepolia.etherscan.io/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-indigo-700 hover:text-indigo-900 font-medium transition-colors group"
            >
              <span>View on Etherscan</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
            <p className="text-xs text-gray-600 mt-2 font-mono break-all">
              {hash}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FundProject;
