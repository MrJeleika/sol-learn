import { Position } from '@xyflow/react'
import type { NodeConfig } from '@/types/node-config'

export const transactionNodeConfig = {
  label: 'TRANSACTION',
  handles: [
    { position: Position.Left, type: 'target', dataField: 'privateKey', label: 'Private Key', dataType: 'privateKey' },
    { position: Position.Left, type: 'target', dataField: 'network', label: 'Network', dataType: 'network' },
    {
      position: Position.Left,
      type: 'target',
      dataField: 'transaction',
      label: 'Transaction',
      dataType: 'transaction',
    },
    { position: Position.Right, type: 'source', dataField: 'signature', label: 'Signature', dataType: 'signature' },
  ],
  actions: [{ position: Position.Left, label: 'Send' }],
} as const satisfies NodeConfig
