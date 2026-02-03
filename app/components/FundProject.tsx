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
  } = useTransactionState();

  const { data: minimumUSD, isLoading: isLoadingMinimum } = useMinimumUSD();
  const { address, abi } = useFundMeContract();

  useEffect(() => {
    if (isConfirmed) {
      toast.dismiss();
      toast.success(
        "Transaction successful! Your contribution has been recorded.",
      );
    }
  }, [isConfirmed]);

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

      {isLoadingMinimum ? (
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
      </div>
    </div>
  );
};

export default FundProject;
