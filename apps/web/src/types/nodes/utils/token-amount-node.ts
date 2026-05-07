import type { Node } from '@xyflow/react'
import type { NodeTypeEnum } from '../../node'

export type TokenAmountToRawNodeData = {
  rawAmount?: string
}

export type RawToTokenAmountNodeData = {
  amount?: string
}

export type TokenAmountToRawNodeType = Node<TokenAmountToRawNodeData, NodeTypeEnum.TOKEN_AMOUNT_TO_RAW>
export type RawToTokenAmountNodeType = Node<RawToTokenAmountNodeData, NodeTypeEnum.RAW_TO_TOKEN_AMOUNT>
