import express from "express";
import { Address, createWalletClient, http, parseUnits } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import dotenv from "dotenv";
import { arbitrumSepolia } from "./chains";
import { arbitrumAbi } from "../src/arbitrumAbi";
import { arbitrumContract } from "../src/contracts";
import { BorrowRequest } from "../src/types";

dotenv.config();

// Initialize express app
const app = express();
app.use(express.json());

// Setup Wallet Client
const account = privateKeyToAccount(
  process.env.WALLET_PRIVATE_KEY as `0x${string}`
);

const arbitrumClient = createWalletClient({
  chain: arbitrumSepolia,
  transport: http("https://sepolia-rollup.arbitrum.io/rpc"),
  account,
});

/**
 * Execute borrow operation
 * @param {Address} user - User address
 * @param {string} amount - Amount to borrow in USDC
 * @returns {Promise<`0x${string}`>} - Transaction hash
 */
async function executeBorrow(
  user: Address,
  amount: string
): Promise<`0x${string}`> {
  console.log(
    `🔹 Executing borrow for ${user} on Ca Chain with ${amount} USDC`
  );

  try {
    // Convert USDC to correct format (6 decimals)
    const amountParsed = parseUnits(amount, 6);

    // Send transaction to smart contract
    const tx = await arbitrumClient.writeContract({
      address: arbitrumContract,
      abi: arbitrumAbi,
      functionName: "borrowBySequencer",
      args: [amountParsed, user],
    });

    console.log(`✅ Borrow transaction executed: ${tx}`);
    return tx;
  } catch (error) {
    console.error("❌ Borrow execution failed:", error);
    throw error;
  }
}

// API Routes - Using the correct method to define routes
app.post("/api/borrow", (req, res) => {
  (async () => {
    try {
      const { userAddress, amount } = req.body as BorrowRequest;

      // Validate input
      if (!userAddress || !amount) {
        return res.status(400).json({
          success: false,
          message:
            "Missing required parameters: userAddress and amount are required",
        });
      }

      // Validate user address
      if (!userAddress.startsWith("0x") || userAddress.length !== 42) {
        return res.status(400).json({
          success: false,
          message: "Invalid user address format",
        });
      }

      // Validate amount
      if (isNaN(Number(amount)) || Number(amount) <= 0) {
        return res.status(400).json({
          success: false,
          message: "Amount must be a positive number",
        });
      }

      // Execute borrow operation
      const txHash = await executeBorrow(userAddress as Address, amount);

      // Return success response
      res.status(200).json({
        success: true,
        message: "Borrow operation executed successfully",
        data: {
          transactionHash: txHash,
          userAddress: userAddress as Address,
          amount,
        },
      });
    } catch (error: any) {
      console.error("API Error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to execute borrow operation",
        error: error.message,
      });
    }
  })();
});

// Health check endpoint - Using the correct method to define routes
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 POST /api/borrow - Execute borrow operation`);
});

export default app;
