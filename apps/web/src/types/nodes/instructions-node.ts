import type { Node } from '@xyflow/react'
import type { NodeTypeEnum } from '../node'
import type { Transaction } from '@solana/web3.js'

export type InstructionsNodeData = {
  transactionIn?: Transaction | null
  transactionOut?: Transaction | null
}

export type InstructionsNodeType = Node<InstructionsNodeData, NodeTypeEnum.INSTRUCTIONS>
