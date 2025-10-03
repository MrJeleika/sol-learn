import { useTypedReactFlow } from '@/hooks/flow/use-typed-react-flow'
import { CustomNode } from '../ui/custom-node'
import type { VerifySignatureNodeData, VerifySignatureNodeType } from '@/types/nodes/verify-signature-node'
import { useTypedNodesData } from '@/hooks/flow/use-typed-nodes-data'
import type { NodeTypeEnum, TargetFieldsForEnum } from '@/types/node'
import { useEffect, useMemo } from 'react'
import { verify } from '@/utils/crypto/crypto.utils'
import { Copy } from '../ui/copy'
import { cn } from '@/lib/utils'
import type { NodeProps } from '@xyflow/react'

export const VerifySignatureNode = (props: NodeProps<VerifySignatureNodeType>) => {
  const { updateNodeData } = useTypedReactFlow()

  const resolved = useTypedNodesData<TargetFieldsForEnum<NodeTypeEnum.VERIFY_SIGNATURE>>(props.id)

  const publicKey = useMemo(() => resolved.publicKey?.value as string, [resolved])
  const message = useMemo(() => resolved.message?.value as string, [resolved])
  const signature = useMemo(() => resolved.signature?.value as string, [resolved])

  const isValid = useMemo(() => {
    if (!publicKey || !message || !signature) return false
    return verify(message, signature, publicKey)
  }, [publicKey, message, signature])

  useEffect(() => {
    updateNodeData<VerifySignatureNodeData>(props.id, { isValid })
  }, [isValid, props.id, updateNodeData])

  const text = useMemo(() => {
    if (!publicKey || !message || !signature) return ''

    return isValid ? 'Valid' : 'Invalid'
  }, [isValid, message, publicKey, signature])

  return (
    <CustomNode {...props}>
      <Copy data={text} className={cn('text-center text-[14px]', isValid ? 'text-green-500' : 'text-red-500')} />
    </CustomNode>
  )
}
