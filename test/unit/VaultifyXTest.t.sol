//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Test, console, Vm} from "forge-std/Test.sol";
import {VaultifyX} from "../../src/VaultifyX.sol";
import {VaultifyXScript} from "../../script/VaultifyXScript.s.sol";
import {VaultifyXNFT} from "../../src/VaultifyXNFT.sol";
import {ERC721} from "../../lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";

contract VaultifyXTest is Test {
    VaultifyXScript public vaultifyXScript;
    VaultifyX public vaultifyX;
    VaultifyXNFT public vaultifyXNFT;

    function setUp() public {
        vaultifyXScript = new VaultifyXScript();
        (vaultifyX, vaultifyXNFT) = vaultifyXScript.run();
    }

    function testGetETHUSDPrice() public view {
        uint256 USDAmount = 50;
        uint256 price = vaultifyX.getUSDtoETHPRICE(USDAmount);
        console.log(price);
    }

    function testNFTisMintedInTheSellersAccount() public {
        address SELLER = makeAddr("SELLER");
        vm.deal(SELLER, 1 ether);
        vm.prank(SELLER);

        vaultifyX.SellItem("sometokenurl", "sellername", 50);
        assert(vaultifyXNFT.ownerOf(0) == SELLER);
    }

    function testEVENTSemmitedDuringSellItem() public {
        address SELLER = makeAddr("SELLER");
        vm.deal(SELLER, 1 ether);
        vm.prank(SELLER);
        vm.recordLogs();

        vaultifyX.SellItem("sometokenurl", "sellername", 50);
        Vm.Log[] memory entries = vm.getRecordedLogs();
        console.log(entries.length);
        assert(entries.length > 0);
    }

    function testSelleerApprovesTheContractToSendNFT() public {
        address SELLER = makeAddr("SELLER");
        vm.deal(SELLER, 1 ether);
        vm.prank(SELLER);
        vaultifyX.SellItem("sometokenurl", "sellername", 50);
        vm.prank(SELLER); // i have  again call the vm.prank()
        vaultifyXNFT.approve(address(vaultifyX), 0);
    }

    function testBuyerPaidForTheNFTandSellerNoLongerOwnsTheNFT() public {
        address SELLER = makeAddr("SELLER");
        vm.deal(SELLER, 1 ether);
        vm.prank(SELLER);
        vaultifyX.SellItem("sometokenurl", "sellername", 50);
        vm.prank(SELLER); // i have  again call the vm.prank()
        vaultifyXNFT.approve(address(vaultifyX), 0);

        //NOW COMES THE BUYER
        address BUYER = makeAddr("BUYER");
        vm.deal(BUYER, 1 ether);
        vm.startPrank(BUYER);
        vaultifyX.BuyItem{value: vaultifyX.getItemPrice("sometokenurl")}("sometokenurl"); // BUYER BUYS THE ITEM
        vm.stopPrank();
        assert(address(BUYER).balance < 1 ether);
        console.log(address(BUYER).balance); // should be less than 1 ether
        console.log(vaultifyX.getItemPrice("sometokenurl")); // correct price
        assert(vaultifyXNFT.ownerOf(0) == address(vaultifyX));
    }

    function testConfirmDelivery() public {
        address SELLER = makeAddr("SELLER");
        vm.deal(SELLER, 1 ether);
        vm.prank(SELLER);
        vaultifyX.SellItem("sometokenurl", "sellername", 50);
        vm.prank(SELLER); // i have  again call the vm.prank()
        vaultifyXNFT.approve(address(vaultifyX), 0);

        //NOW COMES THE BUYER
        address BUYER = makeAddr("BUYER");
        vm.deal(BUYER, 1 ether);
        vm.startPrank(BUYER);
        vaultifyX.BuyItem{value: vaultifyX.getItemPrice("sometokenurl")}("sometokenurl"); // BUYER BUYS THE ITEM
        vm.stopPrank();
        vm.startPrank(BUYER);
        vaultifyX.ConfirmDelivery("sometokenurl");
        vm.stopPrank();
        assert(vaultifyXNFT.ownerOf(0) == BUYER);
        assert(address(SELLER).balance > 1);
    }

    // function testRfeund() public {
    //     address SELLER = makeAddr("SELLER");
    //     vm.deal(SELLER, 1 ether);
    //     vm.prank(SELLER);
    //     vaultifyX.SellItem("sometokenurl", "sellername", 50);
    //     vm.prank(SELLER); // i have  again call the vm.prank()
    //     vaultifyXNFT.approve(address(vaultifyX), 0);

    //     //NOW COMES THE BUYER
    //     address BUYER = makeAddr("BUYER");
    //     vm.deal(BUYER, 1 ether);
    //     vm.startPrank(BUYER);
    //     vaultifyX.BuyItem{value: vaultifyX.getItemPrice("sometokenurl")}("sometokenurl"); // BUYER BUYS THE ITEM
    //     vm.stopPrank();
    //     vm.warp(block.timestamp + vaultifyX.getTimePeriod() + 1); // warp the time to after the time period
    //     vm.roll(block.number + vaultifyX.getTimePeriod() + 1); // roll the block number to after the time period
    //     // vaultifyX.Refund();
    //     assert(vaultifyXNFT.ownerOf(0) == address(SELLER));
    // }
}
