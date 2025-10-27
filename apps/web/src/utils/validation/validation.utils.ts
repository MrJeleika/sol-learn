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
  if (!isExist(sig)) return false

  return sig.length >= 64 && sig.length <= 128
}
