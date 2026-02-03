"use client";

import { useOwner } from "../hooks/useFundMeContract";
import { useContractAddress } from "../hooks/useContractAddress";

const ContractInfo: React.FC = () => {
  const { data: owner } = useOwner();
  const { address } = useContractAddress();

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Contract Info
      </h3>
      <div className="space-y-2 text-sm">
        <p className="text-gray-600">
          <span className="font-medium">Network:</span> Sepolia
        </p>
        <p className="text-gray-600 break-all">
          <span className="font-medium">Address:</span>{" "}
          {address}
        </p>
        {owner && (
          <p className="text-gray-600 break-all">
            <span className="font-medium">Owner:</span> {owner}
          </p>
        )}
      </div>
    </div>
  );
};

export default ContractInfo;
