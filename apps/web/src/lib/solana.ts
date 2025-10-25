import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets'
import { clusterApiUrl, Connection } from '@solana/web3.js'

import { env } from '@/env'

export const network = WalletAdapterNetwork.Mainnet

export const endpoint = env.VITE_PUBLIC_SOLANA_RPC ?? clusterApiUrl(network)

export const wallets = [new PhantomWalletAdapter()]

export const connection = new Connection(endpoint)
