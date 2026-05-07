import { Position } from '@xyflow/react'
import type { NodeConfig } from '@/types/node-config'

export const rentExemptNodeConfig = {
  label: 'RENT EXEMPT',
  handles: [
    {
      position: Position.Left,
      type: 'target',
      dataField: 'space',
      label: 'Space',
      dataType: 'number',
      maxConnections: 1,
    },
    {
      position: Position.Left,
      type: 'target',
      dataField: 'network',
      label: 'Network',
      dataType: 'network',
      maxConnections: 1,
    },
    {
      position: Position.Right,
      type: 'source',
      dataField: 'lamports',
      label: 'Lamports',
      dataType: 'number',
    },
    {
      position: Position.Right,
      type: 'source',
      dataField: 'sol',
      label: 'SOL',
      dataType: 'uiAmount',
    },
  ],
  actions: [],
} as const satisfies NodeConfig
