import { NextRequest, NextResponse } from 'next/server';
import { Wallet, Client, Payment } from 'xrpl';

// XRP Ledger servers - testnet for demo, mainnet for production
const XRP_TESTNET_SERVER = 'wss://s.altnet.rippletest.net:51233';

// Mock wallet for demo purposes (using testnet)
const DEMO_WALLET = {
  address: 'rNPSAg97w2j2g8fC1fC1fC1fC1fC1fC1fC', // Placeholder testnet address
  secret: 'sn3t67F2734gH8Kj9L2mN3bV4cX5dY6zA7b', // Placeholder testnet secret
};

// Generate a new XRP wallet
function generateXRPAddress() {
  const wallet = Wallet.generate();
  return {
    address: wallet.address,
    secret: wallet.seed || '',
  };
}

// Get account balance
async function getBalance(address: string): Promise<number> {
  try {
    const client = new Client(XRP_TESTNET_SERVER);
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
async function sendXRP(
  sender: { address: string; secret: string },
  destination: string,
  amount: number
) {
  try {
    const client = new Client(XRP_TESTNET_SERVER);
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

export async function POST(request: NextRequest) {
  try {
    const { recipientAddress, amount, type } = await request.json();

    if (!recipientAddress || !amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid recipient address or amount' },
        { status: 400 }
      );
    }

    if (amount > 1000000) {
      return NextResponse.json(
        { error: 'Amount too large for demo (max 1M XRP)' },
        { status: 400 }
      );
    }

    // For demo, use a mock sender wallet
    // In production, you'd use real sender credentials
    const senderWallet = DEMO_WALLET;

    // Check balance (for demo, we assume sufficient funds)
    const balance = await getBalance(senderWallet.address);
    
    if (balance < amount && amount > 100) {
      return NextResponse.json(
        { error: 'Insufficient XRP balance' },
        { status: 400 }
      );
    }

    // Send XRP
    const result = await sendXRP(
      { address: senderWallet.address, secret: senderWallet.secret },
      recipientAddress,
      amount
    );

    if (!result.success) {
      return NextResponse.json(
        { error: 'Transaction failed: ' + result.engineResult },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      transaction: {
        hash: result.hash,
        amount: amount,
        recipient: recipientAddress,
        type: type || 'tip',
        timestamp: new Date().toISOString(),
        network: 'testnet',
      },
      message: `Successfully sent ${amount} XRP to ${recipientAddress.substring(0, 10)}...`,
    });
  } catch (error) {
    console.error('XRP transfer error:', error);
    return NextResponse.json(
      { error: 'Failed to send XRP: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ready',
    network: 'testnet',
    message: 'XRP Tipping API is operational',
    endpoints: {
      POST: '/api/tips - Send XRP tip',
    },
  });
}