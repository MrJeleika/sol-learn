import { Toaster as Sonner, type ToasterProps } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group text-foreground border-border"
      style={
        {
          '--normal-bg': 'var(--popover)',
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
