import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { FC, PropsWithChildren } from 'react'

import { SolanaProvider } from './solana-provider'

const queryClient = new QueryClient()

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SolanaProvider>{children}</SolanaProvider>
    </QueryClientProvider>
  )
}

export default Providers
