import type { Node } from '@xyflow/react'
import type { NodeTypeEnum } from '../node'

export type MathNodeData = {
  result?: number
}

export type MathNodeType = Node<
  MathNodeData,
  | NodeTypeEnum.ADD
  | NodeTypeEnum.SUBTRACT
  | NodeTypeEnum.MULTIPLY
  | NodeTypeEnum.DIVIDE
  | NodeTypeEnum.MODULO
  | NodeTypeEnum.EXPONENT
  | NodeTypeEnum.ROUND
  | NodeTypeEnum.MIN
  | NodeTypeEnum.MAX
>
