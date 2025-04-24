const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with your actual deployed address

const abi = [
  "function greet() view returns (string)",
  "function setGreeting(string _greeting)",
  "function getHistoryCount() view returns (uint256)",
  "function getGreetingLog(uint256 index) view returns (address, string, uint256)"
];

// ✅ Fetch current greeting
async function getGreeting() {
  if (typeof window.ethereum !== "undefined") {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, abi, provider);
      const greeting = await contract.greet();
      document.getElementById("currentGreeting").innerText = `📢 ${greeting}`;
    } catch (err) {
      console.error("Error fetching greeting:", err);
    }
  }
}

// ✅ Update greeting
async function updateGreeting() {
  const newGreeting = document.getElementById("newGreeting").value;
  if (!newGreeting) return alert("Please enter a greeting");

  if (typeof window.ethereum !== "undefined") {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const tx = await contract.setGreeting(newGreeting);
      await tx.wait();
      getGreeting();
      loadGreetingHistory(); // Refresh logs after update
    } catch (err) {
      console.error("Error updating greeting:", err);
    }
  }
}

// ✅ Fill input field with suggestion
function fillSuggestion(el) {
  const input = document.getElementById("newGreeting");
  input.value = el.innerText;
}

// ✅ Load and display greeting history
async function loadGreetingHistory() {
  if (typeof window.ethereum !== "undefined") {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, abi, provider);
      const count = await contract.getHistoryCount();
      const logContainer = document.getElementById("log");
      logContainer.innerHTML = "";

      if (count === 0) {
        logContainer.innerHTML = "<p>No greetings yet. Be the first! 🎉</p>";
        return;
      }

      for (let i = count - 1; i >= 0 && i >= count - 10; i--) {
        try {
          const [sender, message, timestamp] = await contract.getGreetingLog(i);
          const date = new Date(timestamp * 1000).toLocaleString();

          const logItem = document.createElement("div");
          logItem.className = "greeting-card";

          logItem.innerHTML = `
            <p>📝 ${message}</p>
            <p class="greeting-meta">👤 ${sender}<br>🕒 ${date}</p>
          `;

          logContainer.appendChild(logItem);
        } catch (logError) {
          console.warn(`Skipping log at index ${i}:`, logError.message);
        }
      }
    } catch (err) {
      console.error("Error loading greeting history:", err);
    }
  }
}

// ✅ Initial load
getGreeting();
loadGreetingHistory();











/*const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // your deployed address
const abi = [
  "function greet() view returns (string)",
  "function setGreeting(string _greeting)"
];


async function getGreeting() {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const greeting = await contract.greet();
    document.getElementById("currentGreeting").innerText = `📢 ${greeting}`; //reads greeting from contract using provider only 
  }
}

function fillSuggestion(el) {
  document.getElementById("newGreeting").value = el.innerText; 
}

async function updateGreeting() {
  const newGreeting = document.getElementById("newGreeting").value;
  if (!newGreeting) return alert("Please enter a greeting");

  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const tx = await contract.setGreeting(newGreeting);
    await tx.wait();
    getGreeting();
  }
}

async function connectWallet() {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      alert('Wallet connected!');
    } catch (error) {
      alert('Wallet connection failed.');
    }
  } else {
    alert('MetaMask not detected.');
  }
}

getGreeting();*/
