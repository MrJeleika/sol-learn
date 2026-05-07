import { Position } from '@xyflow/react'
import type { NodeConfig } from '@/types/node-config'

export const stringCombineNodeConfig = {
  label: 'COMBINE',
  handles: [
    { position: Position.Left, type: 'target', dataField: 'a', label: 'A' },
    { position: Position.Left, type: 'target', dataField: 'b', label: 'B' },
    { position: Position.Left, type: 'target', dataField: 'c', label: 'C' },
    { position: Position.Right, type: 'source', dataField: 'text', label: 'Text', dataType: 'text' },
  ],
  actions: [],
} as const satisfies NodeConfig
