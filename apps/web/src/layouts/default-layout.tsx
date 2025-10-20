import { Suspense, memo } from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'

import Providers from '@/providers/Providers'
import { Header } from '@/components/header/header'

const DefaultLayout = memo(() => {
  return (
    <Providers>
      <div className="relative">
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
        <Toaster />
      </div>
    </Providers>
  )
})
DefaultLayout.displayName = 'DefaultLayout'

export default DefaultLayout
