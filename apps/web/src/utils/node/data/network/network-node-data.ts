import { Position } from '@xyflow/react'
import type { NodeConfig } from '@/types/node-config'

export const networkNodeConfig = {
  label: 'NETWORK',
  handles: [
    {
      position: Position.Right,
      type: 'source',
      dataField: 'network',
      dataType: 'network',
    },
  ],
  actions: [],
} as const satisfies NodeConfig
