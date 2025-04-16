const hre = require("hardhat");

async function main() {
  const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"; // <-- paste your latest address here

  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.attach(contractAddress);

  const currentGreeting = await greeter.greet();
  console.log("👋 Current Greeting:", currentGreeting);

  const tx = await greeter.setGreeting("Namaste from Ashu! 🙏");
  await tx.wait();

  const newGreeting = await greeter.greet();
  console.log("🎉 New Greeting:", newGreeting);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
