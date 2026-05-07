import { useEffect, useMemo } from 'react'
import type { NodeProps } from '@xyflow/react'
import { CustomNode } from '../../ui/custom-node'
import { useTypedNodesData } from '@/hooks/flow/use-typed-nodes-data'
import { useTypedReactFlow } from '@/hooks/flow/use-typed-react-flow'
import type { NodeTypeEnum, TargetFieldsForEnum } from '@/types/node'
import type { HasValueNodeData, HasValueNodeType } from '@/types/nodes/logic/has-value-node'
import { hasConcreteValue } from '@/utils/node/logic/logic-node.utils'
import { LogicResult } from './logic-node-content'

export const HasValueNode = (props: NodeProps<HasValueNodeType>) => {
  const { updateNodeData } = useTypedReactFlow()
  const resolved = useTypedNodesData<TargetFieldsForEnum<NodeTypeEnum.HAS_VALUE>>(props.id)

  const result = useMemo(() => {
    if (!resolved.value) return undefined
    return hasConcreteValue(resolved.value.value)
  }, [resolved.value])

  useEffect(() => {
    updateNodeData<HasValueNodeData>(props.id, { result })
  }, [props.id, result, updateNodeData])

  return (
    <CustomNode {...props}>
      <LogicResult value={result} />
    </CustomNode>
  )
}
