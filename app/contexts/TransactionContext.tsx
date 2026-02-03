"use client";

import { createContext, useContext, ReactNode } from "react";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useChainId,
} from "wagmi";
import { sepolia } from "wagmi/chains";

interface TransactionContextType {
  hash: `0x${string}` | undefined;
  writeContract: any;
  isPending: boolean;
  isConfirming: boolean;
  isConfirmed: boolean;
  error: Error | null;
  isCorrectNetwork: boolean;
  chainId: number;
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined,
);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const chainId = useChainId();
  const isCorrectNetwork = chainId === sepolia.id;

  const { data: hash, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return (
    <TransactionContext.Provider
      value={{
        hash,
        writeContract,
        isPending,
        isConfirming,
        isConfirmed,
        error,
        isCorrectNetwork,
        chainId,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error("useTransaction must be used within a TransactionProvider");
  }
  return context;
};
