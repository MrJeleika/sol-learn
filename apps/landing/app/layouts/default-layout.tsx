import { ReactNode } from 'react'
import { Header } from '../components/header/header'

interface DefaultLayoutProps {
  children: ReactNode
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="relative min-h-screen pt-[96px] w-full">
      <Header />
      {children}
    </div>
  )
}
