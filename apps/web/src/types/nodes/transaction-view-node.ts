import type { Node } from '@xyflow/react'
import type { NodeTypeEnum } from '@/types/node'

export type TransactionViewNodeData = {
  transactionJson: string
  slot: string
  blockTime: string
}

export type TransactionViewNodeType = Node<TransactionViewNodeData, NodeTypeEnum.TRANSACTION_VIEW>
