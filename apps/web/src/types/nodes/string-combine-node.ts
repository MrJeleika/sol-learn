import type { Node } from '@xyflow/react'
import type { NodeTypeEnum } from '../node'

export type StringCombineNodeData = {
  text: string
}

export type StringCombineNodeType = Node<StringCombineNodeData, NodeTypeEnum.STRING_COMBINE>
