import { getAssociatedTokenAddress } from '@solana/spl-token'
import { PublicKey } from '@solana/web3.js'

export const getATA = async (walletAddress: string, tokenMintAddress: string) => {
  const walletPublicKey = new PublicKey(walletAddress)
  const tokenMintPublicKey = new PublicKey(tokenMintAddress)

  const ata = await getAssociatedTokenAddress(tokenMintPublicKey, walletPublicKey)

  return ata
}
