import type { Node } from '@xyflow/react'
import type { NodeTypeEnum } from '../node'
import type { Transaction } from '@solana/web3.js'
import type { Network } from '../network'

export type TransactionStatus = 'idle' | 'pending' | 'success' | 'failed'

export type TransactionNodeData = {
  privateKey?: string
  network?: Network | null
  transaction?: Transaction | null
  signature?: string
  status?: TransactionStatus
}

export type TransactionNodeType = Node<TransactionNodeData, NodeTypeEnum.TRANSACTION>
