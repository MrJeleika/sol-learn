import { useEffect, useMemo } from 'react'
import type { NodeProps } from '@xyflow/react'
import { getAssociatedTokenAddressSync } from '@solana/spl-token'
import { PublicKey } from '@solana/web3.js'
import { CustomNode } from '../../ui/custom-node'
import { useTypedNodesData } from '@/hooks/flow/use-typed-nodes-data'
import { useTypedReactFlow } from '@/hooks/flow/use-typed-react-flow'
import type { NodeTypeEnum, TargetFieldsForEnum } from '@/types/node'
import type { AtaNodeData, AtaNodeType } from '@/types/nodes/utils/ata-node'
import { toText } from '@/utils/string/string-node.utils'
import { UtilsNodeContent, UtilsTextPreview } from './utils-node-content'

export const AtaNode = (props: NodeProps<AtaNodeType>) => {
  const { updateNodeData } = useTypedReactFlow()
  const resolved = useTypedNodesData<TargetFieldsForEnum<NodeTypeEnum.ATA>>(props.id)

  const owner = useMemo(() => toText(resolved.owner?.value).trim(), [resolved.owner?.value])
  const mint = useMemo(() => toText(resolved.mint?.value).trim(), [resolved.mint?.value])

  const ata = useMemo(() => {
    try {
      if (!owner || !mint) return ''

      const ownerPublicKey = new PublicKey(owner)
      const mintPublicKey = new PublicKey(mint)

      return getAssociatedTokenAddressSync(mintPublicKey, ownerPublicKey, true).toBase58()
    } catch {
      return ''
    }
  }, [mint, owner])

  useEffect(() => {
    updateNodeData<AtaNodeData>(props.id, { ata })
  }, [ata, props.id, updateNodeData])

  return (
    <CustomNode {...props}>
      <UtilsNodeContent>
        <UtilsTextPreview value={ata} />
      </UtilsNodeContent>
    </CustomNode>
  )
}
