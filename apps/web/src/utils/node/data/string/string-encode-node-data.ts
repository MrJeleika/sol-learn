import { Position } from '@xyflow/react'
import type { NodeConfig } from '@/types/node-config'

export const stringEncodeNodeConfig = {
  label: 'ENCODE',
  handles: [
    { position: Position.Left, type: 'target', dataField: 'input', label: 'Input' },
    { position: Position.Right, type: 'source', dataField: 'text', label: 'Text', dataType: 'text' },
  ],
  actions: [],
} as const satisfies NodeConfig
