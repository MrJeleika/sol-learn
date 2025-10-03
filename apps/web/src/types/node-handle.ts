import type { HandleType, Position } from '@xyflow/react'

export type HandleConfig = {
  position: Position
  type: HandleType
  label?: string
  dataField: string
}
