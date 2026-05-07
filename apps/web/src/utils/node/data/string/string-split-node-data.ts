import { Position } from '@xyflow/react'
import type { NodeConfig } from '@/types/node-config'

export const stringSplitNodeConfig = {
  label: 'SPLIT',
  handles: [
    { position: Position.Left, type: 'target', dataField: 'text', label: 'Text' },
    { position: Position.Left, type: 'target', dataField: 'separator', label: 'Sep' },
    { position: Position.Right, type: 'source', dataField: 'first', label: 'First', dataType: 'text' },
    { position: Position.Right, type: 'source', dataField: 'last', label: 'Last', dataType: 'text' },
    { position: Position.Right, type: 'source', dataField: 'count', label: 'Count', dataType: 'number' },
    { position: Position.Right, type: 'source', dataField: 'json', label: 'JSON', dataType: 'json' },
  ],
  actions: [],
} as const satisfies NodeConfig
