'use client'

import { Marquee, MarqueeContent, MarqueeFade, MarqueeItem } from './mariquee'
import { cn } from '@/app/lib/utils'
import { FlipButton } from './flip-button'
import { MovingLineItem } from '@/app/types/moving-line'

export type MovingLineProps = {
  items: MovingLineItem[]
  speed?: number
  className?: string
  itemClassName?: string
}

export function MovingLine({ items, speed = 40, className, itemClassName }: MovingLineProps) {
  return (
    <div className="w-full flex relative ">
      <Marquee className={className}>
        <MarqueeFade side="left" />
        <MarqueeContent speed={speed} pauseOnHover autoFill>
          {items.map((item, idx) => (
            <MarqueeItem key={`${item.label}-${idx}`} className={cn('mx-4', itemClassName)}>
              <div aria-label={item.label} className="inline-block">
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
    </div>
  )
}

export default MovingLine
