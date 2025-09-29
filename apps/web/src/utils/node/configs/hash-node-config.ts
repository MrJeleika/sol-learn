import { Position } from '@xyflow/react'
import type { NodeConfig } from '@/types/nodes/config'

export const hashNodeConfig: NodeConfig = {
  label: 'HASH',
  handles: [
    {
      position: Position.Left,
      type: 'target',
      label: 'string',
    },
    {
      position: Position.Right,
      type: 'source',
      label: 'hash',
    },
  ],
}
