import { Wallet, Client, Payment } from 'xrpl';

// Generate a new XRP wallet
export function generateXRPAddress() {
  const wallet = Wallet.generate();
  return {
    address: wallet.address,
    secret: wallet.seed || '',
  };
}

// Get account balance
export async function getBalance(address: string): Promise<number> {
  try {
    const client = new Client('wss://s.altnet.rippletest.net:51233');
    await client.connect();
    
    const response = await client.request({
      command: 'account_info',
      account: address,
      ledger_index: 'validated',
    });
    
    const balance = response.result?.account_data?.Balance || '0';
    const xrpBalance = parseInt(balance) / 1_000_000; // Convert from drops to XRP
    
    await client.disconnect();
    return xrpBalance;
  } catch (error) {
    console.error('Error getting balance:', error);
    return 0;
  }
}

// Send XRP transaction
export async function sendXRP(
  sender: { address: string; secret: string },
  destination: string,
  amount: number
) {
  try {
    const client = new Client('wss://s.altnet.rippletest.net:51233');
    await client.connect();

    const wallet = Wallet.fromSeed(sender.secret);

    // Create a Payment transaction
    const payment: Payment = {
      TransactionType: 'Payment',
      Account: sender.address,
      Destination: destination,
      Amount: (amount * 1_000_000).toFixed(0), // Convert to drops
    };

    const { tx_blob, hash } = wallet.sign(payment);
    const result = await client.submit(tx_blob);

    await client.disconnect();

    return {
      success: result.result?.engine_result === 'tesSUCCESS',
      hash: hash,
      engineResult: result.result?.engine_result,
    };
  } catch (error) {
    console.error('Error sending XRP:', error);
    throw error;
  }
}

// Create a wallet (alias for generateXRPAddress)
export async function createWallet() {
  return generateXRPAddress();
}