import { Position } from '@xyflow/react'
import type { NodeConfig } from '@/types/node-config'

export const networkNodeConfig = {
  label: 'NETWORK',
  handles: [
    {
      position: Position.Right,
      type: 'source',
      dataType: 'string',
      dataField: 'network',
    },
  ],
  actions: [],
} as const satisfies NodeConfig
