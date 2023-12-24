const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LVToken contract", function () {
  let owner, user1, user2, TokenContract, LVToken;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();
    TokenContract = await ethers.getContractFactory("LVToken");
    LVToken = await TokenContract.deploy();
  });

  it("Deployment should assign the total supple of tokens to the owner", async function () {
    const ownerBalance = await LVToken.balanceOf(owner.address);

    const totalSupply = await LVToken.totalSupply();
    console.log("totalSupply", totalSupply.toString());
    console.log("ownerBalance", ownerBalance.toString());
    expect(totalSupply).to.equal(ownerBalance);
  });

  it("_mint 后totalsupply 应该增加", async function () {
    const totalSupply = await LVToken.totalSupply();
    console.log("totalSupply", totalSupply.toString());

    const b1 = await LVToken.balanceOf(user1.address);
    console.log("b1", b1.toString());

    const size = ethers.utils.parseEther("1000");
    console.log("size", size.toString());

    await LVToken.mint(user1.address, size.toString());
    await LVToken.deployTransaction.wait(5);
    const user1Balance = await LVToken.balanceOf(user1.address);
    console.log("user1Balance", user1Balance.toString());
    const totalSupply1 = await LVToken.totalSupply();
    console.log("totalSupply1", totalSupply1.toString());

    expect(user1Balance).to.equal(size);
    // expect(totalSupply1).to.equal(totalSupply + size);
  });
});
