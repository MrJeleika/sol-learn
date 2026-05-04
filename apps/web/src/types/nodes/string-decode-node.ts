import type { Node } from '@xyflow/react'
import type { NodeTypeEnum } from '../node'
import type { StringEncoding } from '@/utils/string/string-node.utils'

export type StringDecodeNodeData = {
  encoding?: StringEncoding
  text: string
}

export type StringDecodeNodeType = Node<StringDecodeNodeData, NodeTypeEnum.STRING_DECODE>
