import type { Node } from '@xyflow/react'
import type { NodeTypeEnum } from '../../node'
import type { Idl } from './idl-node'
import type { Network } from '@/types/network'

export type ProgramAccountNodeData = {
  idl?: Idl | null
  programId?: string
  network?: Network | null
  address?: string
  selectedAccount?: string
  decoded?: Record<string, unknown> | null
  error?: string | null
  // Decoded fields are flattened onto data so source handles can read them
  [key: string]: unknown
}

export type ProgramAccountNodeType = Node<ProgramAccountNodeData, NodeTypeEnum.PROGRAM_ACCOUNT>
