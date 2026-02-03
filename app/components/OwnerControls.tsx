"use client";

import { useEffect } from "react";
import { useIsOwner } from "../hooks/useIsOwner";
import { useTransactionState } from "../hooks/useTransactionState";
import { useFundMeContract } from "../hooks/useFundMeContract";
import toast from "react-hot-toast";

const OwnerControls: React.FC = () => {
  const { isOwner } = useIsOwner();
  const { writeContract, isPending, isCorrectNetwork, isConfirmed, error } =
    useTransactionState();
  const { address, abi } = useFundMeContract();

  useEffect(() => {
    if (isConfirmed) {
      toast.dismiss();
      toast.success("Funds withdrawn successfully!");
    }
  }, [isConfirmed]);

  useEffect(() => {
    if (error) {
      toast.dismiss();
      toast.error(error.message || "Withdrawal failed");
    }
  }, [error]);

  const handleWithdraw = async () => {
    if (!isCorrectNetwork) {
      toast.error("Please switch to Sepolia network");
      return;
    }

    try {
      writeContract({
        address,
        abi,
        functionName: "withdraw",
      });
      toast.loading("Withdrawing funds...");
    } catch (error) {
      console.error("Error withdrawing:", error);
      toast.error("Failed to initiate withdrawal");
    }
  };

  // Don't render if not owner
  if (!isOwner) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Owner Controls
      </h3>
      <button
        onClick={handleWithdraw}
        disabled={!isCorrectNetwork || isPending}
        className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
      >
        {!isCorrectNetwork ? "Wrong Network" : "Withdraw Funds"}
      </button>
    </div>
  );
};

export default OwnerControls;
