import type { Node } from '@xyflow/react'
import type { NodeTypeEnum } from '../node'

export type NumberNodeData = {
  number: number
}

export type NumberNodeType = Node<NumberNodeData, NodeTypeEnum.NUMBER>
