import { Position } from '@xyflow/react'
import type { NodeConfig } from '@/types/node-config'

export const hashNodeConfig = {
  label: 'HASH',
  handles: [
    {
      position: Position.Left,
      type: 'target',
      label: 'string',
      dataType: 'string',
      dataField: 'input',
    },
    {
      position: Position.Right,
      type: 'source',
      label: 'hash',
      dataType: 'string',
      dataField: 'hash',
    },
  ],
} as const satisfies NodeConfig
