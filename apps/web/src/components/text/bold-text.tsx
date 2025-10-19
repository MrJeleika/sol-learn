import type { ReactNode } from 'react'

type Props = {
  children: ReactNode | string
}

export const BoldText = ({ children }: Props) => {
  return <span className="font-semibold">{children}</span>
}
