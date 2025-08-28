//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {ERC721} from "../lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import {ERC721Burnable} from "../lib/openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721Burnable.sol";

contract VaultifyXNFT is ERC721, ERC721Burnable {
    /////////////
    //VARIABLES//
    /////////////
    uint256 private s_tokenCounterNumber;

    /////////////
    //MAPPINGS//
    ////////////
    mapping(uint256 => string) private s_TokenIDToURI;
    mapping(string => uint256) public s_tokenURItoID; // this is used to get the price of the tokenURI
    ///////////////
    //CONSTRUCTOR//
    ///////////////

    constructor() ERC721("VaultifyX", "VTX") {
        s_tokenCounterNumber = 0;
    }

    // the functions wants the uri of the item which the seller should provide the uri includes metadata wwhich is needed
    function mintNFT(string memory _tokenURI, address recipient) external {
        _safeMint(recipient, s_tokenCounterNumber);
        s_TokenIDToURI[s_tokenCounterNumber] = _tokenURI;
        s_tokenURItoID[_tokenURI] = s_tokenCounterNumber; // save the tokenURI for the minted token(NFT)
        s_tokenCounterNumber++;
    }

    function getTokenURI(uint256 tokenID) public view returns (string memory) {
        return s_TokenIDToURI[tokenID];
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return s_TokenIDToURI[tokenId];
    }

    function getTokenID(string memory _tokenURI) public view returns (uint256) {
        return s_tokenURItoID[_tokenURI];
    }
}
