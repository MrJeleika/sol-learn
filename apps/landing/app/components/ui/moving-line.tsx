'use client'

import Link from 'next/link'
import { Marquee, MarqueeContent, MarqueeFade, MarqueeItem } from './mariquee'
import { cn } from '@/app/lib/utils'
import { FlipButton } from './flip-button'
import { MovingLineItem } from '@/app/types/moving-line'

export type MovingLineProps = {
  items: MovingLineItem[]
  speed?: number
  className?: string
  itemClassName?: string
  onHover: (item: MovingLineItem | null) => void
}

export function MovingLine({ items, speed = 40, className, itemClassName, onHover }: MovingLineProps) {
  return (
    <Marquee className={className}>
      <MarqueeFade side="left" />
      <MarqueeContent speed={speed} gradient={false} pauseOnHover autoFill>
        {items.map((item, idx) => (
          <MarqueeItem key={`${item.label}-${idx}`} className={cn('mx-4', itemClassName)}>
            <div
              aria-label={item.label}
              className="inline-block"
              onMouseLeave={() => onHover(null)}
              onMouseEnter={() => onHover(item)}
            >
              <FlipButton
                frontText={item.label}
                backText={item.label}
                className={cn('relative inline-flex rounded-full')}
                frontClassName={cn(
                  'border border-current bg-transparent text-foreground',
                  'h-12 px-8 text-base font-medium'
                )}
                frontStyle={{ color: item.color || 'var(--active-border)' }}
                backClassName={cn('text-foreground h-12 px-8 text-base font-medium')}
                backStyle={{ background: item.color || 'var(--active-border)', color: item.backTextColor }}
              />
            </div>
          </MarqueeItem>
        ))}
      </MarqueeContent>
      <MarqueeFade side="right" />
    </Marquee>
  )
}

export default MovingLine
