export const sha256Hex = async (text: string) => {
  const enc = new TextEncoder()
  const data = enc.encode(text)
  const buffer = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength) as ArrayBuffer
  const buf = await crypto.subtle.digest('SHA-256', buffer)
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export type Point = { x: number; y: number }
export type Anchors = {
  width: number
  height: number
  textRight: Point
  hashLeft: Point
  hashRight: Point
  displayLeft: Point
  // mobile vertical anchors
  textBottom?: Point
  hashTop?: Point
  hashBottom?: Point
  displayTop?: Point
}

export const getMidRight = (b: DOMRect, c: DOMRect) => ({
  x: b.left - c.left + b.width,
  y: b.top - c.top + b.height / 2,
})
export const getMidLeft = (b: DOMRect, c: DOMRect) => ({ x: b.left - c.left, y: b.top - c.top + b.height / 2 })

const TOP_OFFSET = 4
const BOTTOM_OFFSET = 14

export const getMidTop = (b: DOMRect, c: DOMRect) => ({
  x: b.left - c.left + b.width / 2,
  y: b.top - c.top - TOP_OFFSET,
})
export const getMidBottom = (b: DOMRect, c: DOMRect) => ({
  x: b.left - c.left + b.width / 2,
  y: b.top - c.top + b.height + BOTTOM_OFFSET,
})

export const bezierFor = (
  from: Point,
  to: Point,
  startDir: 'right' | 'left' | 'top' | 'bottom',
  endDir: 'right' | 'left' | 'top' | 'bottom'
) => {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const offX = Math.min(140, Math.abs(dx) * 0.6 + 60)
  const offY = Math.min(140, Math.abs(dy) * 0.6 + 60)
  const c1x = startDir === 'right' ? from.x + offX : startDir === 'left' ? from.x - offX : from.x
  const c1y = startDir === 'bottom' ? from.y + offY : startDir === 'top' ? from.y - offY : from.y + dy * 0.25
  const c2x = endDir === 'right' ? to.x + offX : endDir === 'left' ? to.x - offX : to.x
  const c2y = endDir === 'bottom' ? to.y + offY : endDir === 'top' ? to.y - offY : from.y + dy * 0.75
  return `M ${from.x} ${from.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${to.x} ${to.y}`
}
