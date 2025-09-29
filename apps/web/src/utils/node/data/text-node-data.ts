import { Position } from '@xyflow/react'
import type { NodeConfig } from '@/types/node-config'

export const textNodeConfig = {
  label: 'TEXT',
  handles: [
    {
      position: Position.Left,
      type: 'target',
      dataType: 'any',
      dataField: '_in',
      label: undefined,
    },
    {
      position: Position.Right,
      type: 'source',
      dataType: 'string',
      dataField: 'text',
    },
  ],
} as const satisfies NodeConfig
