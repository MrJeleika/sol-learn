import { CustomNode } from '../../ui/custom-node'
import { useEffect, useMemo } from 'react'
import { useTypedReactFlow } from '@/hooks/flow/use-typed-react-flow'
import { useTypedNodesData } from '@/hooks/flow/use-typed-nodes-data'
import { NodeTypeEnum, type TargetFieldsForEnum } from '@/types/node'
import type { MathNodeData, MathNodeType } from '@/types/nodes/math/math-node'
import type { NodeProps } from '@xyflow/react'

type MathOperationType = MathNodeType['type']

const toFiniteNumber = (value: unknown) => {
  const number = Number(value)
  return Number.isFinite(number) ? number : undefined
}

const calculate = (type: MathOperationType, a: number, b: number) => {
  switch (type) {
    case NodeTypeEnum.ADD:
      return a + b
    case NodeTypeEnum.SUBTRACT:
      return a - b
    case NodeTypeEnum.MULTIPLY:
      return a * b
    case NodeTypeEnum.DIVIDE:
      return b === 0 ? undefined : a / b
    case NodeTypeEnum.MODULO:
      return b === 0 ? undefined : a % b
    case NodeTypeEnum.EXPONENT:
      return a ** b
    case NodeTypeEnum.MIN:
      return Math.min(a, b)
    case NodeTypeEnum.MAX:
      return Math.max(a, b)
  }
}

const calculateUnary = (type: MathOperationType, a: number) => {
  switch (type) {
    case NodeTypeEnum.ROUND:
      return Math.round(a)
  }
}

const unaryOperationTypes: MathOperationType[] = [NodeTypeEnum.ROUND]

export const MathNode = (props: NodeProps<MathNodeType>) => {
  const { updateNodeData } = useTypedReactFlow()
  const resolved = useTypedNodesData<TargetFieldsForEnum<NodeTypeEnum.ADD>>(props.id)

  const result = useMemo(() => {
    const a = toFiniteNumber(resolved.a?.value)
    const b = toFiniteNumber(resolved.b?.value)
    const type = props.type as MathOperationType

    if (a === undefined || !type) return undefined

    if (unaryOperationTypes.includes(type)) {
      return calculateUnary(type, a)
    }

    if (b === undefined) return undefined

    return calculate(type, a, b)
  }, [props.type, resolved.a?.value, resolved.b?.value])

  useEffect(() => {
    updateNodeData<MathNodeData>(props.id, { result })
  }, [props.id, result, updateNodeData])

  return (
    <CustomNode {...props}>
      <p className="text-[10px] leading-[12px] text-center font-medium tabular-nums">{result ?? ''}</p>
    </CustomNode>
  )
}
