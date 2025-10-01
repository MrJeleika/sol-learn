import { Position } from '@xyflow/react'
import type { NodeConfig } from '@/types/node-config'

export const displayNodeConfig = {
  label: 'DISPLAY',
  handles: [
    {
      position: Position.Left,
      type: 'target',
      dataType: 'string',
      dataField: 'input',
    },
    {
      position: Position.Right,
      type: 'source',
      dataType: 'string',
      dataField: 'text',
    },
  ],
  actions: [],
} as const satisfies NodeConfig
