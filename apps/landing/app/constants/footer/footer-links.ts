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
    href: 'https://www.loom.com/share/529e4e7cf56648a0874ee7230639fb3f',
    label: 'Pitch',
    Icon: Presentation,
  },
]

export type FooterLinkItem = (typeof FOOTER_LINKS)[number]
