import { Transaction, PublicKey, Keypair } from '@solana/web3.js'
import bs58 from 'bs58'

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

export const createKeypairFromPrivateKey = (privateKeyBase58: string): Keypair | null => {
  try {
    return Keypair.fromSecretKey(bs58.decode(privateKeyBase58))
  } catch {
    return null
  }
}
