const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CocoToken contract", function () {
  let owner, user1, user2, Token, CocoToken;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();
    Token = await ethers.getContractFactory("CocoToken");
    CocoToken = await Token.deploy();
  });
  it("Deployment should assign the total supple of tokens to the owner", async function () {
    const ownerBalance = await CocoToken.balanceOf(owner.address);

    const totalSupply = await CocoToken.totalSupply();

    expect(totalSupply).to.equal(ownerBalance);
  });

  it("owner transfer user1 500 token should success ", async function () {
    // 原始写法
    // const beforeOwnerBalance = await CocoToken.balanceOf(owner.address);
    // const beforeUser1Balance = await CocoToken.balanceOf(user1.address);
    // console.log(
    //   `转账之前的余额: owner: ${beforeOwnerBalance} user1: ${beforeUser1Balance}`
    // );

    // await CocoToken.transfer(user1.address, 500);

    // const afterOwnerBalance = await CocoToken.balanceOf(owner.address);
    // const afteruser1Balance = await CocoToken.balanceOf(user1.address);
    // console.log(
    //   `转账之后的余额: owner: ${afterOwnerBalance} user1: ${afteruser1Balance}`
    // );

    // expect(afterOwnerBalance).to.equal(beforeOwnerBalance - 500);
    // expect(afteruser1Balance).to.equal(beforeUser1Balance + 500);

    // changeTokenBalances 写法

    const beforeOwnerBalance = await CocoToken.balanceOf(owner.address);
    const beforeUser1Balance = await CocoToken.balanceOf(user1.address);
    console.log(
      `转账之前的余额: owner: ${beforeOwnerBalance} user1: ${beforeUser1Balance}`
    );

    await expect(CocoToken.transfer(user1.address, 500)).to.changeTokenBalances(CocoToken,[owner, user1], [-500, 500]);

    const afterOwnerBalance = await CocoToken.balanceOf(owner.address);
    const afteruser1Balance = await CocoToken.balanceOf(user1.address);
    console.log(
      `转账之后的余额: owner: ${afterOwnerBalance} user1: ${afteruser1Balance}`
    );
  });

  it("user1 transfer user2 1000 token should fail ", async function () {
    await CocoToken.transfer(user1.address, 500);

    const beforeUser1Balance = await CocoToken.balanceOf(user1.address);
    const beforeUser2Balance = await CocoToken.balanceOf(user2.address);
    console.log(
      `转账之前的余额: owner: ${beforeUser1Balance} user1: ${beforeUser2Balance}`
    );

    await expect(
      CocoToken.connect(user1).transfer(user2.address, 1000)
    ).to.be.revertedWith("Not enough tokens");

    expect(await CocoToken.balanceOf(user1.address)).to.equal(500);

  });

  it("call transferOwnership", async function () {
    const contractOwner = await CocoToken.owner();
    console.log('当前owner',contractOwner);
    await CocoToken.transferOwnership(user1.address);
    expect(await CocoToken.owner()).to.hexEqual(user1.address);
    await expect(
      CocoToken.connect(user2).transferOwnership(user1.address)
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });
});
