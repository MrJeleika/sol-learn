import { useNodeConnections } from '@xyflow/react'
import { CustomNode } from '../ui/custom-node'
import type { HashNodeData, HashNodeType } from '@/types/nodes/hash-node'
import { useEffect, useMemo } from 'react'
import { useTypedReactFlow } from '@/hooks/flow/use-typed-react-flow'
import { useTypedNodesData } from '@/hooks/flow/use-typed-nodes-data'
import type { NodeTypeEnum, TargetFieldsForEnum } from '@/types/node'

const simpleHash = (str?: string): string => {
  if (!str) return ''
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(16)
}

export const HashNode = (props: HashNodeType) => {
  const connections = useNodeConnections({ handleType: 'target', id: props.id })
  const { updateNodeData } = useTypedReactFlow()
  const resolved = useTypedNodesData<TargetFieldsForEnum<NodeTypeEnum.hash>>(connections)

  const inputData = useMemo(() => String(resolved.input?.value ?? ''), [resolved])

  const hash = useMemo(() => simpleHash(inputData), [inputData])
  useEffect(() => {
    updateNodeData<HashNodeData>(props.id, { hash })
  }, [hash, props.id, updateNodeData])

  return (
    <CustomNode {...props}>
      <p className="text-center">{hash}</p>
    </CustomNode>
  )
}
