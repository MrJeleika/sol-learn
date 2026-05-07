import { useEffect, useMemo } from 'react'
import type { NodeProps } from '@xyflow/react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { CustomNode } from '../../ui/custom-node'
import { useTypedNodesData } from '@/hooks/flow/use-typed-nodes-data'
import { useTypedReactFlow } from '@/hooks/flow/use-typed-react-flow'
import type { NodeTypeEnum, TargetFieldsForEnum } from '@/types/node'
import type { LamportsToSolNodeData, LamportsToSolNodeType } from '@/types/nodes/utils/solana-units-node'
import { toFiniteNumber } from '@/utils/node/logic/logic-node.utils'
import { UtilsNumberPreview } from './utils-node-content'

export const LamportsToSolNode = (props: NodeProps<LamportsToSolNodeType>) => {
  const { updateNodeData } = useTypedReactFlow()
  const resolved = useTypedNodesData<TargetFieldsForEnum<NodeTypeEnum.LAMPORTS_TO_SOL>>(props.id)

  const sol = useMemo(() => {
    const lamports = toFiniteNumber(resolved.lamports?.value)
    return lamports === undefined ? undefined : lamports / LAMPORTS_PER_SOL
  }, [resolved.lamports?.value])

  useEffect(() => {
    updateNodeData<LamportsToSolNodeData>(props.id, { sol })
  }, [props.id, sol, updateNodeData])

  return (
    <CustomNode {...props}>
      <UtilsNumberPreview value={sol} />
    </CustomNode>
  )
}
