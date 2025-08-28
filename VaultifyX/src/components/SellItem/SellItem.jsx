import React, { useState } from "react";
import { ethers } from "ethers";
import {
  Upload,
  DollarSign,
  User,
  Tag,
  Link as LinkIcon,
} from "lucide-react";

function SellItem() {
  const [TokenURI, settokenURI] = useState("");
  const [SellerName, setSellerName] = useState("");
  const [DollarPrice, setDollarPrice] = useState("");
  const [ItemName, setItemName] = useState("");

const WalletAddress = "0x1165fDE0D4e9c0830A15B395dD753e1F6748bE56";
    const WalletABI = [{"type":"constructor","inputs":[{"name":"pricefeedAddress","type":"address","internalType":"address"}],"stateMutability":"nonpayable"},{"type":"function","name":"AvailableItems","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"BuyItem","inputs":[{"name":"tokenURI","type":"string","internalType":"string"}],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"ConfirmDelivery","inputs":[{"name":"tokenURI","type":"string","internalType":"string"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"SellItem","inputs":[{"name":"tokenURI","type":"string","internalType":"string"},{"name":"_SellerName","type":"string","internalType":"string"},{"name":"DollarPrice","type":"uint256","internalType":"uint256"},{"name":"ItemName","type":"string","internalType":"string"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"SellersList","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"TIMEPERIOD","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"boughtTokenURIs","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"checkUpkeep","inputs":[{"name":"","type":"bytes","internalType":"bytes"}],"outputs":[{"name":"upkeepNeeded","type":"bool","internalType":"bool"},{"name":"","type":"bytes","internalType":"bytes"}],"stateMutability":"view"},{"type":"function","name":"getAvailableItems","inputs":[],"outputs":[{"name":"","type":"string[]","internalType":"string[]"}],"stateMutability":"view"},{"type":"function","name":"getItemPrice","inputs":[{"name":"tokenURL","type":"string","internalType":"string"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getTimePeriod","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"pure"},{"type":"function","name":"getUSDtoETHPRICE","inputs":[{"name":"dollaramount","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"onERC721Received","inputs":[{"name":"operator","type":"address","internalType":"address"},{"name":"from","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"},{"name":"data","type":"bytes","internalType":"bytes"}],"outputs":[{"name":"","type":"bytes4","internalType":"bytes4"}],"stateMutability":"pure"},{"type":"function","name":"performUpkeep","inputs":[{"name":"","type":"bytes","internalType":"bytes"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"remove","inputs":[{"name":"tokenuri","type":"string","internalType":"string"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"s_IsAtokenURI","inputs":[{"name":"","type":"string","internalType":"string"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"s_IsRefundPending","inputs":[{"name":"","type":"string","internalType":"string"}],"outputs":[{"name":"","type":"uint8","internalType":"enum VaultifyX.IsRefundPending"}],"stateMutability":"view"},{"type":"function","name":"s_IsSeller","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"s_ItemURIToBuyer","inputs":[{"name":"","type":"string","internalType":"string"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"s_SellerAddressToName","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"s_SellerAddressTotokenURI","inputs":[{"name":"","type":"address","internalType":"address"},{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"s_buyerToETHPaid","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"s_buyersToItemURI","inputs":[{"name":"","type":"address","internalType":"address"},{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"s_itemStatus","inputs":[{"name":"","type":"string","internalType":"string"}],"outputs":[{"name":"","type":"uint8","internalType":"enum VaultifyX.ItemStatus"}],"stateMutability":"view"},{"type":"function","name":"s_pricefeed","inputs":[],"outputs":[{"name":"","type":"address","internalType":"contract AggregatorV3Interface"}],"stateMutability":"view"},{"type":"function","name":"s_tokenIDtoItems","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"tokenURI","type":"string","internalType":"string"},{"name":"price","type":"uint256","internalType":"uint256"},{"name":"name","type":"string","internalType":"string"},{"name":"seller","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"s_tokenURItoItemName","inputs":[{"name":"","type":"string","internalType":"string"}],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"s_tokenURItoPrice","inputs":[{"name":"","type":"string","internalType":"string"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"s_tokenURItoSellerAddress","inputs":[{"name":"","type":"string","internalType":"string"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"s_tokenURItoTimeOfPurchasing","inputs":[{"name":"","type":"string","internalType":"string"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"s_tokenURItoindex","inputs":[{"name":"","type":"string","internalType":"string"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"vaultifyxnft","inputs":[],"outputs":[{"name":"","type":"address","internalType":"contract VaultifyXNFT"}],"stateMutability":"view"},{"type":"event","name":"ApprovedByTheSeller","inputs":[{"name":"sellerName","type":"string","indexed":true,"internalType":"string"},{"name":"tokenURI","type":"string","indexed":true,"internalType":"string"}],"anonymous":false},{"type":"event","name":"BuyerPaidSuccessfully","inputs":[{"name":"buyer","type":"address","indexed":true,"internalType":"address"},{"name":"tokenURI","type":"string","indexed":true,"internalType":"string"}],"anonymous":false},{"type":"event","name":"Debug","inputs":[{"name":"message","type":"string","indexed":true,"internalType":"string"}],"anonymous":false},{"type":"event","name":"DeliveryIsConfirmed","inputs":[{"name":"tokenURI","type":"string","indexed":true,"internalType":"string"},{"name":"buyer","type":"address","indexed":true,"internalType":"address"},{"name":"seller","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"MoneyTransferredToSeller","inputs":[{"name":"seller","type":"address","indexed":true,"internalType":"address"},{"name":"amount","type":"uint256","indexed":true,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"NFTTransferredFromContractToBuyer","inputs":[{"name":"tokenURI","type":"string","indexed":true,"internalType":"string"}],"anonymous":false},{"type":"event","name":"RefundInitiated","inputs":[{"name":"tokenURI","type":"string","indexed":true,"internalType":"string"},{"name":"buyer","type":"address","indexed":true,"internalType":"address"},{"name":"seller","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"TransferredNFTFromSellerToContract","inputs":[{"name":"tokenURI","type":"string","indexed":true,"internalType":"string"}],"anonymous":false},{"type":"event","name":"sellerAdded","inputs":[{"name":"SellerName","type":"string","indexed":true,"internalType":"string"}],"anonymous":false},{"type":"error","name":"EnteraValidPrice","inputs":[]},{"type":"error","name":"InvalidTokenURI","inputs":[]},{"type":"error","name":"ItemAlreadySold","inputs":[]},{"type":"error","name":"NameCannotBeEmpty","inputs":[]},{"type":"error","name":"NotAuthorized","inputs":[]},{"type":"error","name":"NotAvailableTokenURI","inputs":[]},{"type":"error","name":"PayTheExactPrice","inputs":[]},{"type":"error","name":"ReentrancyGuardReentrantCall","inputs":[]},{"type":"error","name":"RepeatedTokenURI","inputs":[]},{"type":"error","name":"SellerCantBuy","inputs":[]},{"type":"error","name":"TransferFailed","inputs":[]},{"type":"error","name":"UnapprovedBuyer","inputs":[]},{"type":"error","name":"YouCantConfirmYourOwnDelivery","inputs":[]}]


    const nftabi = [{"type":"constructor","inputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"approve","inputs":[{"name":"to","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"balanceOf","inputs":[{"name":"owner","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"burn","inputs":[{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"getApproved","inputs":[{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"getTokenID","inputs":[{"name":"_tokenURI","type":"string","internalType":"string"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getTokenURI","inputs":[{"name":"tokenID","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"isApprovedForAll","inputs":[{"name":"owner","type":"address","internalType":"address"},{"name":"operator","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"mintNFT","inputs":[{"name":"_tokenURI","type":"string","internalType":"string"},{"name":"recipient","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"name","inputs":[],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"ownerOf","inputs":[{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"s_tokenURItoID","inputs":[{"name":"","type":"string","internalType":"string"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"safeTransferFrom","inputs":[{"name":"from","type":"address","internalType":"address"},{"name":"to","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"safeTransferFrom","inputs":[{"name":"from","type":"address","internalType":"address"},{"name":"to","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"},{"name":"data","type":"bytes","internalType":"bytes"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"setApprovalForAll","inputs":[{"name":"operator","type":"address","internalType":"address"},{"name":"approved","type":"bool","internalType":"bool"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"supportsInterface","inputs":[{"name":"interfaceId","type":"bytes4","internalType":"bytes4"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"symbol","inputs":[],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"tokenURI","inputs":[{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"transferFrom","inputs":[{"name":"from","type":"address","internalType":"address"},{"name":"to","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"event","name":"Approval","inputs":[{"name":"owner","type":"address","indexed":true,"internalType":"address"},{"name":"approved","type":"address","indexed":true,"internalType":"address"},{"name":"tokenId","type":"uint256","indexed":true,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"ApprovalForAll","inputs":[{"name":"owner","type":"address","indexed":true,"internalType":"address"},{"name":"operator","type":"address","indexed":true,"internalType":"address"},{"name":"approved","type":"bool","indexed":false,"internalType":"bool"}],"anonymous":false},{"type":"event","name":"Transfer","inputs":[{"name":"from","type":"address","indexed":true,"internalType":"address"},{"name":"to","type":"address","indexed":true,"internalType":"address"},{"name":"tokenId","type":"uint256","indexed":true,"internalType":"uint256"}],"anonymous":false},{"type":"error","name":"ERC721IncorrectOwner","inputs":[{"name":"sender","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"},{"name":"owner","type":"address","internalType":"address"}]},{"type":"error","name":"ERC721InsufficientApproval","inputs":[{"name":"operator","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"}]},{"type":"error","name":"ERC721InvalidApprover","inputs":[{"name":"approver","type":"address","internalType":"address"}]},{"type":"error","name":"ERC721InvalidOperator","inputs":[{"name":"operator","type":"address","internalType":"address"}]},{"type":"error","name":"ERC721InvalidOwner","inputs":[{"name":"owner","type":"address","internalType":"address"}]},{"type":"error","name":"ERC721InvalidReceiver","inputs":[{"name":"receiver","type":"address","internalType":"address"}]},{"type":"error","name":"ERC721InvalidSender","inputs":[{"name":"sender","type":"address","internalType":"address"}]},{"type":"error","name":"ERC721NonexistentToken","inputs":[{"name":"tokenId","type":"uint256","internalType":"uint256"}]}]

  const Submit = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask");
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();

      const contract1 = new ethers.Contract(WalletAddress, WalletABI, provider);
      const contract2 = new ethers.Contract(WalletAddress, WalletABI, signer);

      const transaction = await contract2.SellItem(
        TokenURI,
        SellerName,
        DollarPrice,
        ItemName
      );
      await transaction.wait();

      const nftcontractaddress = await contract1.vaultifyxnft();
      const nftcontract = new ethers.Contract(nftcontractaddress, nftabi, signer);
      
      const tokenId = await nftcontract.getTokenID(TokenURI);
      const transactionapproval = await nftcontract.setApprovalForAll(WalletAddress, true);
      await transactionapproval.wait();

      alert("✅ Item listed and NFT minted successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Failed to list item. Check console.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-blue-950 p-6">
      <div className="w-full max-w-lg bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-cyan-500/30">
        <h1 className="text-3xl font-bold text-center mb-6 text-cyan-400">
          Sell Your Item
        </h1>

        {/* Token URI */}
        <div className="mb-4">
          <label className="flex items-center text-sm text-gray-300 mb-1">
            <LinkIcon className="w-4 h-4 mr-2 text-cyan-400" /> Metadata URI
          </label>
          <input
            type="text"
            placeholder="ipfs://CID(Metadata)"
            value={TokenURI}
            onChange={(e) => settokenURI(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-gray-800/70 text-white border border-cyan-500/30 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Seller Name */}
        <div className="mb-4">
          <label className="flex items-center text-sm text-gray-300 mb-1">
            <User className="w-4 h-4 mr-2 text-purple-400" /> Seller Name
          </label>
          <input
            type="text"
            placeholder="Your name"
            value={SellerName}
            onChange={(e) => setSellerName(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-gray-800/70 text-white border border-purple-500/30 focus:outline-none focus:border-purple-400"
          />
        </div>

        {/* Dollar Price */}
        <div className="mb-4">
          <label className="flex items-center text-sm text-gray-300 mb-1">
            <DollarSign className="w-4 h-4 mr-2 text-yellow-400" /> Price (USD)
          </label>
          <input
            type="number"
            placeholder="Enter price in USD"
            value={DollarPrice}
            onChange={(e) => setDollarPrice(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-gray-800/70 text-white border border-yellow-500/30 focus:outline-none focus:border-yellow-400"
          />
        </div>

        {/* Item Name */}
        <div className="mb-6">
          <label className="flex items-center text-sm text-gray-300 mb-1">
            <Tag className="w-4 h-4 mr-2 text-green-400" /> Item Name
          </label>
          <input
            type="text"
            placeholder="Item name"
            value={ItemName}
            onChange={(e) => setItemName(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-gray-800/70 text-white border border-green-500/30 focus:outline-none focus:border-green-400"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={Submit}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold shadow-lg transition transform hover:scale-[1.02]"
        >
          <Upload className="w-5 h-5" /> List Item
        </button>
      </div>
    </div>
  );
}

export default SellItem;
