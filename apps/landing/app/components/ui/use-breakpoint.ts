'use client'
import { useEffect, useState } from 'react'

const queries: Record<string, string> = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
}

export function useBreakpoint(bp: keyof typeof queries) {
  const query = queries[bp]
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const mql = window.matchMedia(query)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    setMatches(mql.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [query])

  return matches
}
