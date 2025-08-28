    //SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {VaultifyXNFT} from "./VaultifyXNFT.sol";
import {AggregatorV3Interface} from
    "../lib/chainlink-brownie-contracts/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";
import {ReentrancyGuard} from "../lib/openzeppelin-contracts/contracts/utils/ReentrancyGuard.sol";
import {IERC721Receiver} from "../lib/openzeppelin-contracts/contracts/token/ERC721/IERC721Receiver.sol";
import {AutomationCompatibleInterface} from
    "../lib/chainlink-brownie-contracts/contracts/src/v0.8/automation/interfaces/AutomationCompatibleInterface.sol";

contract VaultifyX is ReentrancyGuard, IERC721Receiver, AutomationCompatibleInterface {
    //////////////////////
    //VARIABLES(STORAGE)//
    //////////////////////

    VaultifyXNFT public vaultifyxnft;
    address[] public SellersList;
    AggregatorV3Interface public immutable s_pricefeed;
    uint256 public constant TIMEPERIOD = 604800; // this is the time period after which the refund will be initiated if the delivery is not confirmed
    string[] public boughtTokenURIs;
    string[] public AvailableItems;
    uint256 index = 0;

    ///////////////////
    //OTHER FUNCTIONS//
    ///////////////////
    function onERC721Received(address operator, address from, uint256 tokenId, bytes calldata data)
        external
        pure
        override
        returns (bytes4)
    {
        return IERC721Receiver.onERC721Received.selector;
    }

    ////////////
    //ENUMS/////
    ////////////
    enum ItemStatus {
        AVAILABLE, // 0
        SOLD // 1

    }
    enum IsRefundPending {
        NO, // 0
        YES // 1

    }

    /////////////
    //MAPPINGS//
    ////////////
    mapping(address => string) public s_SellerAddressToName;
    mapping(address => string[]) public s_SellerAddressTotokenURI; // array of all the
    mapping(string => ItemStatus) public s_itemStatus; // bcz every seller has differnt item status
    mapping(string => uint256) public s_tokenURItoPrice;
    mapping(string => bool) public s_IsAtokenURI;
    mapping(string => address) public s_tokenURItoSellerAddress; // this is used to get the seller address of the tokenURI
    mapping(address => bool) public s_IsSeller;
    mapping(string => address) public s_ItemURIToBuyer; // this is used to get the itemURI of the buyer
    mapping(string => uint256) public s_tokenURItoTimeOfPurchasing;
    mapping(address => string[]) public s_buyersToItemURI;
    mapping(string => IsRefundPending) public s_IsRefundPending; // this is used to check if the refund is pending for the item
    mapping(address => uint256) public s_buyerToETHPaid; // this is used to get the tokenID of the buyer
    mapping(string => string) public s_tokenURItoItemName; // this is used to get the item name of the tokenURI
    mapping(string => uint256) public s_tokenURItoindex;
    mapping(uint256 => Items) public s_tokenIDtoItems; // this is used to get the item details of the tokenID
    /////////////
    //ERRORS/////
    ////////////

    error NameCannotBeEmpty();
    error InvalidTokenURI();
    error RepeatedTokenURI();
    error NotAvailableTokenURI();
    error ItemAlreadySold();
    error PayTheExactPrice();
    error UnapprovedBuyer();
    error YouCantConfirmYourOwnDelivery();
    error TransferFailed();
    error SellerCantBuy();
    error EnteraValidPrice();
    error NotAuthorized();

    ///////////
    //EVENTS//
    //////////
    event sellerAdded(string indexed SellerName);
    event ApprovedByTheSeller(string indexed sellerName, string indexed tokenURI);
    event TransferredNFTFromSellerToContract(string indexed tokenURI);
    event BuyerPaidSuccessfully(address indexed buyer, string indexed tokenURI);
    event NFTTransferredFromContractToBuyer(string indexed tokenURI);
    event MoneyTransferredToSeller(address indexed seller, uint256 indexed amount);
    event DeliveryIsConfirmed(string indexed tokenURI, address indexed buyer, address indexed seller);
    event RefundInitiated(string indexed tokenURI, address indexed buyer, address indexed seller);
    event Debug(string indexed message);

    //////////
    //STRUCT//
    //////////
    struct Items {
        string tokenURI;
        uint256 price;
        string name;
        address seller;
    }

    /////////////
    //CONSTRUCTOR//
    /////////////
    constructor(address pricefeedAddress) {
        vaultifyxnft = new VaultifyXNFT();
        s_pricefeed = AggregatorV3Interface(pricefeedAddress);
    }
    // function for price conversion

    function getUSDtoETHPRICE(uint256 dollaramount) public view returns (uint256) {
        (, int256 price,,,) = s_pricefeed.latestRoundData(); // got the price of 1 ether in terms of USD
        uint256 USDPrice = (dollaramount * 1e26) / uint256(price);
        return USDPrice;
    }

    // 1. function for the sellers to provide theie tokenuri and their name  so when they call this function then the nft of the item is minted in their account and then the item is made available on the website
    // 2. I have not set the erc721 reciever improt so the nft should be minted directly into the sellers address
    // 3. Use this to get the nft directly into the contract(import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";)
    // 4. Approval of the seller for transferring his nft would be done in ether.js
    function SellItem(string memory tokenURI, string memory _SellerName, uint256 DollarPrice, string memory ItemName)
        public
    {
        if (keccak256(abi.encodePacked(_SellerName)) == keccak256(abi.encodePacked(""))) {
            revert NameCannotBeEmpty();
        }
        if (s_IsAtokenURI[tokenURI] == true) {
            revert RepeatedTokenURI();
        }
        if (bytes(tokenURI).length == 0) {
            // always check string in bytes
            revert InvalidTokenURI();
        }
        if (DollarPrice <= 0) {
            revert EnteraValidPrice(); // this is not the price of the item
        }
        // this checks the array of the tokenURI string
        for (uint256 i = 0; i < s_SellerAddressTotokenURI[msg.sender].length; i++) {
            if (
                keccak256(abi.encodePacked(s_SellerAddressTotokenURI[msg.sender][i]))
                    == keccak256(abi.encodePacked(tokenURI))
            ) {
                revert RepeatedTokenURI();
            }
        }
        s_tokenURItoSellerAddress[tokenURI] = msg.sender; // this is used to get the seller address of the tokenURI
        vaultifyxnft.mintNFT(tokenURI, msg.sender); // nft token is minted to the sellers wallet

        if (s_IsSeller[msg.sender] == false) {
            s_IsSeller[msg.sender] = true; // this is used to check if the seller is already registered or not
            SellersList.push(msg.sender);
        }
        emit sellerAdded(_SellerName);
        s_SellerAddressToName[msg.sender] = _SellerName;
        s_itemStatus[tokenURI] = ItemStatus.AVAILABLE; // just when he wants to sale it is available
        s_SellerAddressTotokenURI[msg.sender].push(tokenURI);
        s_tokenURItoPrice[tokenURI] = DollarPrice; // stored the actual value of eth
        s_IsAtokenURI[tokenURI] = true;
        s_tokenIDtoItems[vaultifyxnft.getTokenID(tokenURI)] = Items(tokenURI, DollarPrice, ItemName, msg.sender); // this is used to get the item details of the tokenID
        s_tokenURItoItemName[tokenURI] = ItemName; // this is used to get the item name of the tokenURI
        uint256 tokenID = vaultifyxnft.getTokenID(tokenURI); // this will store the tokenID of the tokenURI in the mapping
        s_tokenURItoindex[tokenURI] = index;
        index++;
        AvailableItems.push(tokenURI);
        emit ApprovedByTheSeller(_SellerName, tokenURI);
    }

    // functon for the buyers to buy things and ue escrow mechanism(get the nft from the seller account to the contract account)
    function BuyItem(string memory tokenURI) external payable nonReentrant {
        emit Debug("1");
        emit Debug("2");
        emit Debug("3");
        address seller = s_tokenURItoSellerAddress[tokenURI];

        if (bytes(tokenURI).length == 0) {
            revert InvalidTokenURI();
        }
        emit Debug("3");
        if (s_IsAtokenURI[tokenURI] == false) {
            revert NotAvailableTokenURI();
        }
        emit Debug("4");
        if (msg.sender == seller) {
            revert SellerCantBuy();
        }
        emit Debug("5");
        if (s_itemStatus[tokenURI] == ItemStatus.SOLD) {
            revert ItemAlreadySold();
        }
        emit Debug("6");
        if (msg.value < getUSDtoETHPRICE(s_tokenURItoPrice[tokenURI])) {
            revert PayTheExactPrice(); // this is not the price of the item
        }
        emit Debug("7");
        emit BuyerPaidSuccessfully(msg.sender, tokenURI);
        s_buyerToETHPaid[msg.sender] = msg.value; // this is used to get the amount paid by the buyer

        s_IsRefundPending[tokenURI] = IsRefundPending.YES; // this is used to check if the refund is pending for the item
        boughtTokenURIs.push(tokenURI); // this is used to store the tokenURI of the item bought by the buyer
        s_buyersToItemURI[msg.sender].push(tokenURI); // this is used to get the itemURI of the buyer
        s_ItemURIToBuyer[tokenURI] = msg.sender;
        //ESCROW MECHANISM
        vaultifyxnft.safeTransferFrom(seller, address(this), vaultifyxnft.getTokenID(tokenURI)); // transfer the nft from the seller to the contract
        emit TransferredNFTFromSellerToContract(tokenURI);
        s_itemStatus[tokenURI] = ItemStatus.SOLD; // now the item is sold
        emit Debug("Item sold");
        s_tokenURItoTimeOfPurchasing[tokenURI] = block.timestamp; // store the time of purchasing
        uint256 indexOfSoldItem = s_tokenURItoindex[tokenURI];
        uint256 lastIndex = AvailableItems.length - 1;
        AvailableItems[indexOfSoldItem] = AvailableItems[lastIndex]; // replace the sold item
        s_tokenURItoindex[AvailableItems[lastIndex]] = indexOfSoldItem;
        AvailableItems.pop(); // remove the last element
    }

    // function to confirm the delivery and get the nft into the buyers account and ask the buyer to pay the exact price
    function ConfirmDelivery(string memory tokenURI) public nonReentrant {
        address seller = s_tokenURItoSellerAddress[tokenURI];
        address buyer = s_ItemURIToBuyer[tokenURI];

        if (msg.sender == seller) {
            revert YouCantConfirmYourOwnDelivery(); // seller cannot confirm delivery for his own item
        }
        if (msg.sender != s_ItemURIToBuyer[tokenURI]) {
            revert UnapprovedBuyer(); // this is not the buyer of the item
        }
        vaultifyxnft.safeTransferFrom(address(this), msg.sender, vaultifyxnft.getTokenID(tokenURI));
        emit NFTTransferredFromContractToBuyer(tokenURI);
        (bool success,) = seller.call{value: getUSDtoETHPRICE(s_tokenURItoPrice[tokenURI])}("");
        if (!success) {
            revert TransferFailed();
        }
        emit MoneyTransferredToSeller(seller, getUSDtoETHPRICE(s_tokenURItoPrice[tokenURI]));
        s_IsRefundPending[tokenURI] = IsRefundPending.NO;

        delete s_tokenURItoTimeOfPurchasing[tokenURI]; // delete the time of purchasing as it is sold
        delete s_itemStatus[tokenURI]; // delete the item status as it is sold
        delete s_tokenURItoPrice[tokenURI]; // delete the price of the item as it
        delete s_tokenURItoSellerAddress[tokenURI]; // delete the seller address of the item as it is sold
        delete s_IsAtokenURI[tokenURI]; // delete the tokenURI as it is sold
        delete s_buyersToItemURI[buyer]; // delete the buyer address of the item
        delete s_ItemURIToBuyer[tokenURI]; // delete the buyer address of the item
        for (uint256 i = 0; i < s_SellerAddressTotokenURI[seller].length; i++) {
            if (
                keccak256(abi.encodePacked(s_SellerAddressTotokenURI[seller][i]))
                    == keccak256(abi.encodePacked(tokenURI))
            ) {
                s_SellerAddressTotokenURI[seller][i] =
                    s_SellerAddressTotokenURI[seller][s_SellerAddressTotokenURI[seller].length - 1]; // delete the tokenURI from the seller's list
                s_SellerAddressTotokenURI[seller].pop(); // remove the last element
                break; // exit the loop after deleting the tokenURI
            }
        }
        s_IsAtokenURI[tokenURI] = false; // so that it can be sold again
        emit DeliveryIsConfirmed(tokenURI, buyer, seller);
    }

    // function to refund if the time passes too much and the delivery si not confirmed and called by the chainlink automation
    function Refund() internal nonReentrant {
        emit Debug("Refund initiated");
        uint256 i = 0;

        while (i < boughtTokenURIs.length) {
            string memory currentTokenURI = boughtTokenURIs[i];

            if (s_IsRefundPending[currentTokenURI] == IsRefundPending.YES) {
                if (s_tokenURItoTimeOfPurchasing[currentTokenURI] + TIMEPERIOD <= block.timestamp) {
                    address seller = s_tokenURItoSellerAddress[currentTokenURI];
                    address buyer = s_ItemURIToBuyer[currentTokenURI];

                    emit RefundInitiated(currentTokenURI, buyer, seller);

                    // Return NFT to seller
                    vaultifyxnft.safeTransferFrom(address(this), seller, vaultifyxnft.getTokenID(currentTokenURI));

                    // Refund money to buyer
                    uint256 PriceOfTheItem = s_tokenURItoPrice[currentTokenURI];
                    (bool success,) = buyer.call{value: getUSDtoETHPRICE(PriceOfTheItem)}("");
                    if (!success) {
                        revert TransferFailed();
                    }

                    // Reset refund status and clear buyer-specific data
                    s_IsRefundPending[currentTokenURI] = IsRefundPending.NO;
                    delete s_ItemURIToBuyer[currentTokenURI];
                    delete s_tokenURItoTimeOfPurchasing[currentTokenURI];

                    // Make item AVAILABLE again for purchase
                    s_itemStatus[currentTokenURI] = ItemStatus.AVAILABLE;

                    // Remove tokenURI from buyer's list
                    for (uint256 j = 0; j < s_buyersToItemURI[buyer].length; j++) {
                        if (
                            keccak256(abi.encodePacked(s_buyersToItemURI[buyer][j]))
                                == keccak256(abi.encodePacked(currentTokenURI))
                        ) {
                            s_buyersToItemURI[buyer][j] = s_buyersToItemURI[buyer][s_buyersToItemURI[buyer].length - 1];
                            s_buyersToItemURI[buyer].pop();
                            break;
                        }
                    }

                    // Remove from boughtTokenURIs array (swap with last element and pop)
                    uint256 arrayLength = boughtTokenURIs.length;
                    boughtTokenURIs[i] = boughtTokenURIs[arrayLength - 1];
                    boughtTokenURIs.pop();

                    // Add back to AvailableItems array so it can be purchased again
                    s_tokenURItoindex[currentTokenURI] = AvailableItems.length;
                    s_tokenURItoPrice[currentTokenURI] = PriceOfTheItem;
                    AvailableItems.push(currentTokenURI);
                    s_IsAtokenURI[currentTokenURI] = true; // so that it can be sold again

                    // Don't increment i since we replaced current element with the last element
                } else {
                    i++; // Time period hasn't passed yet, move to next item
                }
            } else {
                i++; // No refund pending, move to next item
            }
        }
    }

    function remove(string memory tokenuri) external {
        address seller = s_tokenURItoSellerAddress[tokenuri];
        if (msg.sender != seller) {
            revert NotAuthorized();
        }
        uint256 arraylength = AvailableItems.length;

        uint256 index = s_tokenURItoindex[tokenuri];

        // If it's not the last element, swap it with last
        if (index < arraylength - 1) {
            string memory tokenurioflastelement = AvailableItems[arraylength - 1];
            AvailableItems[index] = tokenurioflastelement;

            // Update index for moved element
            s_tokenURItoindex[tokenurioflastelement] = index;
        }

        // Remove last element
        AvailableItems.pop();

        // ✅ Delete index mapping for removed token
        delete s_tokenURItoindex[tokenuri];
        s_IsAtokenURI[tokenuri] = false;

        // Clear other mappings
        delete s_tokenURItoPrice[tokenuri];
        delete s_tokenURItoTimeOfPurchasing[tokenuri];
        delete s_tokenURItoSellerAddress[tokenuri];
        delete s_ItemURIToBuyer[tokenuri];
        delete s_itemStatus[tokenuri]; // better than resetting to AVAILABLE

        // Remove from seller's token list
        for (uint256 i = 0; i < s_SellerAddressTotokenURI[msg.sender].length; i++) {
            if (
                keccak256(abi.encodePacked(s_SellerAddressTotokenURI[msg.sender][i]))
                    == keccak256(abi.encodePacked(tokenuri))
            ) {
                s_SellerAddressTotokenURI[msg.sender][i] =
                    s_SellerAddressTotokenURI[msg.sender][s_SellerAddressTotokenURI[msg.sender].length - 1];
                s_SellerAddressTotokenURI[msg.sender].pop();
                break;
            }
        }
    }

    function getItemPrice(string memory tokenURL) public view returns (uint256) {
        return getUSDtoETHPRICE(s_tokenURItoPrice[tokenURL]);
    }

    function getTimePeriod() public pure returns (uint256) {
        return TIMEPERIOD;
    }

    function getAvailableItems() public view returns (string[] memory) {
        return AvailableItems;
    }

    // Implement AutomationCompatibleInterface functions
    function checkUpkeep(bytes memory /* checkData */ )
        public
        view
        override
        returns (bool upkeepNeeded, bytes memory /* performData */ )
    {
        bool sellerLength = SellersList.length > 0;
        bool buyerLength = boughtTokenURIs.length > 0;
        bool TimePeriod = false;
        for (uint256 i = 0; i < boughtTokenURIs.length; i++) {
            if (
                s_IsRefundPending[boughtTokenURIs[i]] == IsRefundPending.YES
                    && s_tokenURItoTimeOfPurchasing[boughtTokenURIs[i]] + TIMEPERIOD <= block.timestamp
            ) {
                TimePeriod = true;
                break;
            }
        }
        upkeepNeeded = sellerLength && buyerLength && TimePeriod;
        return (upkeepNeeded, "");
    }

    function performUpkeep(bytes memory /* performData */ ) external override {
        (bool upkeepNeeded,) = checkUpkeep("");
        if (upkeepNeeded) {
            emit Debug("Performing upkeep");
            Refund();
        } else {
            emit Debug("No upkeep needed");
        }
    }
}
