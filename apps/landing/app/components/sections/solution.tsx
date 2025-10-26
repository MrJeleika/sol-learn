'use client'
import { useEffect, useRef, useState } from 'react'
import { SolutionTitle } from '@/app/components/solution/solution-title'
import { SectionCard } from '../about/section-card'
import { SOLUTION_CARDS } from '@/app/constants/solution/solution-cards'
import { FlickeringGrid } from '../ui/bg-grid'

export function Solution() {
  const [bottomVisible, setBottomVisible] = useState(false)
  const bottomSentinelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = bottomSentinelRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => setBottomVisible(true))
        } else {
          requestAnimationFrame(() => setBottomVisible(false))
        }
      },
      { threshold: 0, rootMargin: '0px 0px -1px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="bg-primary-2 min-h-screen relative text-foreground">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60vh] z-0">
        <FlickeringGrid
          className="absolute inset-0"
          squareSize={10}
          gridGap={6}
          color="#FFF"
          maxOpacity={0.1}
          flickerChance={1}
          mask="mountains"
          mountainsOptions={{
            baseHeightRatio: 0.12,
            peaks: [
              { centerRatioX: 0.18, widthRatio: 0.3, heightRatio: 0.18 },
              { centerRatioX: 0.5, widthRatio: 0.45, heightRatio: 0.35 },
              { centerRatioX: 0.82, widthRatio: 0.28, heightRatio: 0.22 },
            ],
            noiseAmplitudeRatio: 0.05,
            noiseFreq1: 2,
            noiseFreq2: 5,
            noiseFreq3: 9,
            noiseSeed: 42,
            jitterAmplitudeRatio: 0.015,
            edgeBandRatio: 0.08,
            overEdgeMaxProb: 0.45,
            underEdgeDropMaxProb: 0.35,
          }}
        />
      </div>
      <SolutionTitle bottomVisible={bottomVisible} />
      <div className="sm:px-12 px-6 pb-24 pt-24">
        <div className="relative mx-auto max-w-screen-2xl z-10" style={{ height: `${SOLUTION_CARDS.length * 70}vh` }}>
          {SOLUTION_CARDS.map((card, i) => (
            <div
              key={card.title}
              className="sticky top-24 flex items-center justify-center h-[70vh]"
              style={{ zIndex: i, transform: `translateY(${i * 12}px)` }}
            >
              <div className="w-full rounded-[24px] border border-border bg-background shadow-[0_10px_40px_rgba(0,0,0,0.25)] p-8">
                <div className="flex items-start justify-between">
                  <span className="text-sm opacity-60">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="mt-4">
                  <SectionCard title={card.title} description={card.description} icon={card.icon} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div ref={bottomSentinelRef} className="absolute bottom-0 left-0 h-px w-px" />
    </section>
  )
}
