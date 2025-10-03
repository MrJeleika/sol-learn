import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, color, ...props }: React.ComponentProps<'input'> & { color: string }) {
  return (
    <input
      type={type}
      style={
        {
          '--primary': color,
        } as React.CSSProperties
      }
      data-slot="input"
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-5 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-[8px] leading-[9px] shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        'focus-visible:border-primary',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className
      )}
      {...props}
    />
  )
}

export { Input }
