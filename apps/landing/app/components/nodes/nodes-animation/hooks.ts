import { useEffect, useRef, useState } from 'react'
import type { Anchors } from './utils'
import { CONNECTOR_DURATION_MS } from './constants'

export const useOnceInView = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3, root: null, rootMargin: '0px 0px -10% 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return { ref, inView }
}

export const useAnimateConnectors = (anchors: Anchors | null) => {
  const [line1, setLine1] = useState(0)
  const [line2, setLine2] = useState(0)
  const [done, setDone] = useState(false)
  useEffect(() => {
    if (!anchors || done) return
    let cancelled = false
    const animate = (setter: (p: number) => void, duration = CONNECTOR_DURATION_MS) =>
      new Promise<void>((resolve) => {
        const start = performance.now()
        const step = (t: number) => {
          if (cancelled) return
          const p = Math.min(1, (t - start) / duration)
          setter(p)
          if (p < 1) requestAnimationFrame(step)
          else resolve()
        }
        requestAnimationFrame(step)
      })
    const run = async () => {
      await animate(setLine1)
      if (cancelled) return
      await animate(setLine2)
      if (cancelled) return
      setDone(true)
    }
    run()
    return () => {
      cancelled = true
    }
  }, [anchors, done])
  return { line1, line2, done }
}
