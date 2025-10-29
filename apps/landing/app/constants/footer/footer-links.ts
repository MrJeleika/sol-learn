import { Github, Presentation, Send } from 'lucide-react'
import { XLogo } from '@/app/components/ui/icons/X'

export const FOOTER_LINKS = [
  {
    href: 'https://github.com/MrJeleika/sol-learn',
    label: 'GitHub',
    Icon: Github,
  },
  {
    href: 'https://x.com/solana_learn',
    label: 'X',
    Icon: XLogo,
    iconClassName: '[&>path]:fill-foreground',
    className: 'hover:[&_path]:fill-primary',
  },
  {
    href: 'https://t.me/MrJeleika',
    label: 'Telegram',
    Icon: Send,
  },
  {
    href: 'https://pitchdeck.hypermatic.com/slides/mhani8fg33481/?token=aDI2WCVHUUBLbkBxcDU%3D&g=8&t=g',
    label: 'Pitch Deck',
    Icon: Presentation,
  },
]

export type FooterLinkItem = (typeof FOOTER_LINKS)[number]
