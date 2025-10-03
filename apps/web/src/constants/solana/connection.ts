import type { Network } from '@/types/network'
import { Connection } from '@solana/web3.js'

export const SOLANA_RPC_URL: Record<Network, string> = {
  MAINNET: 'https://api.mainnet-beta.solana.com',
  TESTNET: 'https://api.testnet.solana.com',
  DEVNET: 'https://api.devnet.solana.com',
}

export const getSolanaConnection = (network: Network) => {
  return new Connection(SOLANA_RPC_URL[network])
}
