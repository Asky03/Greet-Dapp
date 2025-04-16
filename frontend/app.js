const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // your deployed address
const abi = [
  "function greet() view returns (string)",
  "function setGreeting(string _greeting)"
];

async function getGreeting() {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum); // ✅ v5 syntax
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const greeting = await contract.greet();
    document.getElementById("currentGreeting").innerText = `📢 ${greeting}`;
  }
}

async function updateGreeting() {
  const newGreeting = document.getElementById("newGreeting").value;
  if (!newGreeting) return alert("Please enter a greeting");

  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum); // ✅
    await provider.send("eth_requestAccounts", []); // 👈 Ask for wallet connect
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const tx = await contract.setGreeting(newGreeting);
    await tx.wait();
    getGreeting(); // Refresh greeting
  }
}

getGreeting();
