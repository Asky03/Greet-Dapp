const hre = require("hardhat");

async function main() {
  const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"; // <-- your deployed address
  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.attach(contractAddress);

  // Log current greeting
  const currentGreeting = await greeter.greet();
  console.log("👋 Current Greeting:", currentGreeting);

  // Set new greeting
  const tx = await greeter.setGreeting("Namaste from Ashu! 🙏");
  await tx.wait();

  // Log updated greeting
  const newGreeting = await greeter.greet();
  console.log("🎉 New Greeting:", newGreeting);

  // 🔍 NEW: Log the entire greeting history
  const count = await greeter.getHistoryCount();
  console.log(`📜 Greeting History Count: ${count}`);

  for (let i = 0; i < count; i++) {
    const [sender, message, timestamp] = await greeter.getHistory(i);
    const date = new Date(timestamp * 1000).toLocaleString();
    console.log(`🧾 ${i + 1}) ${message} | From: ${sender} | At: ${date}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});




/*const hre = require("hardhat");

async function main() {
  const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"; // <-- paste your latest address here

  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.attach(contractAddress); // reuse s contract factory to fetch the information of the contract

  const currentGreeting = await greeter.greet();
  console.log("👋 Current Greeting:", currentGreeting); // calls greet fn to fetch current message 

  const tx = await greeter.setGreeting("Namaste from Ashu! 🙏"); // send s a transaction to update the greeting 
  await tx.wait();

  const newGreeting = await greeter.greet(); //verufy if the message has been updated 
  console.log("🎉 New Greeting:", newGreeting);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1; // check for any execution errror 
});*/
