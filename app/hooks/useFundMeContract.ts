import { useReadContract } from "wagmi";
import { fundMeABI } from "@/config/contracts";
import { useContractAddress } from "./useContractAddress";

export const useOwner = () => {
  const { address } = useContractAddress();

  return useReadContract({
    address,
    abi: fundMeABI,
    functionName: "i_owner",
  });
};

export const useMinimumUSD = () => {
  const { address } = useContractAddress();

  return useReadContract({
    address,
    abi: fundMeABI,
    functionName: "MINIMUM_USD",
  });
};

export const useUserContribution = (userAddress: `0x${string}` | undefined) => {
  const { address } = useContractAddress();

  return useReadContract({
    address,
    abi: fundMeABI,
    functionName: "addressToAmountFunded",
    args: userAddress ? [userAddress] : undefined,
    query: {
      enabled: !!userAddress,
      refetchInterval: 10000,
    },
  });
};

export const useFundMeContract = () => {
  const { address, chainId, isSupported } = useContractAddress();

  return {
    address,
    chainId,
    isSupported,
    abi: fundMeABI,
  };
};
