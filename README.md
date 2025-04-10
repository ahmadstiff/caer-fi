# Caér Finance

## Project Demo
[Go to site](https://caer-finance.vercel.app/)

![Project Screenshot](https://github.com/ahmadstiff/caer-fi/blob/main/caer-fe/public/caer-fi-home.png)

---

## Overview

### Introduction to Caér Finance

Welcome to **Caér Finance**, a cross-chain lending and borrowing protocol purpose-built to serve as a foundational DeFi primitive on the EduChain network.

Caér is designed to facilitate secure, efficient, and scalable decentralized financial services by enabling users to lend, borrow, and manage collateral across multiple blockchain ecosystems. Through this approach, Caér enhances capital efficiency while contributing directly to Total Value Locked (TVL) and transaction volume on EduChain.

Leveraging the capabilities of Espresso’s Application-Specific Sequencer (ASS) and a solver-based coordination architecture, Caér ensures trustless cross-chain execution with rapid finality. This infrastructure eliminates reliance on centralized bridges and custodians, promoting decentralization without compromising performance or security.

As one of the first lending protocols deployed on EduChain, Caér plays a critical role in expanding the network’s ecosystem. It serves as a modular, composable financial layer that other decentralized applications can integrate with—thereby supporting broader protocol interoperability and future ecosystem growth.

By offering a robust DeFi experience with a focus on TVL growth, cross-chain liquidity access, and institutional-grade infrastructure, Caér aims to position EduChain as a compelling destination for users and developers seeking novel, blockchain-based financial solutions.

---

## What is Caér Finance?

**Caér Finance** is a next-generation cross-chain lending and borrowing protocol developed to serve as a foundational decentralized finance (DeFi) primitive within the EduChain ecosystem. It facilitates seamless asset supply, borrowing, and management across multiple blockchain networks through a unified platform, eliminating the need for centralized custodians or traditional bridging mechanisms.

At its core, Caér is powered by an Application-Specific Sequencer (ASS), designed to manage transaction ordering, data verification, and execution across chains in a secure, transparent, and trustless manner. This sequencer ensures consistency and correctness in cross-chain operations, enabling reliable financial interactions at scale.

To reinforce transaction integrity and ensure timely finality, Caér integrates with the Espresso protocol, leveraging its decentralized finality layer. Through this integration, Caér benefits from rapid and secure confirmation of cross-chain transactions while maintaining alignment with the principles of decentralization and verifiability.

By combining protocol-specific sequencing with robust cross-chain finality infrastructure, Caér delivers a modular, secure, and high-performance lending platform—positioning itself as a critical driver of liquidity, adoption, and composability across the EduChain ecosystem and beyond.

---

## Key Features

- **Application-Specific Sequencer (ASS)**  
  Custom-built sequencer that governs the ordering, validation, and execution of cross-chain transactions in a deterministic and trustless manner.

- **Fast & Secure Cross-Chain Finality (Powered by Espresso)**  
  Seamless and rapid transaction confirmation layer that ensures confidence in cross-chain operations.

- **Seamless Cross-Chain Lending, Borrowing & Swap**  
  Unified interface for supply, borrowing, and managing assets across chains, including on-chain swap functionality.

- **Trustless and Transparent Execution**  
  All operations are fully on-chain using audited smart contracts to preserve user sovereignty.

- **Adaptive Interest Rate and Risk Framework**  
  Dynamic model based on market conditions and liquidity to optimize protocol health and user incentives.

- **Liquidity Aggregation and Capital Efficiency**  
  Pooled liquidity from multiple chains increases borrowing power and minimizes capital fragmentation.

---

## Why Caér Finance?

- **True Cross-Chain Lending & Borrowing**  
  Trust-minimized, native cross-chain liquidity access without reliance on third-party interoperability.

- **Secure and Timely Transaction Finality**  
  Fast confirmations via Espresso finality layer for safe and efficient market participation.

- **Trustless Execution via Application-Specific Sequencer (ASS)**  
  Decentralized infrastructure ensuring robust and accurate coordination.

- **Capital-Efficient Liquidity Aggregation**  
  Enables advanced strategies and maximizes utility of idle capital.

- **Modular, Scalable, and Ecosystem-Ready**  
  Composable with other dApps and built for long-term utility on EduChain.

---

## Problem

### Problems Caér Finance Solves

- **Fragmented Liquidity**  
  Combines liquidity across chains, overcoming the limitations of siloed lending markets.

- **Slow & Inefficient Liquidations Cross-Chain**  
  Uses ASS and Espresso to execute fast and secure liquidations across different ecosystems.

- **Security Risks in Cross-Chain Interactions**  
  Reduces vulnerabilities associated with centralized bridges and unverified data transmission.

- **Isolated Liquidity Pools**  
  Aggregates capital into a shared liquidity layer, increasing usability and returns.

- **Bootstrap Challenges in New Chain Deployments**  
  Supports new chains like EduChain with incentives and infrastructure that foster adoption.

---

## Challenges

### Challenges Faced by Caér Finance

- **Technological Complexity**  
  Integrating ASS, Espresso, and solver logic while ensuring security and performance is a non-trivial engineering task.

- **Cross-Chain Liquidity Management**  
  Real-time coordination of liquidity and rates across independent networks is essential and challenging.

- **Security & Smart Contract Risks**  
  Mitigated through on-chain, verifiable, and decentralized execution.

- **Ecosystem Onboarding and Bootstrap Challenges**  
  Caér must bootstrap user adoption and composability early to become a viable DeFi foundation.

---

## How We Achieve Cross-Chain Capability
![Flowchart Screenshot](https://caer-finance.gitbook.io/~gitbook/image?url=https%3A%2F%2F479864240-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fr1WgeDLAmHGxwGPod7U5%252Fuploads%252FJC6Wes11vx5J2b9PLJUD%252FScreenshot%25202025-04-09%2520214707.png%3Falt%3Dmedia%26token%3D9b9dd450-ba64-4700-8d5e-fbdc829b898e&width=768&dpr=4&quality=100&sign=1403ff1a&sv=2)
To enable seamless cross-chain lending and borrowing in Caér, we utilize a structured process that ensures security and efficiency. Our system leverages the Application-Specific Sequencer (ASS), Espresso confirmations, and solvers to facilitate interactions across different chains. ASS plays a crucial role in verifying data across chains, ensuring valid transactions, and maintaining system integrity.

### Cross-Chain Lending Workflow

1. **User Collateral Deposit**  
   The user deposits 1 WETH as collateral on Chain A.

2. **User Loan Request**  
   The user initiates a request to borrow 100 USDC on Chain B.

3. **ASS Verification**  
   ASS verifies the deposit on Chain A to ensure the user has sufficient collateral.

4. **Espresso Confirmation & ASS Signature Generation**  
   Finality achieved within ~15 seconds via Espresso; ASS then signs to validate transaction.

5. **Transaction Processing**  
   Transaction with ASS signature is submitted on Chain B.

6. **Solver Loan Execution**  
   Solver confirms the request and releases 100 USDC to the user on Chain B.

> **Note:**  
> For the purposes of this hackathon, we are using mock tokens to simulate transactions and interactions within the platform. Additionally, the platform is operating on a testnet environment.

---

## Swap
![Swap Screenshot](https://caer-finance.gitbook.io/~gitbook/image?url=https%3A%2F%2F479864240-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fr1WgeDLAmHGxwGPod7U5%252Fuploads%252FURCgJJNdH1C9kWN5Jn94%252Fimage.png%3Falt%3Dmedia%26token%3D89c07a04-0ea6-46f4-b0fa-de6b9e673de4&width=768&dpr=4&quality=100&sign=5f13d697&sv=2)
Caér implements a decentralized swap mechanism inspired by Automated Market Maker (AMM) models, enabling seamless token exchanges within the Caér Pool.


### 1. Liquidity Provider 💧
Liquidity Providers (LPs) deposit pairs of tokens (e.g., Token A and Token B) into the **Caér Pool**.

In return, LPs receive **Pool Tokens**, which represent their share of the liquidity pool and entitle them to a proportion of the transaction fees generated from swaps.

### 2. Caér Pool Management 🗃️
The **Caér Pool** maintains reserves of the deposited tokens and continuously updates balances as users perform swap operations.

These reserves are used to facilitate trades between Token A and Token B **without relying on external order books**.

### 3. Swap Mechanism 🔄
Traders initiate swaps through the **Caér Swap** interface by selecting the tokens they wish to exchange — such as swapping Token A for Token B.

**What makes Caér unique:**

To access swap functionalities, users **must hold an active lending or borrowing position**.  
This ensures that swaps are **directly integrated with the lending and borrowing protocol**, enabling **capital efficiency** and **enhanced liquidity management**.

The swap functionality applies an **Automated Market Maker (AMM)** formula to determine the exchange rate, considering the current reserves of the involved tokens.

Upon successful execution, the **Caér Pool** updates the reserves accordingly.


### 4. Transaction Fees 💸
A small fee is applied to each swap, **distributed to Liquidity Providers based on their share of the pool**.

These fees **incentivize LPs to maintain liquidity** within the pool, enhancing platform efficiency and accessibility.

### 5. Liquidity Withdrawal 📤
LPs can withdraw their liquidity at any time by **redeeming their Pool Tokens**.

Upon withdrawal, the provider receives their **proportional share of the pool’s reserves** along with any **accumulated fees**.


> **Note:**  
> For the purposes of this hackathon, we are using **mock tokens** to simulate transactions and interactions within the platform.  
> Additionally, the platform is operating on a **testnet environment**.


---

## 🔗 Links

- 🌐 Website: [https://caer-finance.vercel.app](https://caer-finance.vercel.app/)
- 📚 Documentation: [https://caer-finance.gitbook.io/caer-finance](https://caer-finance.gitbook.io/caer-finance)
- 🏢 Organization: [https://github.com/ahmadstiff/caer-fi](https://github.com/ahmadstiff/caer-fi)
- 🎥 Video Demo Application: [https://www.youtube.com/watch?v=5j9tHTN1yiI](https://www.youtube.com/watch?v=5j9tHTN1yiI)
- 🧑‍🏫 CAÉR Pitch Deck: [https://www.youtube.com/watch?v=3D9GK2prsTw](https://www.youtube.com/watch?v=3D9GK2prsTw)
- 🖥️ Presentation Slides: [Canva Slides](https://www.canva.com/design/DAGkEemm0RI/Ub5G2Ux0_8Qq5ORF1HzexQ/edit?utm_content=DAGkEemm0RI&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

---
## 🔗 Smart Contracts 
### LendingPool ‼Deployed on Edu Chain
- **Contract Name:** LendingPool
- **Contract Address:** 0xF64b9a1bbD331eB5e3Fa5c80fe9417E1A3F96F12

### LendingPoolSequencer ‼Deployed on Arbitrum Sepolia
- **Contract Name:** LendingPoolSequencer
- **Contract Address:** 0xdE8eDfdA49a2ca5Fe693e4355a1d70D49018f3C4

### MockUSDC ‼Import Token Contract Address to Your Wallet
- **Contract Name:** MockUSDC (Edu Chain Testnet)
- **Contract Address:** 0x42260072BbfaD1b50AD01C8aAdeA5dE345f2E752
- **Contract Name:** MockUSDC (Arbitrum Sepolia)
- **Contract Address:** 0xB55061A1c2dC4E5da0626371f3Bcd322d94aFE7a

### MockWETH ‼Import Token Contract Address to Your Wallet
- **Contract Name:** MockWETH (Edu Chain Testnet)
- **Contract Address:** 00x18858A62e46DCb501F1c69893ee0f7F2323581a5
- **Contract Name:** MockWETH (Arbitrum Sepolia)
- **Contract Address:** 0x2c2e865b4F45A3c5540e51088a3232828C8cc7Ed

### MockWBTC ‼Import Token Contract Address to Your Wallet
- **Contract Name:** MockWBTC (Edu Chain Testnet)
- **Contract Address:** 0xa0624E61a525Ba2A71B793413a89F9a624646081
- **Contract Name:** MockWBTC (Arbitrum Sepolia)
- **Contract Address:** 0x8Aa245cf3ad6dc239AfaA3B7498B378354a49D56

## 🔗 API
- **Sequencer:** https://caer-finance-sequencer.vercel.app/

## Edu Chain Testnet
- **RPC URL:** https://rpc.open-campus-codex.gelato.digital
- **Chain ID:** 656476
- **Blockexplorer:** https://opencampus-codex.blockscout.com/
  
## Arbitrum Sepolia
- **RPC URL:** https://sepolia-rollup.arbitrum.io/rpc
- **Chain ID:** 421614
- **Blockexplorer:** https://sepolia.arbiscan.io/

## License

MIT License © 2025 Caér Finance

---

