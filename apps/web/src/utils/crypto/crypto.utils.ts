import { Keypair, PublicKey } from '@solana/web3.js'
import bs58 from 'bs58'
import nacl from 'tweetnacl'
import { sha256 } from 'js-sha256'

export const sign = (message: string | Uint8Array, privateKeyBase58: string) => {
  try {
    const secretKey = bs58.decode(privateKeyBase58)
    const msg = typeof message === 'string' ? new TextEncoder().encode(message) : message
    const signature = nacl.sign.detached(msg, secretKey)
    return bs58.encode(signature)
  } catch (error) {
    console.error('Error signing message:', error)
    return ''
  }
}

export const verify = (message: string | Uint8Array, signatureBase58: string, publicKeyBase58: string) => {
  try {
    const signature = bs58.decode(signatureBase58)
    const pubkeyBytes = new PublicKey(publicKeyBase58).toBytes()
    const msg = typeof message === 'string' ? new TextEncoder().encode(message) : message
    return nacl.sign.detached.verify(msg, signature, pubkeyBytes)
  } catch (error) {
    console.error('Error verifying signature:', error)
    return false
  }
}

export const transformKeypair = (keypair: Keypair) => {
  return {
    publicKey: keypair.publicKey.toBase58(),
    privateKey: bs58.encode(keypair.secretKey),
  }
}

export const hash = (message: string) => {
  try {
    return sha256(message)
  } catch (error) {
    console.error('Error hashing message:', error)
    return ''
  }
}

export const generateNodeId = () => {
  return crypto.randomUUID().replace(/-/g, '')
}
