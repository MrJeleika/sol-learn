'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '@/app/lib/utils'

export interface FlickeringGridProps {
  squareSize?: number
  gridGap?: number
  flickerChance?: number
  color?: string
  width?: number
  height?: number
  className?: string
  maxOpacity?: number
  mask?: 'none' | 'mountains'
  mountainsOptions?: {
    baseHeightRatio?: number // portion of height filled from bottom (0-1)
    peaks?: Array<{ centerRatioX: number; widthRatio: number; heightRatio: number }>
    // randomized ridge options
    noiseAmplitudeRatio?: number // amplitude relative to height (0-1)
    noiseFreq1?: number
    noiseFreq2?: number
    noiseFreq3?: number
    noiseSeed?: number
    jitterAmplitudeRatio?: number // small random per-column jitter
    // edge dithering options (adds random pixels around ridge)
    edgeBandRatio?: number // vertical band around ridge (0-1 of height)
    overEdgeMaxProb?: number // max probability to add pixels above ridge at ridge line
    underEdgeDropMaxProb?: number // max probability to drop pixels below ridge at ridge line
  }
}
export const FlickeringGrid: React.FC<FlickeringGridProps> = ({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color = 'rgb(0, 0, 0)',
  width,
  height,
  className,
  maxOpacity = 0.3,
  mask = 'none',
  mountainsOptions,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })
  const memoizedColor = useMemo(() => {
    const toRGBA = (color: string) => {
      if (typeof window === 'undefined') {
        return `rgba(0, 0, 0,`
      }
      const canvas = document.createElement('canvas')
      canvas.width = canvas.height = 1
      const ctx = canvas.getContext('2d')
      if (!ctx) return 'rgba(255, 0, 0,'
      ctx.fillStyle = color
      ctx.fillRect(0, 0, 1, 1)
      const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data)
      return `rgba(${r}, ${g}, ${b},`
    }
    return toRGBA(color)
  }, [color])
  const setupCanvas = useCallback(
    (canvas: HTMLCanvasElement, width: number, height: number) => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      const cols = Math.floor(width / (squareSize + gridGap))
      const rows = Math.floor(height / (squareSize + gridGap))
      const squares = new Float32Array(cols * rows)
      for (let i = 0; i < squares.length; i++) {
        squares[i] = Math.random() * maxOpacity
      }
      return { cols, rows, squares, dpr }
    },
    [squareSize, gridGap, maxOpacity]
  )
  const updateSquares = useCallback(
    (squares: Float32Array, deltaTime: number) => {
      for (let i = 0; i < squares.length; i++) {
        if (Math.random() < flickerChance * deltaTime) {
          squares[i] = Math.random() * maxOpacity
        }
      }
    },
    [flickerChance, maxOpacity]
  )
  const drawGrid = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      cols: number,
      rows: number,
      squares: Float32Array,
      dpr: number
    ) => {
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = 'transparent'
      ctx.fillRect(0, 0, width, height)
      // prepare mountain mask helpers (compute in CSS px space)
      const cssWidth = width / dpr
      const cssHeight = height / dpr
      const opts = mountainsOptions || {
        baseHeightRatio: 0.15,
        peaks: [
          { centerRatioX: 0.2, widthRatio: 0.3, heightRatio: 0.35 },
          { centerRatioX: 0.5, widthRatio: 0.4, heightRatio: 0.5 },
          { centerRatioX: 0.8, widthRatio: 0.25, heightRatio: 0.4 },
        ],
      }
      const noiseAmp = (opts.noiseAmplitudeRatio ?? 0) * cssHeight
      const nf1 = opts.noiseFreq1 ?? 3
      const nf2 = opts.noiseFreq2 ?? 7
      const nf3 = opts.noiseFreq3 ?? 13
      const seed = opts.noiseSeed ?? 0
      const twoPi = Math.PI * 2
      const ridgeNoise = (xCss: number) => {
        if (noiseAmp === 0) return 0
        const u = cssWidth === 0 ? 0 : xCss / cssWidth
        // simple deterministic pseudo-noise using summed sines
        const n =
          Math.sin(twoPi * nf1 * u + seed * 12.9898) * 0.5 +
          Math.sin(twoPi * nf2 * u + seed * 78.233) * 0.3 +
          Math.sin(twoPi * nf3 * u + seed * 37.719) * 0.2
        return n * noiseAmp // [-amp, amp]
      }
      const jitterAmp = (mountainsOptions?.jitterAmplitudeRatio ?? 0) * cssHeight
      const seededRand = (t: number) => {
        const s = Math.sin(t * 12.9898 + seed * 78.233) * 43758.5453
        return s - Math.floor(s)
      }
      const seededRand2d = (i: number, j: number) => {
        const s = Math.sin(i * 12.9898 + j * 78.233 + seed * 0.123) * 43758.5453
        return s - Math.floor(s)
      }
      const computeMountainTopYCss = (xCss: number) => {
        if (mask !== 'mountains') return Number.NEGATIVE_INFINITY // no clipping
        const baseFromBottom = (opts.baseHeightRatio ?? 0) * cssHeight
        let peakFromBottom = 0
        for (const p of opts.peaks ?? []) {
          const halfWidth = (p.widthRatio * cssWidth) / 2
          const dx = Math.abs(xCss - p.centerRatioX * cssWidth)
          if (dx <= halfWidth) {
            const t = 1 - dx / halfWidth // triangle falloff 1 at center -> 0 at edges
            const h = t * (p.heightRatio * cssHeight)
            if (h > peakFromBottom) peakFromBottom = h
          }
        }
        const topFromBottom = baseFromBottom + peakFromBottom
        // convert to top-origin y
        const topY = cssHeight - topFromBottom
        // apply ridge noise (subtracting raises and lowers the ridge)
        const col = Math.max(0, Math.floor(xCss / (squareSize + gridGap)))
        const jitter = jitterAmp === 0 ? 0 : (seededRand(col) * 2 - 1) * jitterAmp
        return topY - ridgeNoise(xCss) - jitter
      }
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const opacity = squares[i * rows + j]
          // mask check (evaluate in CSS px)
          const xCss = i * (squareSize + gridGap)
          const yCss = j * (squareSize + gridGap)
          const mountainTopY = computeMountainTopYCss(xCss)
          let shouldDraw = mask === 'none' || yCss >= mountainTopY
          if (mask === 'mountains') {
            // dither band around ridge for a more organic pixel edge
            const bandPx = (mountainsOptions?.edgeBandRatio ?? 0.06) * cssHeight
            const delta = yCss - mountainTopY // <0 above ridge; >0 below ridge
            const r = seededRand2d(i, j)
            if (delta < 0 && -delta <= bandPx) {
              const t = 1 - -delta / bandPx // 1 at ridge -> 0 at band top
              const p = t * (mountainsOptions?.overEdgeMaxProb ?? 0.35)
              shouldDraw = r < p
            } else if (delta >= 0 && delta <= bandPx) {
              const t = 1 - delta / bandPx // 1 at ridge -> 0 at band bottom
              const drop = t * (mountainsOptions?.underEdgeDropMaxProb ?? 0.25)
              if (r < drop) shouldDraw = false
            }
          }
          if (!shouldDraw) continue
          ctx.fillStyle = `${memoizedColor}${opacity})`
          ctx.fillRect(
            i * (squareSize + gridGap) * dpr,
            j * (squareSize + gridGap) * dpr,
            squareSize * dpr,
            squareSize * dpr
          )
        }
      }
    },
    [memoizedColor, squareSize, gridGap, mask, mountainsOptions]
  )
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let animationFrameId: number
    let gridParams: ReturnType<typeof setupCanvas>
    const updateCanvasSize = () => {
      const newWidth = width || container.clientWidth
      const newHeight = height || container.clientHeight
      setCanvasSize({ width: newWidth, height: newHeight })
      gridParams = setupCanvas(canvas, newWidth, newHeight)
    }
    updateCanvasSize()
    let lastTime = 0
    const animate = (time: number) => {
      if (!isInView) return
      const deltaTime = (time - lastTime) / 1000
      lastTime = time
      updateSquares(gridParams.squares, deltaTime)
      drawGrid(ctx, canvas.width, canvas.height, gridParams.cols, gridParams.rows, gridParams.squares, gridParams.dpr)
      animationFrameId = requestAnimationFrame(animate)
    }
    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize()
    })
    resizeObserver.observe(container)
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0 }
    )
    intersectionObserver.observe(canvas)
    if (isInView) {
      animationFrameId = requestAnimationFrame(animate)
    }
    return () => {
      cancelAnimationFrame(animationFrameId)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
    }
  }, [setupCanvas, updateSquares, drawGrid, width, height, isInView])
  return (
    <div ref={containerRef} className={cn('w-full h-full', className)}>
      <canvas
        ref={canvasRef}
        className="pointer-events-none"
        style={{
          width: canvasSize.width,
          height: canvasSize.height,
        }}
      />
    </div>
  )
}
