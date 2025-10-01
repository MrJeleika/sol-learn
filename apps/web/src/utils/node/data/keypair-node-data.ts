import { Position } from '@xyflow/react'
import type { NodeConfig } from '@/types/node-config'

export const keypairNodeConfig = {
  label: 'KEYPAIR',
  handles: [
    {
      position: Position.Left,
      type: 'target',
      dataType: 'string',
      dataField: 'privateKey',
    },
    {
      position: Position.Right,
      type: 'source',
      dataType: 'string',
      dataField: 'privateKey',
      label: 'Private Key',
    },
    {
      position: Position.Right,
      type: 'source',
      dataType: 'string',
      dataField: 'address',
      label: 'Address',
    },
  ],
  actions: [{ position: Position.Left, label: 'Generate' }],
} as const satisfies NodeConfig
