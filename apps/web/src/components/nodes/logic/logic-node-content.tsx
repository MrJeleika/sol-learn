import { cn } from '@/lib/utils'
import { toText } from '@/utils/string/string-node.utils'

export const LogicNodeContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-7 w-full flex-col justify-center gap-1 px-8 text-[8px] leading-[10px]">{children}</div>
  )
}

export const LogicResult = ({ value }: { value?: boolean }) => {
  return (
    <p
      className={cn(
        'text-center text-[10px] leading-[12px] font-medium tabular-nums',
        value === true && 'text-green-500',
        value === false && 'text-red-500'
      )}
    >
      {value === undefined ? '' : String(value)}
    </p>
  )
}

export const LogicPreview = ({ label, value }: { label: string; value: unknown }) => {
  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-1">
      <span className="text-muted-foreground">{label}</span>
      <span className="min-w-0 truncate text-right">{value === undefined ? '' : toText(value)}</span>
    </div>
  )
}
