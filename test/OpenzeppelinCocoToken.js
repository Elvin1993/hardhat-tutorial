const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("OpenzeppelinCocoToken contract", function () {
  beforeEach(async function () {
    [owner] = await ethers.getSigners();
    Token = await ethers.getContractFactory("OpenzeppelinCocoToken");
    OpenzeppelinCocoToken = await Token.deploy();
  });
  it("Deployment should assign the total supple of tokens to the owner", async function () {
    const ownerBalance = await OpenzeppelinCocoToken.balanceOf(owner.address);

    const totalSupply = await OpenzeppelinCocoToken.totalSupply();

    expect(totalSupply).to.equal(ownerBalance);
  });
})