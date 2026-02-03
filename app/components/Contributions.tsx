import { useWaitForTransactionReceipt } from "wagmi";
import { useAccount, useWriteContract } from "wagmi";
import { formatEther } from "viem";
import { useEffect } from "react";
import { useUserContribution } from "../hooks/useFundMeContract";
import { Skeleton } from "./LoadingSkeleton";

const Contributions = () => {
  const { address } = useAccount();

  const { data: userFunded, refetch: refetchUserFunded, isLoading } = useUserContribution(address);

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
      {isLoading ? (
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
        className="mt-4 text-sm text-indigo-600 hover:text-indigo-800 underline"
      >
        🔄 Refresh Balance
      </button>
    </div>
  );
};

export default Contributions;
