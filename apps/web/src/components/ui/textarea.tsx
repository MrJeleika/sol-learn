import * as React from 'react'

import { cn } from '@/lib/utils'

function Textarea({
  className,
  color,
  onKeyDown,
  onKeyUp,
  ...props
}: React.ComponentProps<'textarea'> & { color: string }) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.stopPropagation()
    onKeyDown?.(e)
  }

  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.stopPropagation()
    onKeyUp?.(e)
  }

  return (
    <textarea
      style={
        {
          '--primary': color,
        } as React.CSSProperties
      }
      data-slot="textarea"
      className={cn(
        'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-[8px] leading-[12px] shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 resize-none',
        'focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className
      )}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      {...props}
    />
  )
}

export { Textarea }
