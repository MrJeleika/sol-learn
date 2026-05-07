import { Copy } from '../../ui/copy'
import { cn } from '@/lib/utils'

export const UtilsNodeContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-7 w-full flex-col justify-center gap-1 px-8 text-[8px] leading-[10px]">{children}</div>
  )
}

export const UtilsNumberPreview = ({ value }: { value?: number }) => {
  return <p className="text-center text-[10px] leading-[12px] font-medium tabular-nums">{value ?? ''}</p>
}

export const UtilsBooleanPreview = ({ value }: { value?: boolean }) => {
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

export const UtilsTextPreview = ({ value }: { value?: string }) => {
  return <Copy data={value ?? ''} className="truncate text-center leading-[10px] whitespace-nowrap" />
}

export const UtilsLabelValue = ({ label, value }: { label: string; value?: string }) => {
  return (
    <div className="grid grid-cols-[42px_1fr] items-center gap-1">
      <span className="text-muted-foreground">{label}</span>
      <Copy data={value ?? ''} className="truncate text-right leading-[10px] whitespace-nowrap" />
    </div>
  )
}
