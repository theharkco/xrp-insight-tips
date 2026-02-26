import { NextRequest, NextResponse } from 'next/server';
import { sendXRP, generateXRPAddress, getBalance } from '@/lib/xrp';

export async function POST(request: NextRequest) {
  try {
    const { recipientAddress, amount, insightId } = await request.json();

    if (!recipientAddress || !amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid recipient address or amount' },
        { status: 400 }
      );
    }

    // Generate sender wallet
    const senderWallet = await generateXRPAddress();
    
    // Check balance (mock - in production, check actual balance)
    const balance = 1000; // Mock balance
    
    if (balance < amount) {
      return NextResponse.json(
        { error: 'Insufficient XRP balance' },
        { status: 400 }
      );
    }

    // Send XRP
    const result = await sendXRP(
      { address: senderWallet.address, secret: senderWallet.secret } as any,
      recipientAddress,
      amount
    );

    return NextResponse.json({
      success: true,
      transaction: result,
      amount: amount,
      recipient: recipientAddress,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('XRP transfer error:', error);
    return NextResponse.json(
      { error: 'Failed to send XRP' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ready',
    network: 'mainnet',
    message: 'XRP Tipping API is operational'
  });
}