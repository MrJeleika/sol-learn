import { Position } from '@xyflow/react'
import type { NodeConfig } from '@/types/node-config'

export const tokenAmountToRawNodeConfig = {
  label: 'TOKEN TO RAW',
  handles: [
    {
      position: Position.Left,
      type: 'target',
      dataField: 'amount',
      label: 'Amount',
      dataType: 'uiAmount',
      maxConnections: 1,
    },
    {
      position: Position.Left,
      type: 'target',
      dataField: 'decimals',
      label: 'Decimals',
      dataType: 'decimals',
      maxConnections: 1,
    },
    {
      position: Position.Right,
      type: 'source',
      dataField: 'rawAmount',
      label: 'Raw',
      dataType: 'number',
    },
  ],
  actions: [],
} as const satisfies NodeConfig

export const rawToTokenAmountNodeConfig = {
  label: 'RAW TO TOKEN',
  handles: [
    {
      position: Position.Left,
      type: 'target',
      dataField: 'rawAmount',
      label: 'Raw',
      dataType: 'number',
      maxConnections: 1,
    },
    {
      position: Position.Left,
      type: 'target',
      dataField: 'decimals',
      label: 'Decimals',
      dataType: 'decimals',
      maxConnections: 1,
    },
    {
      position: Position.Right,
      type: 'source',
      dataField: 'amount',
      label: 'Amount',
      dataType: 'uiAmount',
    },
  ],
  actions: [],
} as const satisfies NodeConfig
