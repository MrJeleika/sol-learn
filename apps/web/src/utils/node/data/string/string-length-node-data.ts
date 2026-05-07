import { Position } from '@xyflow/react'
import type { NodeConfig } from '@/types/node-config'

export const stringLengthNodeConfig = {
  label: 'LENGTH',
  handles: [
    { position: Position.Left, type: 'target', dataField: 'text', label: 'Text' },
    { position: Position.Right, type: 'source', dataField: 'chars', label: 'Chars', dataType: 'number' },
    { position: Position.Right, type: 'source', dataField: 'bytes', label: 'Bytes', dataType: 'number' },
  ],
  actions: [],
} as const satisfies NodeConfig
