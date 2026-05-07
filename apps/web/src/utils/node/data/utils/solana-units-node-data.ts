import { Position } from '@xyflow/react'
import type { NodeConfig } from '@/types/node-config'

export const solToLamportsNodeConfig = {
  label: 'SOL TO LAMPORTS',
  handles: [
    {
      position: Position.Left,
      type: 'target',
      dataField: 'sol',
      label: 'SOL',
      dataType: 'number',
      maxConnections: 1,
    },
    {
      position: Position.Right,
      type: 'source',
      dataField: 'lamports',
      label: 'Lamports',
      dataType: 'number',
    },
  ],
  actions: [],
} as const satisfies NodeConfig

export const lamportsToSolNodeConfig = {
  label: 'LAMPORTS TO SOL',
  handles: [
    {
      position: Position.Left,
      type: 'target',
      dataField: 'lamports',
      label: 'Lamports',
      dataType: 'number',
      maxConnections: 1,
    },
    {
      position: Position.Right,
      type: 'source',
      dataField: 'sol',
      label: 'SOL',
      dataType: 'number',
    },
  ],
  actions: [],
} as const satisfies NodeConfig
