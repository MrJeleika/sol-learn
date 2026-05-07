import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import type { PropsWithChildren } from 'react'
import { memo } from 'react'

import { endpoint, wallets } from '@/lib/solana'

import '@solana/wallet-adapter-react-ui/styles.css'

export const SolanaProvider = memo(({ children }: PropsWithChildren) => {
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
})
SolanaProvider.displayName = 'SolanaProvider'
