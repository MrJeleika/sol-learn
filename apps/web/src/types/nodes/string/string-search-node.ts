import type { Node } from '@xyflow/react'
import type { NodeTypeEnum } from '../../node'

export type StringSearchNodeData = {
  first: number
  last: number
}

export type StringSearchNodeType = Node<StringSearchNodeData, NodeTypeEnum.STRING_SEARCH>
