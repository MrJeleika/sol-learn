import { useTypedReactFlow } from '@/hooks/flow/use-typed-react-flow'
import { CustomNode } from '../ui/custom-node'
import type { SignNodeData, SignNodeType } from '@/types/nodes/sign-node'
import { useTypedNodesData } from '@/hooks/flow/use-typed-nodes-data'
import type { NodeTypeEnum, TargetFieldsForEnum } from '@/types/node'
import { useEffect, useMemo } from 'react'
import { sign } from '@/utils/crypto/crypto.utils'

export const SignNode = (props: SignNodeType) => {
  const { updateNodeData } = useTypedReactFlow()

  const resolved = useTypedNodesData<TargetFieldsForEnum<NodeTypeEnum.sign>>(props.id)

  const signature = useMemo(() => {
    const privateKey = resolved.privateKey?.value as string
    const message = resolved.message?.value as string
    return sign(message, privateKey)
  }, [resolved])

  useEffect(() => {
    updateNodeData<SignNodeData>(props.id, { signature })
  }, [signature, props.id, updateNodeData])

  return <CustomNode {...props}></CustomNode>
}
