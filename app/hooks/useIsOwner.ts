import { useAccount } from "wagmi";
import { useOwner } from "./useFundMeContract";

export const useIsOwner = () => {
  const { address: userAddress } = useAccount();
  const { data: ownerAddress, isLoading, error } = useOwner();

  const isOwner =
    !!userAddress &&
    !!ownerAddress &&
    userAddress.toLowerCase() === ownerAddress.toLowerCase();

  return {
    isOwner,
    ownerAddress,
    isLoading,
    error,
  };
};
