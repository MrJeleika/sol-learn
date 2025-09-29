import type { Node } from '@xyflow/react'
import type { NodeTypeEnum } from './base'

export type HashNodeData = {
  hash: string
}

export type HashNodeType = Node<HashNodeData, NodeTypeEnum.hash>
