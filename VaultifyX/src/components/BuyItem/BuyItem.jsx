import React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
  
function Buyitem() {
    const [availableItems,setavailableItems] = useState([]); // it stores an array 

    const WalletAddress = "0x1165fDE0D4e9c0830A15B395dD753e1F6748bE56";
    const WalletABI = [{"type":"constructor","inputs":[{"name":"pricefeedAddress","type":"address","internalType":"address"}],"stateMutability":"nonpayable"},{"type":"function","name":"AvailableItems","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"BuyItem","inputs":[{"name":"tokenURI","type":"string","internalType":"string"}],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"ConfirmDelivery","inputs":[{"name":"tokenURI","type":"string","internalType":"string"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"SellItem","inputs":[{"name":"tokenURI","type":"string","internalType":"string"},{"name":"_SellerName","type":"string","internalType":"string"},{"name":"DollarPrice","type":"uint256","internalType":"uint256"},{"name":"ItemName","type":"string","internalType":"string"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"SellersList","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"TIMEPERIOD","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"boughtTokenURIs","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"checkUpkeep","inputs":[{"name":"","type":"bytes","internalType":"bytes"}],"outputs":[{"name":"upkeepNeeded","type":"bool","internalType":"bool"},{"name":"","type":"bytes","internalType":"bytes"}],"stateMutability":"view"},{"type":"function","name":"getAvailableItems","inputs":[],"outputs":[{"name":"","type":"string[]","internalType":"string[]"}],"stateMutability":"view"},{"type":"function","name":"getItemPrice","inputs":[{"name":"tokenURL","type":"string","internalType":"string"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getTimePeriod","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"pure"},{"type":"function","name":"getUSDtoETHPRICE","inputs":[{"name":"dollaramount","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"onERC721Received","inputs":[{"name":"operator","type":"address","internalType":"address"},{"name":"from","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"},{"name":"data","type":"bytes","internalType":"bytes"}],"outputs":[{"name":"","type":"bytes4","internalType":"bytes4"}],"stateMutability":"pure"},{"type":"function","name":"performUpkeep","inputs":[{"name":"","type":"bytes","internalType":"bytes"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"remove","inputs":[{"name":"tokenuri","type":"string","internalType":"string"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"s_IsAtokenURI","inputs":[{"name":"","type":"string","internalType":"string"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"s_IsRefundPending","inputs":[{"name":"","type":"string","internalType":"string"}],"outputs":[{"name":"","type":"uint8","internalType":"enum VaultifyX.IsRefundPending"}],"stateMutability":"view"},{"type":"function","name":"s_IsSeller","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"s_ItemURIToBuyer","inputs":[{"name":"","type":"string","internalType":"string"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"s_SellerAddressToName","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"s_SellerAddressTotokenURI","inputs":[{"name":"","type":"address","internalType":"address"},{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"s_buyerToETHPaid","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"s_buyersToItemURI","inputs":[{"name":"","type":"address","internalType":"address"},{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"s_itemStatus","inputs":[{"name":"","type":"string","internalType":"string"}],"outputs":[{"name":"","type":"uint8","internalType":"enum VaultifyX.ItemStatus"}],"stateMutability":"view"},{"type":"function","name":"s_pricefeed","inputs":[],"outputs":[{"name":"","type":"address","internalType":"contract AggregatorV3Interface"}],"stateMutability":"view"},{"type":"function","name":"s_tokenIDtoItems","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"tokenURI","type":"string","internalType":"string"},{"name":"price","type":"uint256","internalType":"uint256"},{"name":"name","type":"string","internalType":"string"},{"name":"seller","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"s_tokenURItoItemName","inputs":[{"name":"","type":"string","internalType":"string"}],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"s_tokenURItoPrice","inputs":[{"name":"","type":"string","internalType":"string"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"s_tokenURItoSellerAddress","inputs":[{"name":"","type":"string","internalType":"string"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"s_tokenURItoTimeOfPurchasing","inputs":[{"name":"","type":"string","internalType":"string"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"s_tokenURItoindex","inputs":[{"name":"","type":"string","internalType":"string"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"vaultifyxnft","inputs":[],"outputs":[{"name":"","type":"address","internalType":"contract VaultifyXNFT"}],"stateMutability":"view"},{"type":"event","name":"ApprovedByTheSeller","inputs":[{"name":"sellerName","type":"string","indexed":true,"internalType":"string"},{"name":"tokenURI","type":"string","indexed":true,"internalType":"string"}],"anonymous":false},{"type":"event","name":"BuyerPaidSuccessfully","inputs":[{"name":"buyer","type":"address","indexed":true,"internalType":"address"},{"name":"tokenURI","type":"string","indexed":true,"internalType":"string"}],"anonymous":false},{"type":"event","name":"Debug","inputs":[{"name":"message","type":"string","indexed":true,"internalType":"string"}],"anonymous":false},{"type":"event","name":"DeliveryIsConfirmed","inputs":[{"name":"tokenURI","type":"string","indexed":true,"internalType":"string"},{"name":"buyer","type":"address","indexed":true,"internalType":"address"},{"name":"seller","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"MoneyTransferredToSeller","inputs":[{"name":"seller","type":"address","indexed":true,"internalType":"address"},{"name":"amount","type":"uint256","indexed":true,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"NFTTransferredFromContractToBuyer","inputs":[{"name":"tokenURI","type":"string","indexed":true,"internalType":"string"}],"anonymous":false},{"type":"event","name":"RefundInitiated","inputs":[{"name":"tokenURI","type":"string","indexed":true,"internalType":"string"},{"name":"buyer","type":"address","indexed":true,"internalType":"address"},{"name":"seller","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"TransferredNFTFromSellerToContract","inputs":[{"name":"tokenURI","type":"string","indexed":true,"internalType":"string"}],"anonymous":false},{"type":"event","name":"sellerAdded","inputs":[{"name":"SellerName","type":"string","indexed":true,"internalType":"string"}],"anonymous":false},{"type":"error","name":"EnteraValidPrice","inputs":[]},{"type":"error","name":"InvalidTokenURI","inputs":[]},{"type":"error","name":"ItemAlreadySold","inputs":[]},{"type":"error","name":"NameCannotBeEmpty","inputs":[]},{"type":"error","name":"NotAuthorized","inputs":[]},{"type":"error","name":"NotAvailableTokenURI","inputs":[]},{"type":"error","name":"PayTheExactPrice","inputs":[]},{"type":"error","name":"ReentrancyGuardReentrantCall","inputs":[]},{"type":"error","name":"RepeatedTokenURI","inputs":[]},{"type":"error","name":"SellerCantBuy","inputs":[]},{"type":"error","name":"TransferFailed","inputs":[]},{"type":"error","name":"UnapprovedBuyer","inputs":[]},{"type":"error","name":"YouCantConfirmYourOwnDelivery","inputs":[]}]

    const nftabi = [{"type":"constructor","inputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"approve","inputs":[{"name":"to","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"balanceOf","inputs":[{"name":"owner","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"burn","inputs":[{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"getApproved","inputs":[{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"getTokenID","inputs":[{"name":"_tokenURI","type":"string","internalType":"string"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getTokenURI","inputs":[{"name":"tokenID","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"isApprovedForAll","inputs":[{"name":"owner","type":"address","internalType":"address"},{"name":"operator","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"mintNFT","inputs":[{"name":"_tokenURI","type":"string","internalType":"string"},{"name":"recipient","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"name","inputs":[],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"ownerOf","inputs":[{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"s_tokenURItoID","inputs":[{"name":"","type":"string","internalType":"string"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"safeTransferFrom","inputs":[{"name":"from","type":"address","internalType":"address"},{"name":"to","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"safeTransferFrom","inputs":[{"name":"from","type":"address","internalType":"address"},{"name":"to","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"},{"name":"data","type":"bytes","internalType":"bytes"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"setApprovalForAll","inputs":[{"name":"operator","type":"address","internalType":"address"},{"name":"approved","type":"bool","internalType":"bool"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"supportsInterface","inputs":[{"name":"interfaceId","type":"bytes4","internalType":"bytes4"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"symbol","inputs":[],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"tokenURI","inputs":[{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"transferFrom","inputs":[{"name":"from","type":"address","internalType":"address"},{"name":"to","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"event","name":"Approval","inputs":[{"name":"owner","type":"address","indexed":true,"internalType":"address"},{"name":"approved","type":"address","indexed":true,"internalType":"address"},{"name":"tokenId","type":"uint256","indexed":true,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"ApprovalForAll","inputs":[{"name":"owner","type":"address","indexed":true,"internalType":"address"},{"name":"operator","type":"address","indexed":true,"internalType":"address"},{"name":"approved","type":"bool","indexed":false,"internalType":"bool"}],"anonymous":false},{"type":"event","name":"Transfer","inputs":[{"name":"from","type":"address","indexed":true,"internalType":"address"},{"name":"to","type":"address","indexed":true,"internalType":"address"},{"name":"tokenId","type":"uint256","indexed":true,"internalType":"uint256"}],"anonymous":false},{"type":"error","name":"ERC721IncorrectOwner","inputs":[{"name":"sender","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"},{"name":"owner","type":"address","internalType":"address"}]},{"type":"error","name":"ERC721InsufficientApproval","inputs":[{"name":"operator","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"}]},{"type":"error","name":"ERC721InvalidApprover","inputs":[{"name":"approver","type":"address","internalType":"address"}]},{"type":"error","name":"ERC721InvalidOperator","inputs":[{"name":"operator","type":"address","internalType":"address"}]},{"type":"error","name":"ERC721InvalidOwner","inputs":[{"name":"owner","type":"address","internalType":"address"}]},{"type":"error","name":"ERC721InvalidReceiver","inputs":[{"name":"receiver","type":"address","internalType":"address"}]},{"type":"error","name":"ERC721InvalidSender","inputs":[{"name":"sender","type":"address","internalType":"address"}]},{"type":"error","name":"ERC721NonexistentToken","inputs":[{"name":"tokenId","type":"uint256","internalType":"uint256"}]}]

    const fetchAvailableItems = async() => {
        try{
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(WalletAddress, WalletABI, provider);
            const contract2 = new ethers.Contract(WalletAddress, WalletABI, signer);
            const availableitems = await contract.getAvailableItems();
            let items = []; // it stores an array of object with the deatil of items 
            const length = availableitems.length;
            for(let i = 0 ; i < length ; i++){
                const item = availableitems[i]; // token uri
                const price = await contract.s_tokenURItoPrice(item); // price in dollars 
                const ethPrice = await contract.getItemPrice(item); // price in eth
                const selleraddress = await contract.s_tokenURItoSellerAddress(item); // seller address
                const itemname = await contract.s_tokenURItoItemName(item);
                const metadatalink = await fetch(item.replace("ipfs://","https://ipfs.io/ipfs/"));
                const metadata = await metadatalink.json();

                let imageuri = metadata.image;
                 if (imageuri.startsWith("ipfs://")) {
                  imageuri = imageuri.replace("ipfs://", "https://ipfs.io/ipfs/");
                }
                items.push({
                    itemURI: item,
                    price: price, /// dollar price
                    ethprice: ethPrice, // eth price
                    sellerAddress: selleraddress,
                    itemName: itemname,
                    imageURI: imageuri
                })
            }
            setavailableItems(items);
            console.log("Available Items:", availableItems);
        }
        catch(error){
            console.log("Error fetching available items:", error);
        }
    }

    const buyitem = async(value,tokenuri) => {
        try{
          console.log("Processing transaction for:", tokenuri, "with value:", value);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        console.log("Provider:", provider);
        const signer = provider.getSigner();
        console.log("Signer:", signer);
        await provider.send("eth_requestAccounts",[]);
        console.log("Accounts requested");
        console.log("Token URI:", tokenuri);
console.log("ETH Value (wei):", value.toString());
console.log("ETH Value (ETH):", ethers.utils.formatEther(value));
        const contract = new ethers.Contract(WalletAddress, WalletABI, signer);
        console.log("Contract:", contract);
        const transaction = await contract.BuyItem(tokenuri, { value: value, gasLimit: 500000 });
        console.log("Transaction sent:", transaction);
        console.log("transaction processsed");
        await transaction.wait();
        console.log("Transaction confirmed:", transaction);
         fetchAvailableItems();
        }
        catch(error){
          alert("Error processing the transaction");
            console.log("Error processing transaction:", error);
        }
    }

    const remove = async(tokenuri)=>{
      try{
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(WalletAddress, WalletABI, signer);
        const contract1 = new ethers.Contract(WalletAddress, WalletABI, provider);
        await provider.send("eth_requestAccounts",[]);
        const seller = await contract.s_tokenURItoSellerAddress(tokenuri);
        const userAddress = await signer.getAddress();
        
        
        if(seller === userAddress){
           // now i have to burn the nft from the sellers account
           const nftcontractaddress = await contract1.vaultifyxnft(); // we got the address of the nft contract
           const nftcontract = new ethers.Contract(nftcontractaddress,nftabi,signer);
           const nftcontract2 = new ethers.Contract(nftcontractaddress,nftabi,provider);
           const tokenid = await nftcontract2.s_tokenURItoID(tokenuri);
           const burnNft = await nftcontract.burn(tokenid);
           await burnNft.wait();
           const removeItem = await contract.remove(tokenuri);
           await removeItem.wait();
           console.log("NFT burned successfully");
           alert("your item got removed successfully");
      }
      else{
        alert("Only the seller can remove the item");
        console.log("error1");
        return;
      }
    }
      catch(error){ 
          console.log("Error removing item:", error); 
          alert("error2");
      }
    }

  
     
    // update after every page refresh
    useEffect(() => {
        fetchAvailableItems();
        const interval = setInterval(fetchAvailableItems,5000); // fetch every 5 seconds
        return () => clearInterval(interval); // cleanup on unmount
    }, []);


return (
  <div className="p-10 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
    <h1 className="text-4xl font-extrabold mb-10 text-center bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 text-transparent bg-clip-text">
      🛒 VaultifyX Marketplace
    </h1>

    {availableItems.length === 0 ? (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center shadow-2xl">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-3">No items available</h3>
        <p className="text-gray-400 text-center max-w-md">
          The marketplace is currently empty. Check back soon for amazing new items! ✨
        </p>
      </div>
    ) : (
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {availableItems.map((item, index) => (
          <div
            key={index}
            className="group relative bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-purple-900/20 
                       border border-slate-700/50 rounded-2xl overflow-hidden 
                       shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 
                       hover:-translate-y-2 hover:scale-[1.01] transition-all duration-500 ease-out
                       backdrop-blur-sm min-w-[280px]"
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Floating orbs */}
            <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -bottom-2 -left-2 w-14 h-14 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative p-4">
              {/* Product Image with enhanced effects */}
              <div className="relative mb-3 overflow-hidden rounded-xl bg-gradient-to-br from-gray-800 via-slate-700 to-gray-900 shadow-inner">
                <img
                  src={item.imageURI}
                  alt={item.itemName}
                  className="w-full h-40 object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                />
                
                {/* Multi-layer overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Animated price badge */}
                <div className="absolute top-2 right-2 bg-gradient-to-r from-green-500/90 to-emerald-500/90 backdrop-blur-md rounded-lg px-3 py-1 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-xs drop-shadow-sm">${item.price.toString()}</span>
                </div>
                
                {/* Corner shine effect */}
                <div className="absolute top-0 left-0 w-12 h-12 bg-gradient-to-br from-white/20 to-transparent rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Item Name with gradient text */}
              <h3 className="text-lg font-bold text-white mb-3 truncate group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 tracking-wide justify-center text-center">
                {item.itemName}
              </h3>

              {/* Premium pricing cards - more compact */}
              <div className="mb-3 space-y-1.5">
                <div className="relative p-2.5 bg-gradient-to-r from-green-500/15 via-emerald-500/10 to-green-500/15 rounded-lg border border-green-500/30 backdrop-blur-sm group-hover:border-green-400/50 transition-all duration-300">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mr-2 shadow-lg">
                      <span className="text-white text-xs font-bold">$</span>
                    </div>
                    <div>
                      <span className="text-green-400 font-bold">{item.price.toString()}</span>
                      <span className="text-green-300/70 text-xs ml-1">USD</span>
                    </div>
                  </div>
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="relative p-2.5 bg-gradient-to-r from-purple-500/15 via-indigo-500/10 to-blue-500/15 rounded-lg border border-purple-500/30 backdrop-blur-sm group-hover:border-purple-400/50 transition-all duration-300">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center mr-2 shadow-lg">
                      <span className="text-white text-xs">⟠</span>
                    </div>
                    <div>
                      <span className="text-purple-400 font-bold">
                        {parseFloat(ethers.utils.formatEther(item.ethprice)).toFixed(5)}
                      </span>
                      <span className="text-purple-300/70 text-xs ml-1">ETH</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              {/* Enhanced CID section - more compact */}
              <div className="mb-3 p-2.5 bg-slate-800/30 rounded-lg backdrop-blur-sm border border-slate-700/50 group-hover:border-blue-500/30 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mr-2 shadow-sm">
                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-slate-400 text-xs">IPFS CID</span>
                      <a
                        href={`https://ipfs.io/ipfs/${item.itemURI.toString().replace("ipfs://", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 hover:underline font-mono text-xs transition-colors duration-200"
                      >
                        {item.itemURI.toString().replace("ipfs://", "").slice(0, 8)}...{item.itemURI.toString().replace("ipfs://", "").slice(-6)}
                      </a>
                    </div>
                  </div>
                  
                  {/* Copy CID button */}
                  <button
                    onClick={() => navigator.clipboard.writeText(item.itemURI.toString().replace("ipfs://", ""))}
                    className="p-1.5 bg-blue-500/20 hover:bg-blue-500/30 rounded-md transition-colors duration-200 group/copy"
                    title="Copy CID - Save this for your records!"
                  >
                    <svg className="w-3 h-3 text-blue-400 group-hover/copy:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
                
                {/* Storage reminder - more compact */}
                <div className="mt-1.5 flex items-center text-xs text-amber-400 bg-amber-500/10 rounded-md px-2 py-1">
                  <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>Save CID before purchase!</span>
                </div>
              </div>

              {/* Minimalist seller section - more compact */}
              <div className="mb-3 p-2 bg-slate-800/20 rounded-lg backdrop-blur-sm border border-slate-700/30">
                <div className="flex items-start">
                  <div className="w-5 h-5 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center mr-2 shadow-sm mt-0.5">
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-slate-400 text-xs mb-1">Seller</p>
                    <p className="text-slate-300 font-mono text-xs break-all leading-relaxed">
                      {item.sellerAddress}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action buttons - Buy and Remove */}
              <div className="space-y-2">
                {/* Premium buy button */}
                <button
                  onClick={() => buyitem(item.ethprice, item.itemURI)}
                  className="w-full py-3 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 
                             text-white font-bold rounded-xl shadow-lg 
                             hover:from-green-600 hover:via-emerald-600 hover:to-green-700 
                             hover:shadow-2xl hover:shadow-green-500/30 hover:-translate-y-1
                             active:scale-95 transition-all duration-300 
                             relative overflow-hidden group/btn
                             border border-green-400/20 hover:border-green-300/40"
                >
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <span>Buy Now</span>
                    <span className="animate-pulse">🚀</span>
                  </span>
                  
                  {/* Multiple shine effects */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                                  -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-emerald-400/30 to-green-400/20 
                                  opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                  
                  {/* Button glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300 blur-sm -z-10" />
                </button>

                {/* Compact remove button with description */}
                <div className="space-y-1">
                  <button
                    onClick={() => remove(item.itemURI)}
                    className="w-full py-2 px-4 bg-gradient-to-r from-red-500 via-red-600 to-red-700 
                               text-white font-semibold text-sm rounded-lg shadow-md 
                               hover:from-red-600 hover:via-red-700 hover:to-red-800 
                               hover:shadow-lg hover:shadow-red-500/20 hover:-translate-y-0.5
                               active:scale-98 transition-all duration-300 
                               relative overflow-hidden group/remove
                               border border-red-400/20 hover:border-red-300/30"
                  >
                    <span className="relative z-10 flex items-center justify-center space-x-1.5">
                      <span>Remove</span>
                      <span className="text-xs">🗑️</span>
                    </span>
                    
                    {/* Subtle shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent 
                                    -translate-x-full group-hover/remove:translate-x-full transition-transform duration-800" />
                    
                    {/* Button glow */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-red-700 rounded-lg opacity-0 group-hover/remove:opacity-15 transition-opacity duration-300 blur-sm -z-10" />
                  </button>
                  
                  {/* Owner-only description */}
                  <div className="flex items-center justify-center text-xs text-slate-400 bg-slate-800/20 rounded-md px-2 py-1 backdrop-blur-sm">
                    <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span>Only seller can remove this item</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Card border glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-emerald-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10" />
          </div>
        ))}
      </div>
    )}
  </div>
);
}

    


export default Buyitem;
