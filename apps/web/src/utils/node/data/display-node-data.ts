import { Position } from '@xyflow/react'
import type { NodeConfig } from '@/types/node-config'

export const displayNodeConfig = {
  label: 'DISPLAY',
  handles: [
    {
      position: Position.Left,
      type: 'target',
      dataField: 'input',
    },
    {
      position: Position.Right,
      type: 'source',
      dataField: 'text',
    },
  ],
  actions: [],
} as const satisfies NodeConfig
