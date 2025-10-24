'use client'

import { useEffect, useMemo, useRef, useState, type HTMLAttributes } from 'react'
import { cn } from '@/app/lib/utils'

export type MarqueeProps = HTMLAttributes<HTMLDivElement>
export const Marquee = ({ className, ...props }: MarqueeProps) => (
  <div className={cn('relative w-screen max-w-screen overflow-hidden', className)} {...props} />
)

export type MarqueeContentProps = {
  speed?: number
  pauseOnHover?: boolean
  autoFill?: boolean
  className?: string
  children: React.ReactNode
}

export const MarqueeContent = ({ speed = 40, pauseOnHover = true, className, children }: MarqueeContentProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const groupRef = useRef<HTMLDivElement | null>(null)
  const [groupWidth, setGroupWidth] = useState(0)
  const [dupCount, setDupCount] = useState(2)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const measure = () => {
      const cWidth = containerRef.current?.clientWidth || 0
      const gWidth = groupRef.current?.scrollWidth || 0
      if (gWidth === 0 || cWidth === 0) return
      setGroupWidth(gWidth)
      const needed = Math.max(2, Math.ceil((cWidth * 2) / gWidth))
      setDupCount(Math.min(needed, 20))
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (containerRef.current) ro.observe(containerRef.current)
    if (groupRef.current) ro.observe(groupRef.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  const durationSec = useMemo(() => {
    if (!groupWidth) return 10
    return Math.max(4, groupWidth / speed)
  }, [groupWidth, speed])

  const trackStyle: React.CSSProperties = {
    ['--marquee-distance' as string]: `${groupWidth}px`,
    animation: `marquee ${durationSec}s linear infinite`,
    animationPlayState: paused ? 'paused' : 'running',
  }

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full overflow-hidden', className)}
      onMouseEnter={pauseOnHover ? () => setPaused(true) : undefined}
      onMouseLeave={pauseOnHover ? () => setPaused(false) : undefined}
    >
      <div className="whitespace-nowrap will-change-transform" style={trackStyle}>
        {Array.from({ length: dupCount }).map((_, i) => (
          <div key={i} ref={i === 0 ? groupRef : undefined} className="inline-block">
            {children}
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          to {
            transform: translateX(calc(-1 * var(--marquee-distance)));
          }
        }
      `}</style>
    </div>
  )
}

export type MarqueeFadeProps = HTMLAttributes<HTMLDivElement> & {
  side: 'left' | 'right'
}
export const MarqueeFade = ({ className, side, ...props }: MarqueeFadeProps) => (
  <div
    className={cn(
      'pointer-events-none absolute top-0 bottom-0 z-10 h-full w-24 from-background to-transparent',
      side === 'left' ? 'left-0 bg-linear-to-r' : 'right-0 bg-linear-to-l',
      className
    )}
    {...props}
  />
)

export type MarqueeItemProps = HTMLAttributes<HTMLDivElement>
export const MarqueeItem = ({ className, ...props }: MarqueeItemProps) => (
  <div className={cn('mx-2 inline-block shrink-0 whitespace-nowrap', className)} {...props} />
)
