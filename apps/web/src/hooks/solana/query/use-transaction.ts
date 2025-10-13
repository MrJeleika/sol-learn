import type { Network } from '@/types/network'
import { useQuery } from '@tanstack/react-query'
import { isExist, isValidSignature } from '@/utils/validation/validation.utils'
import { getSolanaConnection } from '@/constants/solana/connection'

export const getTransactionBySignature = async (signature: string, network: Network) => {
  const connection = getSolanaConnection(network)

  const tx = await connection.getTransaction(signature, {
    maxSupportedTransactionVersion: 0,
    commitment: 'confirmed',
  })

  if (!tx) return { transactionJson: '', slot: '', blockTime: '' }

  const transactionJson = JSON.stringify(tx, null, 2)
  const slot = String(tx.slot ?? '')
  const blockTime = String(tx.blockTime ?? '')

  return { transactionJson, slot, blockTime }
}

export const useTransactionBySignature = (signature: string, network: Network | null, key: number) => {
  return useQuery({
    queryKey: ['transactionBySignature', signature, network, key],
    queryFn: async () => {
      if (!network) return { transactionJson: '', slot: '', blockTime: '' }
      return getTransactionBySignature(signature, network)
    },
    enabled: isValidSignature(signature) && isExist(network),
  })
}
