import type { SVGProps, ElementType, ReactNode } from 'react'
import { cn } from '@/app/lib/utils'

interface FooterLinkProps {
  href: string
  label: string
  Icon: ElementType | ((props: SVGProps<SVGSVGElement>) => ReactNode)
  className?: string
  iconClassName?: string
}

export function FooterLink({ href, label, Icon, className, iconClassName }: FooterLinkProps) {
  return (
    <a
      href={href}
      className={cn('group flex items-center gap-2 hover:text-primary transition-colors duration-300', className)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon
        className={cn(
          'w-12 h-12 transition-[fill,color,stroke] duration-300',
          '[&>*]:transition-[fill,stroke,color] [&>*]:duration-300 [&>path]:transition-[fill,stroke] [&>path]:duration-300',
          iconClassName
        )}
      />
      <p className="text-lg">{label}</p>
    </a>
  )
}

export default FooterLink
