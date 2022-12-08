import { ethers } from "ethers";

import { testContract } from "../../Contract";

export const setupConnections = async () => {
  if (window.ethereum != null) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    return address;
  } else {
    return false;
  }
};

export const readContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(
    testContract.address,
    testContract.abi,
    provider
  );
  const x = await contract.x();
  const y = await contract.y();
  return { x, y };
};

export const writeContract = async (_x) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(
    testContract.address,
    testContract.abi,
    provider
  );
  const signer = await provider.getSigner();
  const contractWithWallet = contract.connect(signer);

  try {
    const tx = await contractWithWallet.UpdateX(_x);
    await tx.wait();
    return "txhash:" + tx.hash;
  } catch (e) {
    return "error: " + e.reason;
  }
};
