const hardhat = require("hardhat");
const { ethers } = require("hardhat");

async function verify(contractAddress, args) {
  console.log("verifying contract", contractAddress, args);
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args
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
  const Token =await ethers.getContractFactory("CocoToken");
  const CocoToken = await Token.deploy();

  console.log('CocoToken 部署后的合约地址是:')
  console.log(CocoToken.address);

  //  deploy成功后verify  contract
  console.log(network.config)
  // goerli 并且提供了etherscan apiKey 就进行contract verify
  if(network.config.chainId === 1 && process.env.ETHERSCAN_API_KEY) {
    console.log("Waitingfor block confirmations...");
    await CocoToken.deployTransaction.wait(5);
    await verify(CocoToken.address, [])
  }
}

main().catch( error =>{
  console.error(error);
  process.exitCode = 1;
})