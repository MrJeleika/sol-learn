import type { Node } from '@xyflow/react'
import type { NodeTypeEnum } from '../../node'

export type StringLengthNodeData = {
  chars: number
  bytes: number
}

export type StringLengthNodeType = Node<StringLengthNodeData, NodeTypeEnum.STRING_LENGTH>
