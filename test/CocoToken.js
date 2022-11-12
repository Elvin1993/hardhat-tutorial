const { expect } = require('chai');
const { ethers } = require("hardhat");

describe("Token contract", function () {
  let owner, user1, user2, Token, CocoToken;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();
    Token = await ethers.getContractFactory("CocoToken");
    hardhatToken = await Token.deploy();
  })
  it("Deployment should assign the total supple of tokens to the owner", async function () {

    const ownerBalance = await hardhatToken.balanceOf(owner.address);

    const totalSupply = await hardhatToken.totalSupply();

    expect(totalSupply).to.equal(ownerBalance)
  })

  it("owner transfer user1 500 token should success ", async function(){
    const beforeOwnerBalance = await hardhatToken.balanceOf(owner.address);
    const beforeUser1Balance = await hardhatToken.balanceOf(user1.address);
    console.log(`转账之前的余额: owner: ${beforeOwnerBalance} user1: ${beforeUser1Balance}`)

    await hardhatToken.transfer(user1.address, 500);

    const afterOwnerBalance = await hardhatToken.balanceOf(owner.address);
    const afteruser1Balance = await hardhatToken.balanceOf(user1.address);
    console.log(`转账之后的余额: owner: ${afterOwnerBalance} user1: ${afteruser1Balance}`)

    expect(afterOwnerBalance).to.equal(beforeOwnerBalance - 500);
    expect(afteruser1Balance).to.equal(beforeUser1Balance + 500);

   

  })

  it("user1 transfer user2 1000 token should fail ", async function(){

    await hardhatToken.transfer(user1.address, 500);

    const beforeUser1Balance = await hardhatToken.balanceOf(user1.address);
    const beforeUser2Balance = await hardhatToken.balanceOf(user2.address);
    console.log(`转账之前的余额: owner: ${beforeUser1Balance} user1: ${beforeUser2Balance}`)

    await expect(
      hardhatToken.connect(user1).transfer(user2.address, 1000)
    ).to.be.revertedWith("Not enough tokens");

    expect(await hardhatToken.balanceOf(user1.address)).to.equal(500);

  })

})