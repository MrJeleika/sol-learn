import type { Network } from '@/types/network'
import { Connection } from '@solana/web3.js'

export const SOLANA_RPC_URL: Record<Network, string> = {
  MAINNET: 'https://mainnet.helius-rpc.com/?api-key=2f9b3829-e647-43e7-b8bf-52baf5757879',
  TESTNET: 'https://solana-testnet-rpc.publicnode.com',
  DEVNET: 'https://devnet.helius-rpc.com/?api-key=2f9b3829-e647-43e7-b8bf-52baf5757879',
}

export const getSolanaConnection = (network: Network) => {
  return new Connection(SOLANA_RPC_URL[network])
}
