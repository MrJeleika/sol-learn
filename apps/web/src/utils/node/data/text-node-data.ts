import { Position } from '@xyflow/react'
import type { NodeConfig } from '@/types/node-config'

export const textNodeConfig = {
  label: 'TEXT',
  handles: [
    {
      position: Position.Left,
      type: 'target',
      dataField: '_in',
      label: undefined,
    },
    {
      position: Position.Right,
      type: 'source',
      dataField: 'text',
    },
  ],
  actions: [],
} as const satisfies NodeConfig
