import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { setupConnections } from "../helper/helper";

function NavBar() {
  const [wallet, setWallet] = useState("Connect a Wallet");
  const [logout, setLogout] = useState(false);

  const notify = (message) => toast.error(message);

  const connection = async () => {
    const res = await setupConnections();
    if (res === false) {
      notify("No Ether wallet available");
      setWallet("Connect a Wallet");
    } else {
      setLogout(true);
      setWallet(res.slice(0, 6) + "..." + res.slice(36, 42));
    }
  };
  const disconnect = async () => {
    setWallet("Connect a Wallet");
    setLogout(false);
  };
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => {
        connection();
      });
      window.ethereum.on("accountsChanged", () => {
        connection();
      });
    }
  }, []);
  return (
    <>
      <div className="grid sm:grid-cols-2 sm:justify-between justify-center bg-gray-600">
        <div className="ml-10 py-5">
          <h1 className="text-white font-bold text-4xl">Web3.0</h1>
        </div>
        <div className="grid ${}  sm:justify-end justify-center py-5 sm:mr-10">
          <button
            className="grid justify-center w-[200px] shadow-lg border items-center text-white text-xl bg-gray-700 rounded-xl"
            onClick={connection}
          >
            {wallet}
          </button>
          <button
            className="grid justify-center w-[200px] shadow-lg border items-center text-white text-xl bg-gray-700 rounded-xl"
            onClick={disconnect}
            style={{ display: logout ? "block" : "none" }}
          >
            Disconnect
          </button>
        </div>
      </div>
    </>
  );
}

export default NavBar;
