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
}

export const getMidRight = (b: DOMRect, c: DOMRect) => ({
  x: b.left - c.left + b.width,
  y: b.top - c.top + b.height / 2,
})
export const getMidLeft = (b: DOMRect, c: DOMRect) => ({ x: b.left - c.left, y: b.top - c.top + b.height / 2 })

export const bezierFor = (from: Point, to: Point, startDir: 'right' | 'left', endDir: 'right' | 'left') => {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const off = Math.min(140, Math.abs(dx) * 0.6 + 60)
  const c1x = startDir === 'right' ? from.x + off : from.x - off
  const c1y = from.y + dy * 0.25
  const c2x = endDir === 'right' ? to.x + off : to.x - off
  const c2y = from.y + dy * 0.75
  return `M ${from.x} ${from.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${to.x} ${to.y}`
}
