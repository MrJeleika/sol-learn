import { useNodeConnections, useNodesData } from '@xyflow/react'
import { CustomNode } from '../ui/custom-node'
import type { HashNodeData, HashNodeType } from '@/types/nodes/hash-node'
import { useEffect, useMemo } from 'react'
import { useTypedReactFlow } from '@/hooks/flow/use-typed-react-flow'

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
  console.log(connections)
  const inputData = useNodesData<HashNodeType>(connections?.[0]?.source)
  console.log(inputData)
  const hash = useMemo(() => simpleHash(inputData?.data?.hash), [inputData])
  console.log(hash)
  useEffect(() => {
    updateNodeData<HashNodeData>(props.id, { hash })
  }, [hash, props.id, updateNodeData])

  return (
    <CustomNode {...props}>
      <p>{simpleHash(inputData?.data?.hash)}</p>
    </CustomNode>
  )
}
