import { PublicKey } from '@solana/web3.js'

export const isValidPublicKey = (pubkey: string) => {
  try {
    new PublicKey(pubkey)
    return true
  } catch {
    return false
  }
}

export const isExist = (str: string | undefined | null) => {
  return str !== undefined && str !== null && str.trim() !== ''
}

export const isValidSignature = (sig: string) => {
  // Basic Solana signature format check: base58 string length typically 86-88 chars
  if (!isExist(sig)) return false
  const base58Regex = /^[1-9A-HJ-NP-Za-km-z]+$/
  if (!base58Regex.test(sig)) return false
  return sig.length >= 64 && sig.length <= 128
}
