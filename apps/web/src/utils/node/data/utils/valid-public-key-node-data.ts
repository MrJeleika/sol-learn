import { Position } from '@xyflow/react'
import type { NodeConfig } from '@/types/node-config'

export const validPublicKeyNodeConfig = {
  label: 'VALID PUBLIC KEY',
  handles: [
    {
      position: Position.Left,
      type: 'target',
      dataField: 'value',
      label: 'Value',
      maxConnections: 1,
    },
    {
      position: Position.Right,
      type: 'source',
      dataField: 'publicKey',
      label: 'Public Key',
      dataType: 'publicKey',
    },
    {
      position: Position.Right,
      type: 'source',
      dataField: 'isValid',
      label: 'Valid',
      dataType: 'boolean',
    },
  ],
  actions: [],
} as const satisfies NodeConfig
