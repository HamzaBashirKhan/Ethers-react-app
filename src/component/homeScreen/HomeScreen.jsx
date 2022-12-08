import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { readContract, writeContract } from "../helper/helper";
import { ethers } from "ethers";
function HomeScreen() {
  const [valueOfX, setValueOfX] = useState(0);
  const [valueOfY, setValueOfY] = useState(0);
  const [inputX, setInputX] = useState(0);
  const [transactionURL, setTransactionURL] = useState("");
  const [button, setButton] = useState(false);

  const display = (e) => {
    setInputX(e.target.value);
  };
  const notify = (message) => toast(message);

  const fun = async () => {
    const { x, y } = await readContract();
    setValueOfX(parseInt(x, 10));
    console.log(ethers.utils.parseEther(x.toString()));
    console.log(ethers.utils.parseEther(y.toString()));
    setValueOfY(parseInt(y, 10));
  };

  useEffect(() => {
    fun();
  });
  return (
    <div className="bg-gray-700 text-gray grid">
      <div className="mx-20 py-10 ">
        <input className="rounded" type="number" onChange={display} />
        <button
          className="mx-2 bg-gray-600 w-[100px] text-white rounded border"
          onClick={async () => {
            const response = await writeContract(inputX);
            if (response.slice(0, 5) === "error") {
              notify(response.slice(7));
            } else {
              notify("Transaction Successful");
              setTransactionURL(
                "https://goerli.etherscan.io/tx/" + response.slice(7)
              );
              setButton(true);
            }
          }}
        >
          Submit
        </button>
      </div>
      <div className="text-white grid justify-center pb-20">
        <p>Value of X: {valueOfX}</p>
        <p className="mt-4">Value of Y: {valueOfY}</p>
      </div>
      <button
        style={{ display: button ? "block" : "none" }}
        className="text-white border border-white py-5 my-48"
        type="button"
      >
        <a href={transactionURL}>LINK</a>
      </button>
    </div>
  );
}

export default HomeScreen;
