export const testContract = {
  address: "0x1eC94c3Baf6F6B98E0A8bA45df8DD5ECB1176d95",
  abi: [
    {
      inputs: [{ internalType: "uint256", name: "_x", type: "uint256" }],
      name: "UpdateX",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "x",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "y",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
  ],
};
