import { Position } from '@xyflow/react'
import type { NodeConfig } from '@/types/node-config'

export const ataNodeConfig = {
  label: 'ATA',
  handles: [
    {
      position: Position.Left,
      type: 'target',
      dataField: 'owner',
      label: 'Owner',
      dataType: 'publicKey',
      maxConnections: 1,
    },
    {
      position: Position.Left,
      type: 'target',
      dataField: 'mint',
      label: 'Mint',
      dataType: 'mint',
      maxConnections: 1,
    },
    {
      position: Position.Right,
      type: 'source',
      dataField: 'ata',
      label: 'ATA',
      dataType: 'publicKey',
    },
  ],
  actions: [],
} as const satisfies NodeConfig
