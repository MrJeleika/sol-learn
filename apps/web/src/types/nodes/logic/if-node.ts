import type { Node } from '@xyflow/react'
import type { NodeTypeEnum } from '../../node'

export type IfNodeData = {
  value?: unknown
}

export type IfNodeType = Node<IfNodeData, NodeTypeEnum.IF>
