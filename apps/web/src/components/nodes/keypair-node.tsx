import { useTypedReactFlow } from '@/hooks/flow/use-typed-react-flow'
import { CustomNode } from '../ui/custom-node'
import type { KeypairNodeData, KeypairNodeType } from '@/types/nodes/keypair-node'
import { Keypair } from '@solana/web3.js'
import type { NodeActionConfig } from '@/types/node-action'
import { Position } from '@xyflow/react'

export const KeypairNode = (props: KeypairNodeType) => {
  const { updateNodeData } = useTypedReactFlow()

  const handleGenerateKeypair = () => {
    const keypair = Keypair.generate()
    updateNodeData<KeypairNodeData>(props.id, { keypair })
  }

  const actions = [
    {
      position: Position.Left,
      label: 'Generate',
      onClick: handleGenerateKeypair,
    },
  ] satisfies NodeActionConfig[]

  return <CustomNode {...props} actions={actions}></CustomNode>
}
