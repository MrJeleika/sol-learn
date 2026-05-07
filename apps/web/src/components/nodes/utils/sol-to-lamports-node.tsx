import { useEffect, useMemo } from 'react'
import type { NodeProps } from '@xyflow/react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { CustomNode } from '../../ui/custom-node'
import { useTypedNodesData } from '@/hooks/flow/use-typed-nodes-data'
import { useTypedReactFlow } from '@/hooks/flow/use-typed-react-flow'
import type { NodeTypeEnum, TargetFieldsForEnum } from '@/types/node'
import type { SolToLamportsNodeData, SolToLamportsNodeType } from '@/types/nodes/utils/solana-units-node'
import { toFiniteNumber } from '@/utils/node/logic/logic-node.utils'
import { UtilsNumberPreview } from './utils-node-content'

export const SolToLamportsNode = (props: NodeProps<SolToLamportsNodeType>) => {
  const { updateNodeData } = useTypedReactFlow()
  const resolved = useTypedNodesData<TargetFieldsForEnum<NodeTypeEnum.SOL_TO_LAMPORTS>>(props.id)

  const lamports = useMemo(() => {
    const sol = toFiniteNumber(resolved.sol?.value)
    return sol === undefined ? undefined : Math.round(sol * LAMPORTS_PER_SOL)
  }, [resolved.sol?.value])

  useEffect(() => {
    updateNodeData<SolToLamportsNodeData>(props.id, { lamports })
  }, [lamports, props.id, updateNodeData])

  return (
    <CustomNode {...props}>
      <UtilsNumberPreview value={lamports} />
    </CustomNode>
  )
}
