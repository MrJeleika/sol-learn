import type { Node } from '@xyflow/react'
import type { NodeTypeEnum } from '../node'

export type StringSplitNodeData = {
  first: string
  last: string
  count: number
  json: string
}

export type StringSplitNodeType = Node<StringSplitNodeData, NodeTypeEnum.STRING_SPLIT>
