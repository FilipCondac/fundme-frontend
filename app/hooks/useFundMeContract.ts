import { useReadContract } from "wagmi";
import { fundMeABI } from "@/config/contracts";
import { useContractAddress } from "./useContractAddress";

export const useOwner = () => {
  const { address, isSupported } = useContractAddress();

  return useReadContract({
    address,
    abi: fundMeABI,
    functionName: "i_owner",
    query: {
      enabled: isSupported,
    },
  });
};

export const useMinimumUSD = () => {
  const { address, isSupported } = useContractAddress();

  return useReadContract({
    address,
    abi: fundMeABI,
    functionName: "MINIMUM_USD",
    query: {
      enabled: isSupported,
    },
  });
};

export const useUserContribution = (userAddress: `0x${string}` | undefined) => {
  const { address, isSupported } = useContractAddress();

  return useReadContract({
    address,
    abi: fundMeABI,
    functionName: "addressToAmountFunded",
    args: userAddress ? [userAddress] : undefined,
    query: {
      enabled: !!userAddress && isSupported,
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
