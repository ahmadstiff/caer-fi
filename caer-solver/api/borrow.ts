import { Address, createWalletClient, http, parseUnits } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import dotenv from "dotenv";
import { EduChain } from "../src/chains";
import { eduChainContract } from "../src/contracts";
import { eduChainAbi } from "../src/eduChainAbi";
import { VercelRequest, VercelResponse } from "@vercel/node";
import Cors from "cors";

dotenv.config();

// Setup CORS
const cors = Cors({
  origin: "*",
  methods: ["POST", "OPTIONS"],
});

// Helper untuk menjalankan CORS
function runMiddleware(req: VercelRequest, res: VercelResponse, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

// Setup Wallet Client
const account = privateKeyToAccount(
  process.env.WALLET_PRIVATE_KEY as `0x${string}`
);

const eduChainClient = createWalletClient({
  chain: EduChain,
  transport: http("https://rpc.open-campus-codex.gelato.digital"),
  account,
});

async function executeBorrow(
  user: Address,
  amount: string
): Promise<`0x${string}`> {
  console.log(
    `🔹 Executing borrow for ${user} on Ca Chain with ${amount} USDC`
  );
  try {
    const amountParsed = parseUnits(amount, 6);
    const tx = await eduChainClient.writeContract({
      address: eduChainContract,
      abi: eduChainAbi,
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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await runMiddleware(req, res, cors);

  if (req.method === "POST") {
    try {
      const { userAddress, amount } = req.body;
      if (!userAddress || !amount) {
        return res.status(400).json({
          success: false,
          message:
            "Missing required parameters: userAddress and amount are required",
        });
      }
      if (!userAddress.startsWith("0x") || userAddress.length !== 42) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid user address format" });
      }
      if (isNaN(Number(amount)) || Number(amount) <= 0) {
        return res.status(400).json({
          success: false,
          message: "Amount must be a positive number",
        });
      }
      const txHash = await executeBorrow(userAddress as Address, amount);
      res.status(200).json({
        success: true,
        message: "Borrow operation executed successfully",
        data: { transactionHash: txHash, userAddress, amount },
      });
    } catch (error: any) {
      console.error("API Error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to execute borrow operation",
        error: error.message,
      });
    }
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
