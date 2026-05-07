import type { Node } from '@xyflow/react'
import type { NodeTypeEnum } from '../../node'

export interface WalletSignerValue {
  kind: 'wallet'
  publicKey: string
}

export type WalletNodeData = {
  publicKey?: string
  wallet?: WalletSignerValue | null
}

export type WalletNodeType = Node<WalletNodeData, NodeTypeEnum.WALLET>
