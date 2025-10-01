import { useTypedReactFlow } from '@/hooks/flow/use-typed-react-flow'
import { CustomNode } from '../ui/custom-node'
import type { KeypairNodeData, KeypairNodeType } from '@/types/nodes/keypair-node'
import { Keypair } from '@solana/web3.js'
import { useNodeActions } from '@/hooks/flow/use-node-actions'
import type { ActionsFor, NodeTypeEnum } from '@/types/node'

export const KeypairNode = (props: KeypairNodeType) => {
  const { updateNodeData } = useTypedReactFlow()

  const handleGenerateKeypair = () => {
    const keypair = Keypair.generate()
    updateNodeData<KeypairNodeData>(props.id, { keypair })
  }

  const actions = useNodeActions<ActionsFor<NodeTypeEnum.keypair>>(props.type, {
    Generate: handleGenerateKeypair,
  })

  return <CustomNode {...props} actions={actions}></CustomNode>
}
