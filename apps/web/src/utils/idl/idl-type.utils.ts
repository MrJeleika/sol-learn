import type { IdlType } from '@/types/nodes/idl-node'

export const getIdlTypeString = (type: IdlType): string => {
  if (typeof type === 'string') {
    return type
  }
  if ('vec' in type) {
    return `vec<${getIdlTypeString(type.vec)}>`
  }
  if ('option' in type) {
    return `option<${getIdlTypeString(type.option)}>`
  }
  if ('defined' in type) {
    return type.defined
  }
  if ('array' in type) {
    return `[${getIdlTypeString(type.array[0])};${type.array[1]}]`
  }
  return 'unknown'
}
