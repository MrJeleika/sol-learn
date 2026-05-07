import type { Node } from '@xyflow/react'
import type { NodeTypeEnum } from '../../node'

export type LogicNodeData = {
  result?: boolean
}

export type LogicNodeType = Node<LogicNodeData, NodeTypeEnum.AND | NodeTypeEnum.OR | NodeTypeEnum.NOT>
