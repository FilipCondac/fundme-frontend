import { useWaitForTransactionReceipt } from "wagmi";
import { useAccount, useWriteContract } from "wagmi";
import { formatEther } from "viem";
import { useEffect } from "react";
import { useUserContribution } from "../hooks/useFundMeContract";
import { Skeleton } from "./LoadingSkeleton";
import { useFundMeContract } from "../hooks/useFundMeContract";

const Contributions = () => {
  const { address } = useAccount();
  const { isSupported } = useFundMeContract();

  const {
    data: userFunded,
    refetch: refetchUserFunded,
    isLoading,
    isRefetching,
  } = useUserContribution(address);

  const { data: hash } = useWriteContract();

  const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isConfirmed) {
      refetchUserFunded();
    }
  }, [isConfirmed, refetchUserFunded]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Your Contribution
      </h3>
      {!isSupported ? (
        <p className="text-4xl font-bold text-gray-400">--- ETH</p>
      ) : isLoading ? (
        <Skeleton className="h-12 w-32 mb-2" />
      ) : (
        <>
          <p className="text-4xl font-bold text-indigo-600">
            {userFunded !== undefined ? formatEther(userFunded) : "0"} ETH
          </p>
          {userFunded !== undefined && userFunded > 0n && (
            <p className="text-sm text-gray-500 mt-2">
              {userFunded.toString()} wei
            </p>
          )}
        </>
      )}
      <button
        onClick={() => refetchUserFunded()}
        disabled={isRefetching || !isSupported}
        className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg
          className={`w-4 h-4 ${isRefetching ? "animate-spin" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        {isRefetching ? "Refreshing..." : "Refresh Balance"}
      </button>
    </div>
  );
};

export default Contributions;
