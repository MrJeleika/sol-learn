import { useTypedReactFlow } from '@/hooks/flow/use-typed-react-flow'
import { CustomNode } from '../ui/custom-node'
import type { KeypairNodeData, KeypairNodeType } from '@/types/nodes/keypair-node'
import { Keypair } from '@solana/web3.js'
import { useNodeActions } from '@/hooks/flow/use-node-actions'
import type { ActionsFor, NodeTypeEnum } from '@/types/node'
import { useCallback, useEffect } from 'react'
import { transformKeypair } from '@/utils/crypto/crypto.utils'
import type { NodeProps } from '@xyflow/react'

export const KeypairNode = (props: NodeProps<KeypairNodeType>) => {
  const { updateNodeData } = useTypedReactFlow()

  useEffect(() => {
    const keypair = Keypair.generate()
    updateNodeData<KeypairNodeData>(props.id, transformKeypair(keypair))
  }, [updateNodeData, props.id])

  const handleGenerateKeypair = useCallback(() => {
    const keypair = Keypair.generate()
    updateNodeData<KeypairNodeData>(props.id, transformKeypair(keypair))
  }, [updateNodeData, props.id])

  const actions = useNodeActions<ActionsFor<NodeTypeEnum.KEYPAIR>>(props.type, {
    Generate: handleGenerateKeypair,
  })

  return <CustomNode {...props} actions={actions}></CustomNode>
}
