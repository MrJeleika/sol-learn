import type { Node } from '@xyflow/react'
import type { NodeTypeEnum } from '../../node'
import type { StringEncoding } from '@/utils/string/string-node.utils'

export type StringEncodeNodeData = {
  encoding?: StringEncoding
  text: string
}

export type StringEncodeNodeType = Node<StringEncodeNodeData, NodeTypeEnum.STRING_ENCODE>
