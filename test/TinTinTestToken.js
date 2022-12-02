const { ethers } = require("hardhat");
const { expect } = require("chai");
const BigNumber = require("bignumber.js")

describe("TinTinTestToken", function () {

  let owner, user1, user2, mytoken, attack;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();
    const MyToken = await ethers.getContractFactory("TinTinTestToken");
    mytoken = await MyToken.deploy();
    // console.log(`Mytoken address ${mytoken.address}`);
  });

  it("create should in white", async () => {
    const before_isInWhite = await mytoken.verifyWhite(owner.address);
    expect(before_isInWhite).to.equal(true);
  })

  it("addToWhitelist", async () => {
    const before_isInWhite = await mytoken.verifyWhite(user1.address);
    expect(before_isInWhite).to.equal(false);

    await mytoken.addToWhitelist(user1.address);

    const after_isInWhite = await mytoken.verifyWhite(user1.address);
    expect(after_isInWhite).to.equal(true);

    await mytoken.removeToWhitelist(user1.address);
    const finish_isInWhite = await mytoken.verifyWhite(user1.address);
    expect(finish_isInWhite).to.equal(false);
  })



  it("changeAmount", async function () {
    const beforeAutoMintAmount = await mytoken.autoMintAmount();
    const decimals = await mytoken.decimals();
    const base = Math.pow(10, decimals);
    let newAutoMintAmount = new BigNumber(1).multipliedBy(base)
    
    await mytoken.changeAmount(newAutoMintAmount.toString());
    const afterAutoMintAmount = await mytoken.autoMintAmount();
    console.log('log',beforeAutoMintAmount, afterAutoMintAmount);
    expect(afterAutoMintAmount).to.equal(newAutoMintAmount);
  });

  it("autoMint", async () => {
    const decimals = await mytoken.decimals();
    const base = Math.pow(10, decimals);

    const beforeBalance = await mytoken.balanceOf(owner.address);
    await mytoken.autoMint(owner.address);
    const afterBalance = await mytoken.balanceOf(owner.address);
    console.log(afterBalance, beforeBalance)
    expect(afterBalance).to.above(beforeBalance);
  })

  it("freeMint", async () => {
    const beforeBalance = await mytoken.balanceOf(user1.address);
    await mytoken.connect(user1).freeMint();
    const afterBalance = await mytoken.balanceOf(user1.address);
    console.log(afterBalance, beforeBalance)
    expect(afterBalance).to.above(beforeBalance);
  })

});