const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
  if(hre.network.name != "hardhat") {
    console.log("Error: Please run only on hardhat network with fork");
    return 1;
  }

  // Deploying main contract
  const Contract = await ethers.getContractFactory("SmartContract");
  const contract = await Contract.deploy();
  await contract.deployed();

  // Get Signers
  const [owner, vault] = await ethers.getSigners();
  // Providing funds and set EOA
  await contract.recieve({value: ethers.utils.parseUnits("1.0")});
  await contract.setVault(vault.address);

  // GENERAL SETUP
  const collection721 = "0x1a92f7381b9f03921564a437210bb9396471050c";
  const collection1155 = "0x0e1f990d264a9818460DDE1b81c0b04D8A88e751";
  const Abi721 = [
    'function safeTransferFrom(address from, address to, uint256 tokenId) external'
  ];
  const Abi1155 = [
    'function safeTransferFrom(address from,address to,uint256 id,uint256 amount,bytes calldata data) external',
    'function safeBatchTransferFrom(address from,address to,uint256[] calldata ids,uint256[] calldata amounts,bytes calldata data) external'
  ];
  // Impersonate Account
  await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: ["0x63989a803b61581683b54ab6188ffa0f4baadf28"],
  });
  const signer = await ethers.getSigner("0x63989a803b61581683b54ab6188ffa0f4baadf28");

  // ERC721
  const contract721 = new ethers.Contract(collection721, Abi721, signer);
  const transfer1 = await contract721.safeTransferFrom(signer.address, contract.address, 7748); 
  const tx1 = await transfer1.wait();
  console.log('ERC721 safeTransfer gas used:', Number(tx1.gasUsed));

  // ERC1155 Single
  const contract1155 = new ethers.Contract(collection1155, Abi1155, signer);
  const transfer2 = await contract1155.safeTransferFrom(signer.address, contract.address, 7, 2, ethers.utils.arrayify("0x")); 
  const tx2 = await transfer2.wait();
  console.log('ERC1155 single safeTransfer gas used:', Number(tx2.gasUsed));

  // ERC1155 BATCH 
  const contract1155b = new ethers.Contract(collection1155, Abi1155, signer);
  const transfer3 = await contract1155b.safeBatchTransferFrom(signer.address, contract.address, [7,9,1,2], [2,3,1,1], ethers.utils.arrayify("0x")); 
  const tx3 = await transfer3.wait();
  console.log('ERC1155 batch safeBatchTransfer gas used:', Number(tx3.gasUsed));
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
