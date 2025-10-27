import { Position } from '@xyflow/react'
import type { NodeConfig } from '@/types/node-config'

export const privateKeyNodeConfig = {
  label: 'PRIVATE KEY',
  handles: [
    {
      position: Position.Right,
      type: 'source',
      dataField: 'privateKey',
      label: 'Private Key',
    },
    {
      position: Position.Right,
      type: 'source',
      dataField: 'publicKey',
      label: 'Public key',
    },
  ],
  actions: [],
} as const satisfies NodeConfig
