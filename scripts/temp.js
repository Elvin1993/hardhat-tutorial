const { ethers } = require("hardhat");



async function main() {
  console.log(`0xB9314C2eacB4c956D429d548F98796a0f72a70fa`)
  const [owner, user1, user2] = await ethers.getSigners();
  console.log(`
["${user1.address}", "${user2.address}"]`)

const eth1 = ethers.utils.parseEther("1");
const eth2 = ethers.utils.parseEther("2");

console.log(`
[${eth1.toString()}, ${eth2.toString()}]`)
}

main()