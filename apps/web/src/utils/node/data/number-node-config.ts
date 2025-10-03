import { Position } from '@xyflow/react'
import type { NodeConfig } from '@/types/node-config'

export const numberNodeConfig = {
  label: 'NUMBER',
  handles: [
    {
      position: Position.Right,
      type: 'source',
      dataField: 'number',
    },
  ],
  actions: [],
} as const satisfies NodeConfig
