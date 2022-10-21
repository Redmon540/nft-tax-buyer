const { expect } = require("chai");

describe("Gas % returns correctly to caller", function() {
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
    [owner, vault] = await ethers.getSigners();

    Contract = await ethers.getContractFactory("SmartContract");
    contract = await Contract.deploy();
    await contract.deployed();
    await contract.recieve({value: ethers.utils.parseUnits("1.0")});
    await contract.setVault(vault.address);

    Nft_mock = await ethers.getContractFactory("MyERC721");
    nft_mock = await Nft_mock.deploy();
    await nft_mock.deployed();
    
    ERC1155_MOCK = await ethers.getContractFactory("MyERC1155");
    erc1155_mock = await ERC1155_MOCK.deploy();
    await erc1155_mock.deployed();

    id = 1;
  });

  it("ERC721 returns 10% of gas to caller", async function() {
    const initBalance = await owner.getBalance();
    const transfer = await nft_mock['safeTransferFrom(address,address,uint256)']
    (
      owner.address,
      contract.address,
      id
    ); 
    const tx = await transfer.wait();

    const txCost = tx.gasUsed.mul(transfer.gasPrice);
    const balanceAfterGas = initBalance.sub(txCost); 
    const pay = ethers.utils.parseUnits('1.0', 'gwei');
    const gasReturn = ethers.BigNumber.from("13000");
    const estimate = balanceAfterGas.add(gasReturn.mul(transfer.gasPrice));
    const finalBalance = await owner.getBalance();
    expect(String(finalBalance).slice(0,7)).to.equal(String(pay.add(estimate)).slice(0,7));
  });

  it("ERC1155 Single returns 10% of gas to caller", async function() {
    const initBalance = await owner.getBalance();
    const transfer = await erc1155_mock.safeTransferFrom
    (
      owner.address,
      contract.address,
      id, 
      4,
      ethers.utils.arrayify("0x")
    ); 
    const tx = await transfer.wait();

    const txCost = tx.gasUsed.mul(transfer.gasPrice);
    const balanceAfterGas = initBalance.sub(txCost); 
    const pay = ethers.utils.parseUnits('1.0', 'gwei');
    const gasReturn = ethers.BigNumber.from("8500");
    const estimate = balanceAfterGas.add(gasReturn.mul(transfer.gasPrice));
    const finalBalance = await owner.getBalance();
    expect(String(finalBalance).slice(0,7)).to.equal(String(pay.add(estimate)).slice(0,7));
  });

  it("ERC1155 Batch returns 10% of gas to caller", async function() {
    const initBalance = await owner.getBalance();
    const transfer = await erc1155_mock.safeBatchTransferFrom
    (
      owner.address,
      contract.address,
      [0,1], 
      [4,8],
      ethers.utils.arrayify("0x")
    ); 
    const tx = await transfer.wait();

    const txCost = tx.gasUsed.mul(transfer.gasPrice);
    const balanceAfterGas = initBalance.sub(txCost); 
    const pay = ethers.utils.parseUnits('1.0', 'gwei');
    const gasReturn = ethers.BigNumber.from("13000");
    const estimate = balanceAfterGas.add(gasReturn.mul(transfer.gasPrice));
    const finalBalance = await owner.getBalance();
    expect(String(finalBalance).slice(0,7)).to.equal(String(pay.add(estimate)).slice(0,7));
  });
});
