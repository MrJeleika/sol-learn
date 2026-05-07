import { Transaction, PublicKey, Keypair } from '@solana/web3.js'
import bs58 from 'bs58'

const coerceToBase58 = (pubkey: unknown): string | null => {
  if (!pubkey) return null
  if (typeof pubkey === 'string') return pubkey
  if (pubkey instanceof PublicKey) return pubkey.toBase58()
  if (typeof pubkey === 'object' && 'toBase58' in pubkey && typeof (pubkey as PublicKey).toBase58 === 'function') {
    return (pubkey as PublicKey).toBase58()
  }
  return null
}

export const getRequiredSigners = (transaction: Transaction | null): PublicKey[] => {
  if (!transaction || !Array.isArray(transaction.instructions)) return []

  const signerSet = new Set<string>()

  for (const instruction of transaction.instructions) {
    if (!Array.isArray(instruction?.keys)) continue
    for (const key of instruction.keys) {
      if (!key?.isSigner) continue
      const base58 = coerceToBase58(key.pubkey)
      if (base58) signerSet.add(base58)
    }
  }

  return Array.from(signerSet)
    .map((pubkey) => {
      try {
        return new PublicKey(pubkey)
      } catch {
        return null
      }
    })
    .filter((pk): pk is PublicKey => pk !== null)
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
