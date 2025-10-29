import { getAssociatedTokenAddress } from '@solana/spl-token'
import { PublicKey } from '@solana/web3.js'

export const getATA = async (walletAddress: string, tokenMintAddress: string) => {
  try {
    const walletPublicKey = new PublicKey(walletAddress)
    const tokenMintPublicKey = new PublicKey(tokenMintAddress)

    const ata = await getAssociatedTokenAddress(tokenMintPublicKey, walletPublicKey)

    return ata
  } catch (error) {
    console.error('Error getting associated token address:', error)
    throw error
  }
}
