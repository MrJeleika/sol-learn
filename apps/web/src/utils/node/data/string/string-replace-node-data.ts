import { Position } from '@xyflow/react'
import type { NodeConfig } from '@/types/node-config'

export const stringReplaceNodeConfig = {
  label: 'REPLACE',
  handles: [
    { position: Position.Left, type: 'target', dataField: 'text', label: 'Text' },
    { position: Position.Left, type: 'target', dataField: 'find', label: 'Find' },
    { position: Position.Left, type: 'target', dataField: 'replacement', label: 'Repl' },
    { position: Position.Right, type: 'source', dataField: 'text', label: 'Text', dataType: 'text' },
  ],
  actions: [],
} as const satisfies NodeConfig
