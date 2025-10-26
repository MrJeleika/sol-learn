import { memo, Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'

import { router } from '@/router'
import { PageLoader } from '@/components/ui/page-loader'

export const LazyRouterProvider = memo(() => {
  return (
    <Suspense fallback={<PageLoader />}>
      <RouterProvider router={router} />
    </Suspense>
  )
})
LazyRouterProvider.displayName = 'LazyRouterProvider'
