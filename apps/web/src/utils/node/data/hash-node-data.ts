import { Position } from '@xyflow/react'
import type { NodeConfig } from '@/types/node-config'

export const hashNodeConfig = {
  label: 'HASH',
  handles: [
    {
      position: Position.Left,
      type: 'target',
      dataField: 'input',
    },
    {
      position: Position.Right,
      type: 'source',
      dataField: 'hash',
    },
  ],
  actions: [],
} as const satisfies NodeConfig
