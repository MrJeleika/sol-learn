import { Position } from '@xyflow/react'
import type { NodeConfig } from '@/types/node-config'

export const balanceNodeConfig = {
  label: 'BALANCE',
  handles: [
    { position: Position.Left, type: 'target', dataField: 'pubkey', label: 'Public Key', dataType: 'publicKey' },
    { position: Position.Left, type: 'target', dataField: 'network', label: 'Network', dataType: 'network' },
    { position: Position.Left, type: 'target', dataField: 'token', label: 'Token' },
    { position: Position.Right, type: 'source', dataField: 'balance', label: 'Balance' },
    { position: Position.Right, type: 'source', dataField: 'balanceRaw', label: 'Balance Raw' },
  ],
  actions: [{ position: Position.Right, label: 'Refresh' }],
} as const satisfies NodeConfig
