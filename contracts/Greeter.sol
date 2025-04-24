// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Greeter {
    string public greeting;
    uint256 public lastUpdated;

    struct GreetingLog {
        address sender;
        string message;
        uint256 timestamp;
    }

    GreetingLog[] public history;

    constructor(string memory _greeting) {
        greeting = _greeting;
        lastUpdated = block.timestamp;
        history.push(GreetingLog(msg.sender, _greeting, block.timestamp));
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _newGreeting) public {
        greeting = _newGreeting;
        lastUpdated = block.timestamp;
        history.push(GreetingLog(msg.sender, _newGreeting, block.timestamp));
    }

    function getGreetingLog(uint index) public view returns (address, string memory, uint256) {
        require(index < history.length, "Invalid index");
        GreetingLog memory log = history[index];
        return (log.sender, log.message, log.timestamp);
    }

    function getHistoryCount() public view returns (uint256) {
        return history.length;
    }
}




/*pragma solidity ^0.8.0;

contract Greeter {
    string public greeting;

    constructor(string memory _greeting) {
        greeting = _greeting;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _newGreeting) public {
        greeting = _newGreeting;
    }
} */

// BLOCK CHAIN THING 
// MEMORY LIKE DIARY THING 