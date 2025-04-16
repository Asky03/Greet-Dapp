const hre = require("hardhat");

async function main() {
  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, Ashu!");

  await greeter.waitForDeployment(); // ✅ This replaces .deployed()

  console.log(`✅ Greeter deployed to: ${await greeter.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
