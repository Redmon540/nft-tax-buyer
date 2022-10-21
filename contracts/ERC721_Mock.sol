// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";

contract MyERC721 is IERC721Metadata, ERC721  {
  uint256 public _tokenId;
  uint256[] private _allTokens;

  constructor() ERC721("Coinja", "STAR") {
    _tokenId = 1;
    mint();
  }

  function mint() public returns (uint256){ // Have to restrict access 
    _mint(msg.sender, _tokenId);
    _allTokens.push(_tokenId);
    tokenURI(_tokenId);
    _tokenId++;
    return _tokenId;
  }

  function burn(uint256 tokenId) public{ // Have to restrict access 
    _burn(tokenId);
  }

  function _baseURI() internal pure override returns (string memory) {
        return "http://localhost:3000/";
  }

  
  function totalSupply() public view virtual returns (uint256) {
        return _allTokens.length;
  }

}
