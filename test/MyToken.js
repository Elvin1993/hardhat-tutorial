const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken contract", function () {
  let owner, user1, user2, Token, MyToken;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();
    Token = await ethers.getContractFactory("MyToken");
    MyToken = await Token.deploy();
  });
  it("tokenBuy", async function () {
    let beforeEth =await ethers.provider.getBalance(user1.address)
    console.log("before eth ", beforeEth)
    const beforeToken = await MyToken.balanceOf(user1.address);
    console.log('before Token', beforeToken)

    const beforeTotalSupply = await MyToken.totalSupply();
    console.log('beforeTotalSupply', beforeTotalSupply)

    let wei100=ethers.utils.parseUnits("10","wei")
    await MyToken.connect(user1).tokenBuy({value: wei100});
    let afterEth =await ethers.provider.getBalance(user1.address)
    console.log("after eth ", afterEth)
    const afterToken = await MyToken.balanceOf(user1.address);
    console.log('after Token', afterToken)

    const afterTotalSupply = await MyToken.totalSupply();
    console.log('afterTotalSupply', afterTotalSupply)

    expect(afterToken).to.equal(+beforeToken + 10);
  });

  it("tokenRedeem", async function () {

    let wei100=ethers.utils.parseUnits("10","wei")
    await MyToken.connect(user1).tokenBuy({value: wei100});

    let beforeEth =await ethers.provider.getBalance(MyToken.address)
    console.log("before eth ", beforeEth)
    const beforeToken = await MyToken.balanceOf(user1.address);
    console.log('before Token', beforeToken)

    const beforeTotalSupply = await MyToken.totalSupply();
    console.log('beforeTotalSupply', beforeTotalSupply)

    await MyToken.connect(user1).tokenRedeem(5);

    let afterEth =await ethers.provider.getBalance(MyToken.address)
    console.log("after eth ", afterEth)
    const afterToken = await MyToken.balanceOf(user1.address);
    console.log('after Token', afterToken)

    const afterTotalSupply = await MyToken.totalSupply();
    console.log('afterTotalSupply', afterTotalSupply)

    expect(afterEth).to.equal(+beforeEth -5);
    expect(afterToken).to.equal(+beforeToken -5);
  });

});
