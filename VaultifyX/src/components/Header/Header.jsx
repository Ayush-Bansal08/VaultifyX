import React from "react"
import { Link, NavLink } from "react-router-dom";
import { ethers } from "ethers";

function Header() {
   // FOR CONNECTING THE WALLET
    const ConnectWallet = async () => {
        try{
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        }
        catch(error){
            alert("Please install MetaMask or another Ethereum wallet provider.");
            console.error("Error connecting to wallet:", error);
        }
    }

    return(
    <>
      <div className="bg-black h-20 flex items-center justify-center px-6 py-4">
                            
        <ul className="flex space-x-6 items-center">
          <li>
            <NavLink to="/" className="text-white text-lg hover:text-red-800 underline">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/SellItem"
              className="text-white text-lg hover:text-red-800 underline"
            >
              Sell Item
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/BuyItem"
              className="text-white text-lg hover:text-red-800 underline"
            >
              Buy Item
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Confirm"
              className="text-white text-lg hover:text-red-800 underline"
            >
              Confirm Delivery
            </NavLink>
          </li>
          
          <li>
            <button
              onClick={ConnectWallet}
              className="text-black bg-red-700 font-bold rounded-full px-4 py-2 animate-pulse text-lg hover:text-white"
            >
              Connect Wallet
           </button>
          </li>
        </ul>
      </div>
    </>
    )
}

export default Header;