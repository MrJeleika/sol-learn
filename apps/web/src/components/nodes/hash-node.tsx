import { CustomNode } from '../ui/custom-node'
import type { HashNodeData, HashNodeType } from '@/types/nodes/hash-node'
import { useEffect, useMemo } from 'react'
import { useTypedReactFlow } from '@/hooks/flow/use-typed-react-flow'
import { useTypedNodesData } from '@/hooks/flow/use-typed-nodes-data'
import type { NodeTypeEnum, TargetFieldsForEnum } from '@/types/node'
import { hash } from '@/utils/crypto/crypto.utils'
import { Copy } from '../ui/copy'
import type { NodeProps } from '@xyflow/react'

export const HashNode = (props: NodeProps<HashNodeType>) => {
  const { updateNodeData } = useTypedReactFlow()
  const resolved = useTypedNodesData<TargetFieldsForEnum<NodeTypeEnum.HASH>>(props.id)

  const inputData = useMemo(() => String(resolved.input?.value ?? ''), [resolved])

  const hashed = useMemo(() => hash(inputData), [inputData])
  useEffect(() => {
    updateNodeData<HashNodeData>(props.id, { hash: hashed })
  }, [hashed, props.id, updateNodeData])

  return (
    <CustomNode {...props}>
      <Copy data={hashed} />
    </CustomNode>
  )
}
