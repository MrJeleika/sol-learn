import type { Node } from '@xyflow/react'
import type { NodeTypeEnum } from '../../node'

export type RentExemptNodeData = {
  lamports?: number
  sol?: number
}

export type RentExemptNodeType = Node<RentExemptNodeData, NodeTypeEnum.RENT_EXEMPT>
