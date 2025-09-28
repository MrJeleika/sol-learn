import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import type { PropsWithChildren } from 'react'
import { memo } from 'react'

import { endpoint, wallets } from '@/lib/solana'

export const SolanaProvider = memo(({ children }: PropsWithChildren) => {
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  )
})
SolanaProvider.displayName = 'SolanaProvider'
