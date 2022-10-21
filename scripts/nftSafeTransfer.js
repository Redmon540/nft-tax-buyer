// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require("hardhat");

async function main() {
  const collectionAddress = '0x8c785cd86c900a2b6f771e37367d6c580483e2b8';
  const id = 92;
  const Abi = [
    "function name() view returns (string)",
    'function safeTransferFrom(address from, address to, uint256 tokenId) external'
  ];
  const [owner, vault] = await ethers.getSigners();

  const nftContract = new ethers.Contract(collectionAddress, Abi, owner);
  const name = await nftContract.name();
  console.log("Name of contract", name);

  const transfer = await nftContract.safeTransferFrom(owner.address, '0xb87cd2a01042DFbf8d101DFe22ECb93CD1902185', id); 
  const tx = await transfer.wait();
  console.log('NFT Transfer succesfull');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
