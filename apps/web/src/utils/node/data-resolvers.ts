import type { DataTypeId } from '@/types/node-handle'

export type DataResolver<T = unknown> = (value: unknown) => T

const primitiveResolvers: Record<string, DataResolver<unknown>> = {
  string: (v: unknown) => (typeof v === 'string' ? v : v == null ? '' : String(v)),
  number: (v: unknown) => (typeof v === 'number' ? v : Number(v)),
  boolean: (v: unknown) => (typeof v === 'boolean' ? v : Boolean(v)),
  any: (v: unknown) => v,
}

export function registerPrimitiveResolver<T = unknown>(type: string, resolver: DataResolver<T>) {
  primitiveResolvers[type] = resolver as DataResolver<unknown>
}

export function resolveByType<T = unknown>(dataType: DataTypeId | undefined, value: unknown): T | undefined {
  if (!dataType) return value as T
  if (typeof dataType === 'string') {
    const r = primitiveResolvers[dataType]
    return r ? (r(value) as T) : (value as T)
  }
  // json-with-schema: return value as-is; caller may validate elsewhere
  if (typeof dataType === 'object' && dataType.kind === 'json') {
    return value as T
  }
  return value as T
}

export function toStringByType(value: unknown, dataType?: DataTypeId): string {
  if (typeof dataType === 'string') {
    if (dataType === 'string') return primitiveResolvers.string(value)
    if (dataType === 'number') return String(primitiveResolvers.number(value))
    if (dataType === 'boolean') return String(primitiveResolvers.boolean(value))
    return String(value ?? '')
  }
  if (typeof dataType === 'object' && dataType.kind === 'json') {
    try {
      return JSON.stringify(value ?? '')
    } catch {
      return String(value ?? '')
    }
  }
  return String(value ?? '')
}
