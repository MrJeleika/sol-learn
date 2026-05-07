import type { Node } from '@xyflow/react'
import type { NodeTypeEnum } from '../../node'

export type SolToLamportsNodeData = {
  lamports?: number
}

export type LamportsToSolNodeData = {
  sol?: number
}

export type SolToLamportsNodeType = Node<SolToLamportsNodeData, NodeTypeEnum.SOL_TO_LAMPORTS>
export type LamportsToSolNodeType = Node<LamportsToSolNodeData, NodeTypeEnum.LAMPORTS_TO_SOL>
