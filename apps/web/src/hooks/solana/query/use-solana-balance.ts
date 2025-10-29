import type { Network } from '@/types/network'
import { useQuery } from '@tanstack/react-query'
import { PublicKey } from '@solana/web3.js'
import { isExist, isValidPublicKey } from '@/utils/validation/validation.utils'
import { formatUnits } from '@/utils/format/format.utils'
import { getSolanaConnection } from '@/constants/solana/connection'

export const getSolanaBalance = async (pubkey: string, network: Network) => {
  try {
    const connection = getSolanaConnection(network)

    const balance = await connection.getBalance(new PublicKey(pubkey))

    const parsedBalance = formatUnits(balance, 9)

    return { rawBalance: balance.toString(), uiBalance: parsedBalance.toString() }
  } catch (error) {
    console.error('Error getting Solana balance:', error)
    return { rawBalance: '0', uiBalance: '0' }
  }
}

export const useSolanaBalance = (pubkey: string, network: Network | null, key: number) => {
  return useQuery({
    queryKey: ['solanaBalance', pubkey, network, key],
    queryFn: async () => {
      if (!network) return { rawBalance: '0', uiBalance: '0' }
      return getSolanaBalance(pubkey, network)
    },
    enabled: isValidPublicKey(pubkey) && isExist(network),
  })
}
