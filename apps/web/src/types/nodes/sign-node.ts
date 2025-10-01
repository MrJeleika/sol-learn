import type { Node } from '@xyflow/react'
import type { NodeTypeEnum } from '../node'

export type SignNodeData = {
  signature: string
}

export type SignNodeType = Node<SignNodeData, NodeTypeEnum.SIGN>
