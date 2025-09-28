import { Suspense, memo } from 'react'
import { Outlet } from 'react-router-dom'

import Providers from '@/providers/Providers'

const DefaultLayout = memo(() => {
  return (
    <Providers>
      <div className="font-quicksand relative">
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </div>
    </Providers>
  )
})
DefaultLayout.displayName = 'DefaultLayout'

export default DefaultLayout
