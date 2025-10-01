import type { Node } from '@xyflow/react'
import type { NodeTypeEnum } from '../node'

export type DisplayNodeData = {
  text: string
}

export type DisplayNodeType = Node<DisplayNodeData, NodeTypeEnum.display>
