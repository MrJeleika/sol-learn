import { Position } from '@xyflow/react'
import type { NodeConfig } from '@/types/node-config'

export const walletNodeConfig = {
  label: 'WALLET',
  handles: [
    { position: Position.Right, type: 'source', dataField: 'publicKey', label: 'Public Key', dataType: 'publicKey' },
    { position: Position.Right, type: 'source', dataField: 'wallet', label: 'Wallet', dataType: 'wallet' },
  ],
  actions: [],
} as const satisfies NodeConfig
