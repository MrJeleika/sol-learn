import type { Node } from '@xyflow/react'
import type { NodeTypeEnum } from '../node'
import type { Transaction } from '@solana/web3.js'
import type { Idl } from './idl-node'

export type ProgramInstructionsNodeData = {
  idl?: Idl | null
  programId?: string
  transactionIn?: Transaction | null
  transactionOut?: Transaction | null
  selectedInstruction?: string
  // Dynamic fields for instruction args and accounts will be added at runtime
  [key: string]: unknown
}

export type ProgramInstructionsNodeType = Node<ProgramInstructionsNodeData, NodeTypeEnum.PROGRAM_INSTRUCTIONS>
