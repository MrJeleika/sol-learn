import { useEffect, useMemo } from 'react'
import type { NodeProps } from '@xyflow/react'
import { CustomNode } from '../../ui/custom-node'
import { useTypedNodesData } from '@/hooks/flow/use-typed-nodes-data'
import { useTypedReactFlow } from '@/hooks/flow/use-typed-react-flow'
import { NodeTypeEnum } from '@/types/node'
import type { LogicNodeData, LogicNodeType } from '@/types/nodes/logic/logic-node'
import { toLogicBoolean } from '@/utils/node/logic/logic-node.utils'
import { LogicResult } from './logic-node-content'

type LogicOperationType = LogicNodeType['type']

const calculateBinaryLogic = (type: LogicOperationType, a?: boolean, b?: boolean) => {
  switch (type) {
    case NodeTypeEnum.AND:
      if (a === false || b === false) return false
      if (a === undefined || b === undefined) return undefined
      return true
    case NodeTypeEnum.OR:
      if (a === true || b === true) return true
      if (a === undefined || b === undefined) return undefined
      return false
  }
}

export const LogicNode = (props: NodeProps<LogicNodeType>) => {
  const { updateNodeData } = useTypedReactFlow()
  const resolved = useTypedNodesData<'a' | 'b'>(props.id)

  const result = useMemo(() => {
    const type = props.type as LogicOperationType
    const a = toLogicBoolean(resolved.a?.value)

    if (type === NodeTypeEnum.NOT) return a === undefined ? undefined : !a

    const b = toLogicBoolean(resolved.b?.value)
    return calculateBinaryLogic(type, a, b)
  }, [props.type, resolved.a?.value, resolved.b?.value])

  useEffect(() => {
    updateNodeData<LogicNodeData>(props.id, { result })
  }, [props.id, result, updateNodeData])

  return (
    <CustomNode {...props}>
      <LogicResult value={result} />
    </CustomNode>
  )
}
