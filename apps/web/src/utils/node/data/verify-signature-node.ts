import { Position } from '@xyflow/react'
import type { NodeConfig } from '@/types/node-config'

export const verifySignatureNodeConfig = {
  label: 'VERIFY SIGNATURE',
  handles: [
    {
      position: Position.Left,
      type: 'target',
      dataField: 'message',
      label: 'Message',
    },
    {
      position: Position.Left,
      type: 'target',
      dataField: 'signature',
      label: 'Signature',
      dataType: 'signature',
    },
    {
      position: Position.Left,
      type: 'target',
      dataField: 'publicKey',
      label: 'Public key',
      dataType: 'publicKey',
    },
  ],
  actions: [],
} as const satisfies NodeConfig
