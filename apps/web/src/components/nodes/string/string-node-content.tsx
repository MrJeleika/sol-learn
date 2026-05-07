import type { PropsWithChildren } from 'react'
import { cn } from '@/lib/utils'
import { Copy } from '../../ui/copy'

interface StringNodeContentProps extends PropsWithChildren {
  className?: string
}

export const StringNodeContent = ({ children, className }: StringNodeContentProps) => {
  return (
    <div className={cn('flex min-h-7 w-full flex-col justify-center gap-1 px-8 text-[8px] leading-[10px]', className)}>
      {children}
    </div>
  )
}

export const StringNodePreview = ({ value }: { value: string }) => {
  return <Copy data={value} className="truncate text-center leading-[10px] whitespace-nowrap" />
}

export const StringNodeRows = ({ rows }: { rows: Array<[string, string | number]> }) => {
  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-1 gap-y-0.5 tabular-nums">
      {rows.map(([label, value]) => (
        <div key={label} className="contents">
          <dt className="text-muted-foreground">{label}</dt>
          <dd className="min-w-0 truncate text-right">{value}</dd>
        </div>
      ))}
    </dl>
  )
}
