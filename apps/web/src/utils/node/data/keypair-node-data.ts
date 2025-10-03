import { Position } from '@xyflow/react'
import type { NodeConfig } from '@/types/node-config'

export const keypairNodeConfig = {
  label: 'KEYPAIR',
  handles: [
    {
      position: Position.Left,
      type: 'target',
      dataField: 'privateKey',
    },
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
  actions: [{ position: Position.Left, label: 'Generate' }],
} as const satisfies NodeConfig
