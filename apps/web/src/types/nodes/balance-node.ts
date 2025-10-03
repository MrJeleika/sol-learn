import type { Node } from '@xyflow/react'
import type { NodeTypeEnum } from '@/types/node'
import type { Network } from '../network'

export type BalanceNodeData = {
  pubkey: string
  network: Network
  token: string
  balance: string
  balanceRaw: string
}

export type BalanceNodeType = Node<BalanceNodeData, NodeTypeEnum.BALANCE>
