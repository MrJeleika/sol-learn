import { Transaction, PublicKey } from '@solana/web3.js'

export const getRequiredSigners = (transaction: Transaction | null): PublicKey[] => {
  if (!transaction) return []

  const signerSet = new Set<string>()

  for (const instruction of transaction.instructions) {
    for (const key of instruction.keys) {
      if (key.isSigner) {
        signerSet.add(key.pubkey.toBase58())
      }
    }
  }

  return Array.from(signerSet).map((pubkey) => new PublicKey(pubkey))
}

export const truncatePubkey = (pubkey: string): string => {
  if (pubkey.length <= 8) return pubkey
  return `${pubkey.slice(0, 4)}...${pubkey.slice(-4)}`
}
