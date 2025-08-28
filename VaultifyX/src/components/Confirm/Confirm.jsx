import React, { useState } from "react";
import { ethers } from "ethers";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

function Confirm() {
  const [tokenuri, setTokenuri] = useState("");
  const [loading, setLoading] = useState(false);

const WalletAddress = "0x1165fDE0D4e9c0830A15B395dD753e1F6748bE56";
    const WalletABI = [{"type":"constructor","inputs":[{"name":"pricefeedAddress","type":"address","internalType":"address"}],"stateMutability":"nonpayable"},{"type":"function","name":"AvailableItems","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"BuyItem","inputs":[{"name":"tokenURI","type":"string","internalType":"string"}],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"ConfirmDelivery","inputs":[{"name":"tokenURI","type":"string","internalType":"string"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"SellItem","inputs":[{"name":"tokenURI","type":"string","internalType":"string"},{"name":"_SellerName","type":"string","internalType":"string"},{"name":"DollarPrice","type":"uint256","internalType":"uint256"},{"name":"ItemName","type":"string","internalType":"string"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"SellersList","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"TIMEPERIOD","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"boughtTokenURIs","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"checkUpkeep","inputs":[{"name":"","type":"bytes","internalType":"bytes"}],"outputs":[{"name":"upkeepNeeded","type":"bool","internalType":"bool"},{"name":"","type":"bytes","internalType":"bytes"}],"stateMutability":"view"},{"type":"function","name":"getAvailableItems","inputs":[],"outputs":[{"name":"","type":"string[]","internalType":"string[]"}],"stateMutability":"view"},{"type":"function","name":"getItemPrice","inputs":[{"name":"tokenURL","type":"string","internalType":"string"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getTimePeriod","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"pure"},{"type":"function","name":"getUSDtoETHPRICE","inputs":[{"name":"dollaramount","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"onERC721Received","inputs":[{"name":"operator","type":"address","internalType":"address"},{"name":"from","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"},{"name":"data","type":"bytes","internalType":"bytes"}],"outputs":[{"name":"","type":"bytes4","internalType":"bytes4"}],"stateMutability":"pure"},{"type":"function","name":"performUpkeep","inputs":[{"name":"","type":"bytes","internalType":"bytes"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"remove","inputs":[{"name":"tokenuri","type":"string","internalType":"string"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"s_IsAtokenURI","inputs":[{"name":"","type":"string","internalType":"string"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"s_IsRefundPending","inputs":[{"name":"","type":"string","internalType":"string"}],"outputs":[{"name":"","type":"uint8","internalType":"enum VaultifyX.IsRefundPending"}],"stateMutability":"view"},{"type":"function","name":"s_IsSeller","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"s_ItemURIToBuyer","inputs":[{"name":"","type":"string","internalType":"string"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"s_SellerAddressToName","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"s_SellerAddressTotokenURI","inputs":[{"name":"","type":"address","internalType":"address"},{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"s_buyerToETHPaid","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"s_buyersToItemURI","inputs":[{"name":"","type":"address","internalType":"address"},{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"s_itemStatus","inputs":[{"name":"","type":"string","internalType":"string"}],"outputs":[{"name":"","type":"uint8","internalType":"enum VaultifyX.ItemStatus"}],"stateMutability":"view"},{"type":"function","name":"s_pricefeed","inputs":[],"outputs":[{"name":"","type":"address","internalType":"contract AggregatorV3Interface"}],"stateMutability":"view"},{"type":"function","name":"s_tokenIDtoItems","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"tokenURI","type":"string","internalType":"string"},{"name":"price","type":"uint256","internalType":"uint256"},{"name":"name","type":"string","internalType":"string"},{"name":"seller","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"s_tokenURItoItemName","inputs":[{"name":"","type":"string","internalType":"string"}],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"s_tokenURItoPrice","inputs":[{"name":"","type":"string","internalType":"string"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"s_tokenURItoSellerAddress","inputs":[{"name":"","type":"string","internalType":"string"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"s_tokenURItoTimeOfPurchasing","inputs":[{"name":"","type":"string","internalType":"string"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"s_tokenURItoindex","inputs":[{"name":"","type":"string","internalType":"string"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"vaultifyxnft","inputs":[],"outputs":[{"name":"","type":"address","internalType":"contract VaultifyXNFT"}],"stateMutability":"view"},{"type":"event","name":"ApprovedByTheSeller","inputs":[{"name":"sellerName","type":"string","indexed":true,"internalType":"string"},{"name":"tokenURI","type":"string","indexed":true,"internalType":"string"}],"anonymous":false},{"type":"event","name":"BuyerPaidSuccessfully","inputs":[{"name":"buyer","type":"address","indexed":true,"internalType":"address"},{"name":"tokenURI","type":"string","indexed":true,"internalType":"string"}],"anonymous":false},{"type":"event","name":"Debug","inputs":[{"name":"message","type":"string","indexed":true,"internalType":"string"}],"anonymous":false},{"type":"event","name":"DeliveryIsConfirmed","inputs":[{"name":"tokenURI","type":"string","indexed":true,"internalType":"string"},{"name":"buyer","type":"address","indexed":true,"internalType":"address"},{"name":"seller","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"MoneyTransferredToSeller","inputs":[{"name":"seller","type":"address","indexed":true,"internalType":"address"},{"name":"amount","type":"uint256","indexed":true,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"NFTTransferredFromContractToBuyer","inputs":[{"name":"tokenURI","type":"string","indexed":true,"internalType":"string"}],"anonymous":false},{"type":"event","name":"RefundInitiated","inputs":[{"name":"tokenURI","type":"string","indexed":true,"internalType":"string"},{"name":"buyer","type":"address","indexed":true,"internalType":"address"},{"name":"seller","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"TransferredNFTFromSellerToContract","inputs":[{"name":"tokenURI","type":"string","indexed":true,"internalType":"string"}],"anonymous":false},{"type":"event","name":"sellerAdded","inputs":[{"name":"SellerName","type":"string","indexed":true,"internalType":"string"}],"anonymous":false},{"type":"error","name":"EnteraValidPrice","inputs":[]},{"type":"error","name":"InvalidTokenURI","inputs":[]},{"type":"error","name":"ItemAlreadySold","inputs":[]},{"type":"error","name":"NameCannotBeEmpty","inputs":[]},{"type":"error","name":"NotAuthorized","inputs":[]},{"type":"error","name":"NotAvailableTokenURI","inputs":[]},{"type":"error","name":"PayTheExactPrice","inputs":[]},{"type":"error","name":"ReentrancyGuardReentrantCall","inputs":[]},{"type":"error","name":"RepeatedTokenURI","inputs":[]},{"type":"error","name":"SellerCantBuy","inputs":[]},{"type":"error","name":"TransferFailed","inputs":[]},{"type":"error","name":"UnapprovedBuyer","inputs":[]},{"type":"error","name":"YouCantConfirmYourOwnDelivery","inputs":[]}]

  const confirm = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask to use this feature.");
        return;
      }
      setLoading(true);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(WalletAddress, WalletABI, signer);
      await provider.send("eth_requestAccounts", []);

      const transaction = await contract.ConfirmDelivery(tokenuri);
      await transaction.wait();

      alert("✅ Delivery confirmed successfully!");
      setTokenuri("");
    } catch (error) {
      console.error("Error in confirm function:", error);
      alert("⚠️ An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md shadow-2xl rounded-2xl bg-white/90 backdrop-blur-sm p-6 space-y-6"
      >
        <div className="text-center">
          <CheckCircle2 className="mx-auto text-green-500 w-12 h-12 mb-2" />
          <h2 className="text-2xl font-bold text-gray-800">
            Confirm Delivery
          </h2>
          <p className="text-sm text-gray-500">
            Enter the tokenURI of the item you want to confirm only if you have recieved your order
          </p>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="ipfs://(CID)"
            value={tokenuri}
            onChange={(e) => setTokenuri(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500"
          />

          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl shadow-lg transition-all duration-300"
            onClick={confirm}
            disabled={loading || !tokenuri}
          >
            {loading ? "Confirming..." : "Confirm Delivery"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default Confirm;
