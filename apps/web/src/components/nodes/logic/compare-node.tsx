import { useEffect, useMemo, useState } from 'react'
import type { NodeProps } from '@xyflow/react'
import { CustomNode } from '../../ui/custom-node'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useTypedNodesData } from '@/hooks/flow/use-typed-nodes-data'
import { useTypedReactFlow } from '@/hooks/flow/use-typed-react-flow'
import type { NodeTypeEnum, TargetFieldsForEnum } from '@/types/node'
import type { CompareNodeData, CompareNodeType, CompareOperator } from '@/types/nodes/logic/comparison-node'
import { toFiniteNumber } from '@/utils/node/logic/logic-node.utils'
import { LogicNodeContent, LogicResult } from './logic-node-content'

const operatorLabels: Record<CompareOperator, string> = {
  gt: '>',
  gte: '>=',
  lt: '<',
  lte: '<=',
  eq: '=',
  neq: '!=',
}

const compare = (operator: CompareOperator, a: number, b: number) => {
  switch (operator) {
    case 'gt':
      return a > b
    case 'gte':
      return a >= b
    case 'lt':
      return a < b
    case 'lte':
      return a <= b
    case 'eq':
      return a === b
    case 'neq':
      return a !== b
  }
}

export const CompareNode = (props: NodeProps<CompareNodeType>) => {
  const { updateNodeData } = useTypedReactFlow()
  const resolved = useTypedNodesData<TargetFieldsForEnum<NodeTypeEnum.COMPARE>>(props.id)
  const [operator, setOperator] = useState<CompareOperator>(props.data.operator ?? 'gt')

  const result = useMemo(() => {
    const a = resolved.a ? toFiniteNumber(resolved.a.value) : undefined
    const b = resolved.b ? toFiniteNumber(resolved.b.value) : undefined

    if (a === undefined || b === undefined) return undefined
    return compare(operator, a, b)
  }, [operator, resolved.a, resolved.b])

  useEffect(() => {
    updateNodeData<CompareNodeData>(props.id, { operator, result })
  }, [operator, props.id, result, updateNodeData])

  return (
    <CustomNode {...props}>
      <LogicNodeContent>
        <Select value={operator} onValueChange={(value) => setOperator(value as CompareOperator)}>
          <SelectTrigger className="mx-auto h-5 w-16">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(operatorLabels) as CompareOperator[]).map((value) => (
              <SelectItem key={value} value={value}>
                {operatorLabels[value]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <LogicResult value={result} />
      </LogicNodeContent>
    </CustomNode>
  )
}
