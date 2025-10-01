import type { Node } from '@xyflow/react'
import type { NodeTypeEnum } from '../node'

export type TextNodeData = {
  text: string
}

export type TextNodeType = Node<TextNodeData, NodeTypeEnum.TEXT>
