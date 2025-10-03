import { CustomNode } from '../ui/custom-node'
import { useEffect, useMemo } from 'react'
import { useTypedReactFlow } from '@/hooks/flow/use-typed-react-flow'
import { useTypedNodesData } from '@/hooks/flow/use-typed-nodes-data'
import type { NodeTypeEnum, TargetFieldsForEnum } from '@/types/node'
import { hash } from '@/utils/crypto/crypto.utils'
import { Copy } from '../ui/copy'
import type { NetworkNodeData, NetworkNodeType } from '@/types/nodes/network-node'

export const NetworkNode = (props: NetworkNodeType) => {
  const { updateNodeData } = useTypedReactFlow()
  const resolved = useTypedNodesData<TargetFieldsForEnum<NodeTypeEnum.HASH>>(props.id)

  const inputData = useMemo(() => String(resolved.input?.value ?? ''), [resolved])

  const hashed = useMemo(() => hash(inputData), [inputData])
  useEffect(() => {
    updateNodeData<NetworkNodeData>(props.id, { network: hashed })
  }, [hashed, props.id, updateNodeData])

  return (
    <CustomNode {...props}>
      <Copy data={hashed} />
    </CustomNode>
  )
}
