import { useEffect, useMemo } from 'react'
import type { NodeProps } from '@xyflow/react'
import { CustomNode } from '../../ui/custom-node'
import { useTypedNodesData } from '@/hooks/flow/use-typed-nodes-data'
import { useTypedReactFlow } from '@/hooks/flow/use-typed-react-flow'
import type { NodeTypeEnum, TargetFieldsForEnum } from '@/types/node'
import type {
  RawToTokenAmountNodeData,
  RawToTokenAmountNodeType,
  TokenAmountToRawNodeData,
  TokenAmountToRawNodeType,
} from '@/types/nodes/utils/token-amount-node'
import { rawAmountToTokenAmount, tokenAmountToRawAmount } from '@/utils/solana/amount.utils'
import { UtilsNodeContent, UtilsTextPreview } from './utils-node-content'

export const TokenAmountToRawNode = (props: NodeProps<TokenAmountToRawNodeType>) => {
  const { updateNodeData } = useTypedReactFlow()
  const resolved = useTypedNodesData<TargetFieldsForEnum<NodeTypeEnum.TOKEN_AMOUNT_TO_RAW>>(props.id)

  const rawAmount = useMemo(() => {
    return tokenAmountToRawAmount(resolved.amount?.value, resolved.decimals?.value)
  }, [resolved.amount?.value, resolved.decimals?.value])

  useEffect(() => {
    updateNodeData<TokenAmountToRawNodeData>(props.id, { rawAmount })
  }, [props.id, rawAmount, updateNodeData])

  return (
    <CustomNode {...props}>
      <UtilsNodeContent>
        <UtilsTextPreview value={rawAmount} />
      </UtilsNodeContent>
    </CustomNode>
  )
}

export const RawToTokenAmountNode = (props: NodeProps<RawToTokenAmountNodeType>) => {
  const { updateNodeData } = useTypedReactFlow()
  const resolved = useTypedNodesData<TargetFieldsForEnum<NodeTypeEnum.RAW_TO_TOKEN_AMOUNT>>(props.id)

  const amount = useMemo(() => {
    return rawAmountToTokenAmount(resolved.rawAmount?.value, resolved.decimals?.value)
  }, [resolved.decimals?.value, resolved.rawAmount?.value])

  useEffect(() => {
    updateNodeData<RawToTokenAmountNodeData>(props.id, { amount })
  }, [amount, props.id, updateNodeData])

  return (
    <CustomNode {...props}>
      <UtilsNodeContent>
        <UtilsTextPreview value={amount} />
      </UtilsNodeContent>
    </CustomNode>
  )
}
