import { Position } from '@xyflow/react'
import type { NodeConfig } from '@/types/node-config'

export const stringSearchNodeConfig = {
  label: 'SEARCH',
  handles: [
    { position: Position.Left, type: 'target', dataField: 'text', label: 'Text' },
    { position: Position.Left, type: 'target', dataField: 'term', label: 'Term' },
    { position: Position.Right, type: 'source', dataField: 'first', label: 'First', dataType: 'number' },
    { position: Position.Right, type: 'source', dataField: 'last', label: 'Last', dataType: 'number' },
  ],
  actions: [],
} as const satisfies NodeConfig
