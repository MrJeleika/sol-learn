import type { Network } from '@/types/network'
import { useQuery } from '@tanstack/react-query'
import { isExist, isValidPublicKey } from '@/utils/validation/validation.utils'
import { getSolanaConnection } from '@/constants/solana/connection'
import { getATA } from '@/utils/solana/solana.utils'

export const getTokenBalance = async (pubkey: string, network: Network, token: string) => {
  try {
    const connection = getSolanaConnection(network)
    const ata = await getATA(pubkey, token)

    const balance = await connection.getTokenAccountBalance(ata)

    return { rawBalance: balance.value.amount.toString(), uiBalance: balance.value.uiAmountString }
  } catch (error) {
    console.error('Error getting token balance:', error)
    return { rawBalance: '0', uiBalance: '0' }
  }
}

export const useTokenBalance = (pubkey: string, network: Network | null, token: string, key: number) => {
  return useQuery({
    queryKey: ['tokenBalance', pubkey, network, token, key],
    queryFn: async () => {
      if (!network) return { rawBalance: '0', uiBalance: '0' }
      return getTokenBalance(pubkey, network, token)
    },
    enabled: isValidPublicKey(pubkey) && isExist(network) && isValidPublicKey(token),
  })
}
