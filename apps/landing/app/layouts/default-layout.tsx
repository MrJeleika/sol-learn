import { ReactNode } from 'react'
import { Header } from '../components/header/header'
import { LoadOverlay } from '../components/ui/load-overlay'
import { Footer } from '../components/footer/footer'
import { ScrollReset } from '../components/scroll-reset'

interface DefaultLayoutProps {
  children: ReactNode
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="relative min-h-screen  w-full">
      <Header />
      {children}
      <LoadOverlay />
      <Footer />
      <ScrollReset />
    </div>
  )
}
