const hardhat = require("hardhat");
const { ethers } = require("hardhat");

async function verify(contractAddress, args) {
  console.log("verifying contract", contractAddress, args);
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
      contract: "contracts/MyToken.sol:MyToken"
    })
  } catch (e) {
    if(e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!");
    }else {
      console.log(e)
    }
  }
}

async function main() {
  const [owner] = await ethers.getSigners();
  const Token =await ethers.getContractFactory("MyToken");
  const MyToken = await Token.deploy();

  console.log('MyToken 部署后的合约地址是:')
  console.log(MyToken.address);

  //  deploy成功后verify  contract
  console.log(network.config)
  // goerli 并且提供了etherscan apiKey 就进行contract verify
  if(network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    console.log("Waitingfor block confirmations...");
    // 等待区块确认
    await MyToken.deployTransaction.wait(5);
    await verify(MyToken.address, [MyToken.address])
  }
}

main().catch( error =>{
  console.error(error);
  process.exitCode = 1;
})