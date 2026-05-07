const FALSE_TEXT_VALUES = new Set(['false', '0', 'no', 'off', 'null', 'undefined'])
const TRUE_TEXT_VALUES = new Set(['true', '1', 'yes', 'on'])

export const toFiniteNumber = (value: unknown) => {
  const number = Number(value)
  return Number.isFinite(number) ? number : undefined
}

export const toLogicBoolean = (value: unknown): boolean | undefined => {
  if (value === undefined || value === null) return undefined
  if (typeof value === 'boolean') return value
  if (typeof value === 'number') return Number.isFinite(value) ? value !== 0 : undefined
  if (typeof value === 'bigint') return value !== 0n

  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase()
    if (!normalized) return false
    if (FALSE_TEXT_VALUES.has(normalized)) return false
    if (TRUE_TEXT_VALUES.has(normalized)) return true
    return true
  }

  if (value instanceof Uint8Array) return value.length > 0
  if (Array.isArray(value)) return value.length > 0

  return true
}

export const hasConcreteValue = (value: unknown) => {
  if (value === undefined || value === null) return false
  if (typeof value === 'string') return value.trim().length > 0
  if (value instanceof Uint8Array) return value.length > 0
  if (Array.isArray(value)) return value.length > 0
  return true
}

const normalizeForCompare = (value: unknown, seen: WeakSet<object>): unknown => {
  if (value === undefined || value === null) return ''
  if (typeof value === 'string') return value.trim()
  if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') return String(value)
  if (value instanceof Uint8Array) return Array.from(value)
  if (Array.isArray(value)) return value.map((item) => normalizeForCompare(item, seen))

  if (typeof value === 'object') {
    const valueWithBase58 = value as { toBase58?: () => string }
    if (typeof valueWithBase58.toBase58 === 'function') return valueWithBase58.toBase58()

    const valueWithJson = value as { toJSON?: () => unknown }
    if (typeof valueWithJson.toJSON === 'function') return normalizeForCompare(valueWithJson.toJSON(), seen)

    if (seen.has(value)) return '[Circular]'
    seen.add(value)

    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, item]) => [key, normalizeForCompare(item, seen)])
    )
  }

  return String(value)
}

export const toComparableText = (value: unknown) => {
  const normalized = normalizeForCompare(value, new WeakSet())
  return typeof normalized === 'string' ? normalized : JSON.stringify(normalized)
}
