import { useEffect, useMemo } from 'react'
import type { NodeProps } from '@xyflow/react'
import { CustomNode } from '../../ui/custom-node'
import { useTypedNodesData } from '@/hooks/flow/use-typed-nodes-data'
import { useTypedReactFlow } from '@/hooks/flow/use-typed-react-flow'
import type { NodeTypeEnum, TargetFieldsForEnum } from '@/types/node'
import type { EqualNodeData, EqualNodeType } from '@/types/nodes/logic/comparison-node'
import { toComparableText } from '@/utils/node/logic/logic-node.utils'
import { LogicResult } from './logic-node-content'

export const EqualNode = (props: NodeProps<EqualNodeType>) => {
  const { updateNodeData } = useTypedReactFlow()
  const resolved = useTypedNodesData<TargetFieldsForEnum<NodeTypeEnum.EQUAL>>(props.id)

  const result = useMemo(() => {
    if (!resolved.a || !resolved.b) return undefined
    return toComparableText(resolved.a.value) === toComparableText(resolved.b.value)
  }, [resolved.a, resolved.b])

  useEffect(() => {
    updateNodeData<EqualNodeData>(props.id, { result })
  }, [props.id, result, updateNodeData])

  return (
    <CustomNode {...props}>
      <LogicResult value={result} />
    </CustomNode>
  )
}
