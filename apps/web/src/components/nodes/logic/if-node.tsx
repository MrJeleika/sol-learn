import { useEffect, useMemo } from 'react'
import type { NodeProps } from '@xyflow/react'
import { CustomNode } from '../../ui/custom-node'
import { useTypedNodesData } from '@/hooks/flow/use-typed-nodes-data'
import { useTypedReactFlow } from '@/hooks/flow/use-typed-react-flow'
import type { NodeTypeEnum, TargetFieldsForEnum } from '@/types/node'
import type { IfNodeData, IfNodeType } from '@/types/nodes/logic/if-node'
import { toLogicBoolean } from '@/utils/node/logic/logic-node.utils'
import { LogicNodeContent, LogicPreview } from './logic-node-content'

export const IfNode = (props: NodeProps<IfNodeType>) => {
  const { updateNodeData } = useTypedReactFlow()
  const resolved = useTypedNodesData<TargetFieldsForEnum<NodeTypeEnum.IF>>(props.id)

  const condition = useMemo(() => toLogicBoolean(resolved.condition?.value), [resolved.condition])
  const value = useMemo(() => {
    if (condition === undefined) return undefined
    return condition ? resolved.whenTrue?.value : resolved.whenFalse?.value
  }, [condition, resolved.whenFalse?.value, resolved.whenTrue?.value])

  useEffect(() => {
    updateNodeData<IfNodeData>(props.id, { value })
  }, [props.id, updateNodeData, value])

  return (
    <CustomNode {...props}>
      <LogicNodeContent>
        <LogicPreview label={condition === undefined ? '' : String(condition)} value={value} />
      </LogicNodeContent>
    </CustomNode>
  )
}
