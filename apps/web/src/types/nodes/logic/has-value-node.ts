import type { Node } from '@xyflow/react'
import type { NodeTypeEnum } from '../../node'

export type HasValueNodeData = {
  result?: boolean
}

export type HasValueNodeType = Node<HasValueNodeData, NodeTypeEnum.HAS_VALUE>
