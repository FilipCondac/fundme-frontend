import { useChainId } from "wagmi";
import { FUNDME_CONTRACT_ADDRESS } from "@/config/contracts";
import { sepolia } from "wagmi/chains";

export const useContractAddress = () => {
  const chainId = useChainId();

  const getAddress = () => {
    if (chainId === sepolia.id) {
      return FUNDME_CONTRACT_ADDRESS.sepolia;
    }
    return FUNDME_CONTRACT_ADDRESS.sepolia;
  };

  return {
    address: getAddress(),
    chainId,
    isSupported: chainId === sepolia.id,
  };
};
