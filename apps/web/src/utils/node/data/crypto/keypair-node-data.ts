import { Position } from '@xyflow/react'
import type { NodeConfig } from '@/types/node-config'

export const keypairNodeConfig = {
  label: 'KEYPAIR',
  handles: [
    {
      position: Position.Right,
      type: 'source',
      dataField: 'privateKey',
      label: 'Private Key',
      dataType: 'privateKey',
    },
    {
      position: Position.Right,
      type: 'source',
      dataField: 'publicKey',
      label: 'Public key',
      dataType: 'publicKey',
    },
  ],
  actions: [{ position: Position.Left, label: 'Generate' }],
} as const satisfies NodeConfig
