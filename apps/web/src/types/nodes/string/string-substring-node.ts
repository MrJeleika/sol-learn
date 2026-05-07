import type { Node } from '@xyflow/react'
import type { NodeTypeEnum } from '../../node'

export type StringSubstringNodeData = {
  text: string
}

export type StringSubstringNodeType = Node<StringSubstringNodeData, NodeTypeEnum.STRING_SUBSTRING>
