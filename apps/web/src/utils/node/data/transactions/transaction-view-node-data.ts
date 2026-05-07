import { Position } from '@xyflow/react'
import type { NodeConfig } from '@/types/node-config'

export const transactionViewNodeConfig = {
  label: 'TRANSACTION VIEW',
  handles: [
    { position: Position.Left, type: 'target', dataField: 'signature', label: 'Signature', dataType: 'signature' },
    { position: Position.Left, type: 'target', dataField: 'network', label: 'Network', dataType: 'network' },
    {
      position: Position.Right,
      type: 'source',
      dataField: 'transactionJson',
      label: 'Transaction JSON',
      dataType: 'json',
    },
    { position: Position.Right, type: 'source', dataField: 'slot', label: 'Slot', dataType: 'number' },
    { position: Position.Right, type: 'source', dataField: 'blockTime', label: 'Block Time', dataType: 'number' },
  ],
  actions: [{ position: Position.Left, label: 'Refresh' }],
} as const satisfies NodeConfig
