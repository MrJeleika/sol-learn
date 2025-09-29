import { useTypedReactFlow } from '@/hooks/flow/use-typed-react-flow'
import { CustomNode } from '../ui/custom-node'
import { useState } from 'react'
import type { KeypairNodeData, KeypairNodeType } from '@/types/nodes/keypair-node'
import { Keypair } from '@solana/web3.js'

export const KeypairNode = (props: KeypairNodeType) => {
  const [keypair, setKeypair] = useState(props.data.keypair)
  const { updateNodeData } = useTypedReactFlow()

  const handleGenerateKeypair = () => {
    const keypair = Keypair.generate()
    setKeypair(keypair)
    updateNodeData<KeypairNodeData>(props.id, { keypair })
  }

  return (
    <CustomNode {...props}>
      <button onClick={handleGenerateKeypair}>Generate Keypair</button>
    </CustomNode>
  )
}
