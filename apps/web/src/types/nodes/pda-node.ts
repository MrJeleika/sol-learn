import type { Node } from '@xyflow/react'
import type { NodeTypeEnum } from '@/types/node'

export type PdaNodeData = {
  pda: string
}

export type PdaNodeType = Node<PdaNodeData, NodeTypeEnum.PDA>
