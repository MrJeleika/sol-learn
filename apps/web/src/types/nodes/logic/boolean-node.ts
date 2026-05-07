import type { Node } from '@xyflow/react'
import type { NodeTypeEnum } from '../../node'

export type BooleanNodeData = {
  value: boolean
}

export type BooleanNodeType = Node<BooleanNodeData, NodeTypeEnum.BOOLEAN>
