import type { Node } from '@xyflow/react'
import type { NodeTypeEnum } from '../../node'

export type CompareOperator = 'gt' | 'gte' | 'lt' | 'lte' | 'eq' | 'neq'

export type EqualNodeData = {
  result?: boolean
}

export type CompareNodeData = {
  operator?: CompareOperator
  result?: boolean
}

export type EqualNodeType = Node<EqualNodeData, NodeTypeEnum.EQUAL>
export type CompareNodeType = Node<CompareNodeData, NodeTypeEnum.COMPARE>
