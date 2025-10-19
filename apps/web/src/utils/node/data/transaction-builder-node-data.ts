import { Position } from '@xyflow/react'
import type { NodeConfig } from '@/types/node-config'

export const transactionBuilderNodeConfig = {
  label: 'TX BUILDER',
  handles: [
    {
      position: Position.Right,
      type: 'source',
      dataField: 'transaction',
      label: 'Transaction',
      dataType: 'transaction',
    },
  ],
  actions: [],
} as const satisfies NodeConfig
