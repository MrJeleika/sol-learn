import { Position } from '@xyflow/react'
import type { NodeConfig } from '@/types/node-config'

export const stringSubstringNodeConfig = {
  label: 'SUBSTRING',
  handles: [
    { position: Position.Left, type: 'target', dataField: 'text', label: 'Text' },
    { position: Position.Left, type: 'target', dataField: 'start', label: 'Start' },
    { position: Position.Left, type: 'target', dataField: 'length', label: 'Len' },
    { position: Position.Right, type: 'source', dataField: 'text', label: 'Text', dataType: 'text' },
  ],
  actions: [],
} as const satisfies NodeConfig
