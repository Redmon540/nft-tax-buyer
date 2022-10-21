const { expect } = require("chai");

describe("Safe Transfer Reciever Contract", function() {
  let Contract;
  let contract;
  let Nft_mock;
  let nft_mock;
  let ERC1155_MOCK;
  let erc1155_mock;
  let id;
  let owner;
  let vault;

  beforeEach( async () => {
    Contract = await ethers.getContractFactory("SmartContract");
    contract = await Contract.deploy();
    await contract.deployed();

    Nft_mock = await ethers.getContractFactory("MyERC721");
    nft_mock = await Nft_mock.deploy();
    await nft_mock.deployed();
    
    ERC1155_MOCK = await ethers.getContractFactory("MyERC1155");
    erc1155_mock = await ERC1155_MOCK.deploy();
    await erc1155_mock.deployed();

    id = 1;
    [owner, vault] = await ethers.getSigners();
  });

  it("ERC721 should hit contract and transfer to vault", async function() {
    await contract.recieve({value: ethers.utils.parseUnits("1.0")});
    await contract.setVault(vault.address);

    const transfer = await nft_mock['safeTransferFrom(address,address,uint256)'](owner.address,contract.address,id); 
    const tx = await transfer.wait();

    expect(await nft_mock.ownerOf(id)).to.equal(vault.address);
  });

  it("ERC115 single should hit contract and transfer to vault", async function() {
    await contract.recieve({value: ethers.utils.parseUnits("1.0")});
    await contract.setVault(vault.address);

    const transfer = await erc1155_mock.safeTransferFrom(owner.address,contract.address,id,1,ethers.utils.arrayify("0x")); 
    const tx = await transfer.wait();

    expect(await erc1155_mock.balanceOf(vault.address,id)).to.equal(1);
  });

  it("ERC115 batch should hit contract and transfer to vault", async function() {
    await contract.recieve({value: ethers.utils.parseUnits("1.0")});
    await contract.setVault(vault.address);

    const transfer = await erc1155_mock.safeBatchTransferFrom(owner.address,contract.address,[0,1,2],[2,4,1],ethers.utils.arrayify("0x")); 
    const tx = await transfer.wait();

    expect(await erc1155_mock.balanceOf(vault.address,0)).to.equal(2);
    expect(await erc1155_mock.balanceOf(vault.address,1)).to.equal(4);
    expect(await erc1155_mock.balanceOf(vault.address,2)).to.equal(1);
    expect(await erc1155_mock.balanceOf(owner.address,2)).to.equal(0);
  });
});
