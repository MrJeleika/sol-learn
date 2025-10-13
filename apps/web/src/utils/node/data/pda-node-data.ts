import { Position } from '@xyflow/react'
import type { NodeConfig } from '@/types/node-config'

export const pdaNodeConfig = {
  label: 'PDA',
  handles: [
    { position: Position.Left, type: 'target', dataField: 'programId', label: 'Program ID' },
    { position: Position.Left, type: 'target', dataField: 'seed#0', label: 'Seed 1' },
    { position: Position.Right, type: 'source', dataField: 'pda', label: 'PDA' },
  ],
  actions: [],
} as const satisfies NodeConfig
