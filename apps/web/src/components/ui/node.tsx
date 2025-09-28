import type { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  className?: string
}

export const Node = () => {
  return <div className={cn('p-2', className)}>{children}</div>
}
