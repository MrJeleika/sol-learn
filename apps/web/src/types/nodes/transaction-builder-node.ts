import type { Node } from '@xyflow/react'
import type { NodeTypeEnum } from '../node'
import type { Transaction } from '@solana/web3.js'

export type TransactionBuilderNodeData = {
  transaction: Transaction | null
}

export type TransactionBuilderNodeType = Node<TransactionBuilderNodeData, NodeTypeEnum.TRANSACTION_BUILDER>
