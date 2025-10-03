import { getSolanaConnection } from '@/constants/solana/connection'
import type { Network } from '@/types/network'

export const useSolanaConnection = (network: Network) => {
  return getSolanaConnection(network)
}
