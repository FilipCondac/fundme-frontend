import { useTransaction } from "../contexts/TransactionContext";

export const useTransactionState = () => {
  const {
    writeContract,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    isCorrectNetwork,
    chainId,
  } = useTransaction();

  const isProcessing = isPending || isConfirming;
  const canTransact = isCorrectNetwork && !isProcessing;

  const getStatusMessage = () => {
    if (!isCorrectNetwork) return "Wrong Network";
    if (isPending) return "Check Wallet...";
    if (isConfirming) return "Confirming...";
    if (isConfirmed) return "Success!";
    return "Ready";
  };

  return {
    writeContract,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    isCorrectNetwork,
    chainId,
    isProcessing,
    canTransact,
    statusMessage: getStatusMessage(),
  };
};
