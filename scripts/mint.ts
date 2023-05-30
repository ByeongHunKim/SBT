import { ethers } from "hardhat";
import { config as dotEnvConfig } from "dotenv";
dotEnvConfig({ path: `../.env` });

const JSON_RPC_KEY = process.env.ALCHEMY_MUMBAI_API_KEY || '';
const ADMIN_PK = process.env.PRIVATE_KEY || '';
const METADATA_URL = process.env.METADATA_URL || '';
const SBT_ADDR = "0x2cc901AD4d0545902Dd34C636c64888a75A81706"
async function main() {
    const provider = new ethers.providers.JsonRpcProvider(`https://polygon-mumbai.g.alchemy.com/v2/${JSON_RPC_KEY}`);
    const admin = new ethers.Wallet(ADMIN_PK, provider);
    const adminPubKey = await admin.getAddress()
    console.log(await admin.getBalance(), await admin.getAddress())
    const Sbt = await ethers.getContractFactory("SBT", admin);
    const sbt = Sbt.attach(SBT_ADDR);
    const sbtWithSigner = sbt.connect(admin);
    let count = await sbtWithSigner.count();
    console.log("Before Change", count);
    const tx = await sbtWithSigner.issue(adminPubKey, METADATA_URL);
    await tx.wait();
    count = await sbtWithSigner.count();
    console.log("Changed receiver", count);
}

main().catch((error) => {
    console.log(error);
    process.exitCode = 1;
});