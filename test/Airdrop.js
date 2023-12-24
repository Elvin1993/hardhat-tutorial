const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Airdrop contract", function () {
  let owner, user1, user2, Contract, Airdrop;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();
    Contract = await ethers.getContractFactory("Airdrop");
    Airdrop = await Contract.deploy();
  });

  it("tt", async function () {
    const before_ownerBalance = await ethers.provider.getBalance(owner.address);

    const before_user1_balance = await ethers.provider.getBalance(user1.address);
    const before_user2_balance = await ethers.provider.getBalance(user2.address);

    const eth1 = ethers.utils.parseEther("1");
    const eth2 = ethers.utils.parseEther("2");
    const eth3 = ethers.utils.parseEther("3");

    const tx = await Airdrop.multiTransferETH([user1.address, user2.address], [eth1, eth2], { value: eth3 });
    const receipt = await tx.wait();
    const gasUsed = receipt.gasUsed;
    const fee = gasUsed.mul(tx.gasPrice);
    console.log("Transaction fee: ", ethers.utils.formatEther(fee));
    // 打印这笔交易的gas费用
    
    // console.log(tx, tx.gasPrice.mul(tx.gasLimit))
    // 获取eth余额
    const after_user1_balance = await ethers.provider.getBalance(user1.address);
    const after_user2_balance = await ethers.provider.getBalance(user2.address);
    const after_ownerBalance = await ethers.provider.getBalance(owner.address);
    
    expect(after_user1_balance).to.equal(before_user1_balance.add(eth1));

    expect(after_user2_balance).to.equal(before_user2_balance.add(eth2));

    expect(after_ownerBalance).to.equal(before_ownerBalance.sub(eth3).sub(fee));
    
    // bigNumber 相加 eth1+eth1000

    // expect(after_ownerBalance).to.equal(before_ownerBalance - eth3);
  });

 
});
