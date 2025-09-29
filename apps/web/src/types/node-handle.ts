import type { HandleType, Position } from '@xyflow/react'

export type DataTypeId = 'string' | 'number' | 'boolean' | { kind: 'json'; schemaId?: string } | 'any'

export type HandleConfig = {
  position: Position
  type: HandleType
  label?: string
  dataField: string // required: where to read from node.data
  dataType: DataTypeId // required: runtime type id for validation
}
