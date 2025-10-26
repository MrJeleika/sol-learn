import { Position } from '@xyflow/react'
import type { NodeConfig } from '@/types/node-config'

export const textNodeConfig = {
  label: 'TEXT',
  handles: [
    {
      position: Position.Right,
      type: 'source',
      dataField: 'text',
    },
  ],
  actions: [],
} as const satisfies NodeConfig
