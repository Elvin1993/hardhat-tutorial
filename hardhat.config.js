require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
// require("@nomiclabs/hardhat-etherscan");
// require("@nomicfoundation/hardhat-verify");
require("hardhat-tracer");

/** @type import('hardhat/config').HardhatUserConfig */

task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const GANACHE_PRIVATE_KEY = process.env.GANACHE_PRIVATE_KEY;
const USER1_PRIVATE_KEY = process.env.USER1_PRIVATE_KEY;
const USER2_PRIVATE_KEY = process.env.USER2_PRIVATE_KEY;
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
module.exports = {
  solidity: "0.8.17",
  networks: {
    // ganache: {
    //   url: "http://127.0.0.1:7545",
    //   accounts: [`0x${GANACHE_PRIVATE_KEY}`, `0x${USER1_PRIVATE_KEY}`, `0x${USER2_PRIVATE_KEY}`],
    // },
    // goerli: {
    //   url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
    //   accounts: [`0x${GOERLI_PRIVATE_KEY}`, `0x${USER1_PRIVATE_KEY}`, `0x${USER2_PRIVATE_KEY}`],
    //   chainId: 5,
    // },
    sepolia: {
      url: `https://sepolia.infura.io/v3/48abdcdb1e2d48da8d1dbf71fef41442`,
      accounts: [`0x${GOERLI_PRIVATE_KEY}`, `0x${USER1_PRIVATE_KEY}`, `0x${USER2_PRIVATE_KEY}`],
      chainId: 11155111,
    },

    arbitrumSepolia: {
      url: `https://arbitrum-sepolia.infura.io/v3/48abdcdb1e2d48da8d1dbf71fef41442`,
      accounts: [`0x${GOERLI_PRIVATE_KEY}`, `0x${USER1_PRIVATE_KEY}`, `0x${USER2_PRIVATE_KEY}`],
      chainId: 421614,
    },
  },
  etherscan: {
    apiKey: {
      arbitrumSepolia: 'S9QSJETNXRDYIT3TR3DMF1C8H58WM8ARP2'
    },
    customChains: [
      {
        network: "arbitrumSepolia",
        chainId: 421614,
        urls: {
          apiURL: "https://api-sepolia.arbiscan.io/api",
          browserURL: "https://sepolia.arbiscan.io/"
        }
      }
    ]
  }
};
