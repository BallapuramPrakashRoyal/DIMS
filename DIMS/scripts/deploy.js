const hre = require("hardhat");

async function main() {
  // Get the contract factory
  const DIDRegistry = await hre.ethers.getContractFactory("DIDRegistry");
  
  // Deploy the contract
  const didRegistry = await DIDRegistry.deploy();
  await didRegistry.waitForDeployment();

  const address = await didRegistry.getAddress();
  console.log("DIDRegistry deployed to:", address);

  // Export the contract address
  const fs = require("fs");
  const contractsDir = "./src/contracts";
  
  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    "./src/contracts/contract-address.json",
    JSON.stringify({ DIDRegistry: address }, undefined, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });