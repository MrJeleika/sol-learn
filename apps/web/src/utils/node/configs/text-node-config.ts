import { Position } from '@xyflow/react'
import type { NodeConfig } from '@/types/nodes/config'

export const textNodeConfig: NodeConfig = {
  label: 'TEXT',
  handles: [
    {
      position: Position.Left,
      type: 'target',
    },
    {
      position: Position.Right,
      type: 'source',
    },
  ],
}
