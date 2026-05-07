import { useEffect, useMemo } from 'react'
import type { NodeProps } from '@xyflow/react'
import { PublicKey } from '@solana/web3.js'
import { CustomNode } from '../../ui/custom-node'
import { useTypedNodesData } from '@/hooks/flow/use-typed-nodes-data'
import { useTypedReactFlow } from '@/hooks/flow/use-typed-react-flow'
import type { NodeTypeEnum, TargetFieldsForEnum } from '@/types/node'
import type { ValidPublicKeyNodeData, ValidPublicKeyNodeType } from '@/types/nodes/utils/valid-public-key-node'
import { toText } from '@/utils/string/string-node.utils'
import { UtilsBooleanPreview, UtilsNodeContent, UtilsTextPreview } from './utils-node-content'

export const ValidPublicKeyNode = (props: NodeProps<ValidPublicKeyNodeType>) => {
  const { updateNodeData } = useTypedReactFlow()
  const resolved = useTypedNodesData<TargetFieldsForEnum<NodeTypeEnum.VALID_PUBLIC_KEY>>(props.id)

  const result = useMemo(() => {
    try {
      const value = toText(resolved.value?.value).trim()
      if (!value) return { publicKey: '', isValid: false }
      const publicKey = new PublicKey(value).toBase58()
      return { publicKey, isValid: true }
    } catch {
      return { publicKey: '', isValid: false }
    }
  }, [resolved.value?.value])

  useEffect(() => {
    updateNodeData<ValidPublicKeyNodeData>(props.id, result)
  }, [props.id, result, updateNodeData])

  return (
    <CustomNode {...props}>
      <UtilsNodeContent>
        <UtilsBooleanPreview value={result.isValid} />
        <UtilsTextPreview value={result.publicKey} />
      </UtilsNodeContent>
    </CustomNode>
  )
}
