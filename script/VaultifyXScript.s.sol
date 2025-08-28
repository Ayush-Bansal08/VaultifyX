//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Script} from "../lib/forge-std/src/Script.sol";
import {VaultifyXNFT} from "../src/VaultifyXNFT.sol";
import {HelperConfig} from "./HelperConfig.s.sol";
import {VaultifyX} from "../src/VaultifyX.sol";

contract VaultifyXScript is Script {
    HelperConfig public helperconfig;

    VaultifyX public vaultifyx;

    function run() external returns (VaultifyX, VaultifyXNFT) {
        helperconfig = new HelperConfig();
        address pricefeed = helperconfig.ActiveNetworkConfig();
        vm.startBroadcast();
        vaultifyx = new VaultifyX(pricefeed);
        vm.stopBroadcast();
        return (vaultifyx, vaultifyx.vaultifyxnft());
    }
}
