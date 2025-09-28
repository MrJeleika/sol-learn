import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function lazyWithRetry(dynamicImportFn: () => any) {
  return lazy(() =>
    dynamicImportFn().catch((error: unknown) => {
      // Trigger a hard reload once, then rethrow so React.lazy does not get undefined
      if (typeof window !== 'undefined') {
        window.location.reload()
      }
      throw error
    })
  )
}

export const routes = {
  root: '/',
} as const

export const router = createBrowserRouter([
  {
    path: routes.root,
    Component: lazyWithRetry(() => import('@/layouts/default-layout')),
    children: [
      {
        path: routes.root,
        Component: lazyWithRetry(() => import('@/pages/home')),
      },
      {
        path: '*',
        Component: lazyWithRetry(() => import('@/pages/home')),
      },
    ],
  },
])
