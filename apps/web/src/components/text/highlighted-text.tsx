import type { ReactNode } from 'react'

export const HighlightedText = ({ children }: { children: ReactNode }) => {
  return <span className="font-mono bg-border px-0.5">{children}</span>
}
