# 🛠 Deploy & Validate Smart Contracts with Foundry (Caér)

This guide details the process to deploy, test, and verify the smart contracts for the Caér project using [Foundry](https://github.com/foundry-rs/foundry).

---
## 📌 Prerequisites
Before you begin, ensure your system has the following installed:
- **Foundry** → Install it with:
  ```sh
  curl -L https://foundry.paradigm.xyz | bash
  foundryup
  ```
- **Git** → for cloning the repository.

- **Ethereum Node Provider** (e.g., Alchemy, Infura, or Anvil for local testing)

---

## 📋 Clone the Repository
Clone the Caér smart contracts repository from GitHub:
```sh
git clone https://github.com/ghozzza/caer-fi
cd caer-fi
cd caer-sc
```

---

## 🔧 Install Dependencies
Set up all necessary dependencies by running:
```sh
forge install
```

---

## 🚀 Compile Smart Contracts
Compile your Solidity contracts located in the src/ folder with:
```sh
forge build
```
This will compile the contracts located in the `src/` folder.

---

## 🧪 Run Unit Tests
Ensure everything works as expected by executing the unit tests:
```sh
forge test
```
For detailed debugging information, run:
```sh
forge test -vvvv
```

---

## 🔥 Deploy Smart Contracts
Deploy your contracts to a test network (for example, Sepolia) with:
```sh
forge script scripts/Deploy.s.sol --rpc-url $RPC_URL --private-key $PRIVATE_KEY --broadcast
```
For local deployment using Anvil:
```sh
anvil &
forge script scripts/Deploy.s.sol --rpc-url http://127.0.0.1:8545 --private-key $PRIVATE_KEY --broadcast
```


## 📜 License
This project is licensed under the **MIT License**.

---

## 🎯 Wrap-Up
Excellent work! You have successfully deployed, tested, and verified the Caér smart contracts using Foundry. If you run into any issues, double-check your environment variables or refer to the official Foundry [documentation](https://book.getfoundry.sh/) for further guidance.🚀
