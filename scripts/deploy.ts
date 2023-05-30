import { ethers } from 'hardhat';
import { getDatetimeString } from '../utils/timeUtils';
async function main() {
  const currentTimestampInSeconds = Math.round(Date.now());
  const contractCreatedTime = getDatetimeString(currentTimestampInSeconds)
  const SoulboundToken = await ethers.getContractFactory("SBT");
  const soulBoundToken = await SoulboundToken.deploy();
  await soulBoundToken.deployed();

  console.log(
    `${soulBoundToken.address} contract is deployed at ${contractCreatedTime}`
  );
  console.log(`
 click this link if you deploy contract on Ethereum Sepolia Testnet
 https://sepolia.etherscan.io/address/${soulBoundToken.address} \n
 click this link if you deploy contract on Bianace Smart Chain Testnet
 https://testnet.bscscan.com/address/${soulBoundToken.address} \n
 click this link if you deploy contract on Polygon Mumbai Testnet
 https://mumbai.polygonscan.com/address/${soulBoundToken.address} \n
  `)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
