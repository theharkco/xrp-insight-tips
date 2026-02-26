import { Wallet } from 'xrpl';

export async function createWallet() {
  const wallet = Wallet.generate();
  console.log('Wallet created');
  return wallet;
}