'use client'

import { forwardRef } from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, children, ...props },
  ref
) {
  const baseClasses =
    'inline-flex w-max hover:bg-primary-2 hover:text-foreground text-[28px] h-[60px] cursor-pointer items-center justify-center rounded-sm bg-background text-primary px-6 py-2 text-sm font-medium outline-none transition-all disabled:pointer-events-none disabled:opacity-50'

  return (
    <button ref={ref} className={`${baseClasses}${className ? ` ${className}` : ''}`} {...props}>
      {children}
    </button>
  )
})
