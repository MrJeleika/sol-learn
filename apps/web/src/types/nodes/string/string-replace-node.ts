import type { Node } from '@xyflow/react'
import type { NodeTypeEnum } from '../../node'

export type StringReplaceNodeData = {
  text: string
}

export type StringReplaceNodeType = Node<StringReplaceNodeData, NodeTypeEnum.STRING_REPLACE>
