/**
 * FundMe Contract Configuration
 *
 * This file contains:
 * - Contract ABI (Application Binary Interface) - tells the frontend how to interact with the contract
 * - Contract address - where the contract is deployed on the blockchain
 */

// The ABI describes all functions, events, and errors in the contract
export const fundMeABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "NotOwner",
    type: "error",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [],
    name: "MINIMUM_USD",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "addressToAmountFunded",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "fund",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "funders",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "i_owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

/**
 * Contract Addresses by Network
 *
 * Update these after deploying your contract to different networks
 * You can have different addresses for testnet vs mainnet
 */
export const FUNDME_CONTRACT_ADDRESS = {
  // Sepolia testnet address - update after deployment
  sepolia:
    (process.env.NEXT_PUBLIC_FUNDME_CONTRACT_ADDRESS as `0x${string}`) || "0x",

  // Mainnet address - only deploy here when ready for production!
  mainnet: "0x" as `0x${string}`,

  // Local Hardhat network - if you're testing locally
  hardhat: "0x5FbDB2315678afecb367f032d93F642f64180aa3" as `0x${string}`,
} as const;
