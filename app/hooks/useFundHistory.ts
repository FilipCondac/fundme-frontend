"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useContractAddress } from "./useContractAddress";

export interface ContractTransaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: number;
  type: "fund" | "withdraw";
  gasUsed: string;
}

interface EtherscanTransaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timeStamp: string;
  gasUsed: string;
  functionName?: string;
  input?: string;
}

interface EtherscanInternalTransaction {
  hash: string;
  from: string;
  to: string;
  value: string;
}

interface EtherscanResponse {
  status: string;
  message: string;
  result: EtherscanTransaction[] | string;
}

export const useFundHistory = () => {
  const [transactions, setTransactions] = useState<ContractTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { address: contractAddress, isSupported } = useContractAddress();

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!contractAddress || !isSupported) return;

      setIsLoading(true);
      setError(null);

      try {
        const [{ data: txData }, { data: internalData }] = await Promise.all([
          axios.get<EtherscanResponse>("/api/etherscan", {
            params: { address: contractAddress, action: "txlist" },
          }),
          axios.get<EtherscanResponse>("/api/etherscan", {
            params: { address: contractAddress, action: "txlistinternal" },
          }),
        ]);

        if (txData.status === "1" && Array.isArray(txData.result)) {
          const internalTxMap = new Map<
            string,
            EtherscanInternalTransaction[]
          >();

          if (
            internalData.status === "1" &&
            Array.isArray(internalData.result)
          ) {
            internalData.result.forEach((itx: EtherscanInternalTransaction) => {
              if (itx.from.toLowerCase() === contractAddress.toLowerCase()) {
                if (!internalTxMap.has(itx.hash)) {
                  internalTxMap.set(itx.hash, []);
                }
                internalTxMap.get(itx.hash)?.push(itx);
              }
            });
          }

          const txs: ContractTransaction[] = txData.result
            .filter((tx: EtherscanTransaction) => {
              return (
                tx.value !== "0" ||
                tx.functionName?.toLowerCase().includes("withdraw") ||
                tx.input?.startsWith("0x3ccfd60b")
              );
            })
            .map((tx: EtherscanTransaction) => {
              let type: "fund" | "withdraw" = "fund";
              let value = tx.value;

              if (
                tx.functionName?.toLowerCase().includes("withdraw") ||
                tx.input?.startsWith("0x3ccfd60b")
              ) {
                type = "withdraw";

                const internalTxs = internalTxMap.get(tx.hash);
                if (internalTxs && internalTxs.length > 0) {
                  value = internalTxs.reduce(
                    (sum: string, itx: EtherscanInternalTransaction) => {
                      return (BigInt(sum) + BigInt(itx.value)).toString();
                    },
                    "0",
                  );
                }
              } else if (
                tx.to.toLowerCase() === contractAddress.toLowerCase() &&
                tx.value !== "0"
              ) {
                type = "fund";
              }

              return {
                hash: tx.hash,
                from: tx.from,
                to: tx.to,
                value: value,
                timestamp: parseInt(tx.timeStamp) * 1000,
                type,
                gasUsed: tx.gasUsed,
              };
            });

          setTransactions(txs);
        } else {
          const errorMsg =
            typeof txData.result === "string"
              ? txData.result
              : txData.message || "Failed to fetch transactions";
          setError(errorMsg);
        }
      } catch {
        setError("Failed to load transaction history");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [contractAddress, isSupported]);

  return {
    transactions,
    isLoading,
    error,
  };
};
