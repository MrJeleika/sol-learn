import { ReactNode } from 'react'
import { Header } from '../components/header/header'
import { LoadOverlay } from '../components/ui/load-overlay'

interface DefaultLayoutProps {
  children: ReactNode
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="relative min-h-screen  w-full">
      <Header />
      {children}
      <LoadOverlay />
    </div>
  )
}
