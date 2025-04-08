import { useSignMessage, useAccount } from "wagmi";
import { toast } from "@/components/ui/use-toast"; // Updated import to use your custom toast
import { TransactionHandlerProps } from "@/types/type";

export default function useTransactionHandler({
  amount,
  token,
  fromChain,
  toChain,
  recipientAddress,
  onSuccess,
  onLoading,
}: TransactionHandlerProps) {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();

  // Helper function to get chain emoji
  const getChainEmoji = (chainName: string) => {
    const chainEmojis: Record<string, string> = {
      Arbitrum: "⚡",
      Base: "🔵",
      "Ca Chain": "🌐",
      Ethereum: "💎",
      Optimism: "🔴",
    };

    return chainEmojis[chainName] || "🔗";
  };

  const handleTransaction = async () => {
    try {
      if (!amount || Number.parseFloat(amount) <= 0) {
        toast({
          title: "🚫 Invalid Amount",
          description: "Please enter a valid amount to borrow.",
          variant: "destructive",
        });
        return;
      }

      if (!recipientAddress) {
        toast({
          title: "⚠️ Missing Recipient",
          description: "Please specify a recipient address.",
          variant: "warning",
        });
        return;
      }

      if (!address) {
        toast({
          title: "🔗 Wallet Not Connected",
          description: "Please connect your wallet before proceeding.",
          variant: "destructive",
        });
        return;
      }

      onLoading(true);

      const fromChainEmoji = getChainEmoji(fromChain.name);
      const toChainEmoji = getChainEmoji(toChain.name);

      // Show loading toast with more details
      toast({
        title: `⏳ Bridging ${amount} ${token}...`,
        description: `${fromChainEmoji} **${fromChain.name}** → ${toChainEmoji} **${toChain.name}**\n\nPreparing your cross-chain transaction. This may take a moment...`,
        variant: "info",
      });

      // Generate a unique request ID
      const requestId = `REQ-${Math.random()
        .toString(36)
        .substring(2, 10)
        .toUpperCase()}-${Date.now().toString().substring(9)}`;

      // Format timestamp in ISO format for better standardization
      const timestamp = new Date().toISOString();
      const readableDate = new Date().toLocaleString();

      // Calculate estimated gas fees (this would be replaced with actual calculation in production)
      const estimatedGasFee = (Number(amount) * 0.002).toFixed(6);

      // Enhanced professional message to sign
      const messageToSign = `
=== CAER FINANCE: SECURE CROSS-CHAIN BRIDGE REQUEST ===

REQUEST ID: ${requestId}
TIMESTAMP: ${readableDate}

TRANSACTION DETAILS:
• Amount: ${amount} ${token}
• From: ${fromChain.name} (Chain ID: ${fromChain.id})
• To: ${toChain.name} (Chain ID: ${toChain.id})
• Recipient: ${recipientAddress}
• Estimated Gas Fee: ~${estimatedGasFee} ${token}

SECURITY VERIFICATION:
• Wallet Address: ${address}
• Nonce: ${Date.now()}
• Request Hash: ${btoa(address + amount + timestamp).substring(0, 16)}

By signing this message, you authorize CAER Finance to process this cross-chain bridge transaction according to the details specified above. This signature does not authorize any other transactions or transfers.

IMPORTANT: CAER Finance will never ask you to sign messages for any purpose other than transaction authorization. Always verify transaction details before signing.

Ref: CF-${timestamp.substring(0, 10)}-${Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase()}
`;

      toast({
        title: "🔐 Secure Signature Required",
        description: `${fromChainEmoji} → ${toChainEmoji} Please verify and sign the secure transaction request in your wallet to authorize sending **${amount} ${token}** from **${fromChain.name}** to **${toChain.name}**.`,
        variant: "info",
      });

      const signature = await signMessageAsync({ message: messageToSign });

      toast({
        title: "🔄 Processing Transaction",
        description: `${fromChainEmoji} → ${toChainEmoji} Your transaction is being processed on the blockchain. Please wait...`,
        variant: "info",
      });

      // Send request to backend
      const response = await fetch(
        "https://solver-caer-fi.vercel.app/api/borrow",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount,
            userAddress: address,
            recipientAddress,
            fromChain: fromChain.id,
            toChain: toChain.id,
            signature,
            message: messageToSign,
            requestId,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        // Format transaction hash for display
        const txHash = data.data?.transactionHash || "";
        const formattedTxHash = txHash
          ? `${txHash.slice(0, 6)}...${txHash.slice(-4)}`
          : "";

        const txExplorerLink = txHash
          ? `[View on Explorer](https://explorer.cachain.io/tx/${txHash})`
          : "";

        toast({
          title: "✅ Transaction Successful!",
          description: `${fromChainEmoji} → ${toChainEmoji} **${amount} ${token}** successfully borrowed from **${
            fromChain.name
          }** to **${toChain.name}**!\n\n${
            txHash ? `Transaction: ${formattedTxHash}` : ""
          } usdc token 0x66bbf06f9f42effffcded87078cb9c80f5d7054e`,
          variant: "success",
        });

        onSuccess();
      } else {
        throw new Error(data.message || "Transaction failed");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      toast({
        title: "❌ Bridge Failed",
        description: `${getChainEmoji(fromChain.name)} → ${getChainEmoji(
          toChain.name
        )} Failed to bridge **${amount} ${token}** from **${
          fromChain.name
        }** to **${toChain.name}**.\n\n⚠️ Error: ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      onLoading(false);
    }
  };

  return { handleTransaction };
}
