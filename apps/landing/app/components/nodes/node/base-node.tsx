'use client'

import { cn } from '@/app/lib/utils'
import type { PropsWithChildren, ReactNode } from 'react'

interface BaseNodeProps extends PropsWithChildren {
  label: string
  color: string
  width?: number
  height?: number
  icon?: ReactNode
  className?: string
  isHovered?: boolean
}

const DEFAULT_WIDTH = 200
const DEFAULT_HEIGHT = 100

export const BaseNode = ({
  label,
  color,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  icon,
  className,
  children,
  isHovered,
}: BaseNodeProps) => {
  return (
    <div style={{ width }} className={cn('relative rounded-[8px] text-foreground')}>
      <div
        style={{ height }}
        className={cn(
          'relative z-20',
          'p-3 rounded-[8px] transition-all bg-background border-border border',
          'flex items-center justify-center',
          className,
          isHovered && 'border-active-border bg-border shadow-lg shadow-current'
        )}
      >
        {children}
      </div>

      <div
        style={{ backgroundColor: color }}
        className={cn(
          'absolute z-10 top-0 flex items-end justify-center left-0 h-[calc(100%+26px)] w-full border-border border rounded-[8px]',
          isHovered && 'border-active-border'
        )}
      >
        <div className="flex items-center gap-2">
          {icon}
          <p className="uppercase text-lg font-bold">{label}</p>
        </div>
      </div>
    </div>
  )
}
