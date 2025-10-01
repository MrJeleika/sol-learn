import { useTypedReactFlow } from '@/hooks/flow/use-typed-react-flow'
import { CustomNode } from '../ui/custom-node'
import type { KeypairNodeData, KeypairNodeType } from '@/types/nodes/keypair-node'
import { Keypair } from '@solana/web3.js'
import { useNodeActions } from '@/hooks/flow/use-node-actions'
import type { ActionsFor, NodeTypeEnum } from '@/types/node'
import { useCallback } from 'react'
import { transformKeypair } from '@/utils/crypto/crypto.utils'

export const KeypairNode = (props: KeypairNodeType) => {
  const { updateNodeData } = useTypedReactFlow()

  const handleGenerateKeypair = useCallback(() => {
    const keypair = Keypair.generate()
    updateNodeData<KeypairNodeData>(props.id, transformKeypair(keypair))
  }, [updateNodeData, props.id])

  const actions = useNodeActions<ActionsFor<NodeTypeEnum.KEYPAIR>>(props.type, {
    Generate: handleGenerateKeypair,
  })

  return <CustomNode {...props} actions={actions}></CustomNode>
}
