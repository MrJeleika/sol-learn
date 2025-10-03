import { Position } from '@xyflow/react'
import type { NodeConfig } from '@/types/node-config'

export const signNodeConfig = {
  label: 'SIGN',
  handles: [
    {
      position: Position.Left,
      type: 'target',
      dataField: 'privateKey',
      label: 'Private Key',
    },
    {
      position: Position.Left,
      type: 'target',
      dataField: 'message',
      label: 'Message',
    },
    {
      position: Position.Right,
      type: 'source',
      dataField: 'signature',
      label: 'Signature',
    },
  ],
  actions: [],
} as const satisfies NodeConfig
