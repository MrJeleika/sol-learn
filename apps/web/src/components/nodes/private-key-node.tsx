import { useTypedReactFlow } from '@/hooks/flow/use-typed-react-flow'
import { CustomNode } from '../ui/custom-node'
import { useState, useEffect } from 'react'
import type { PrivateKeyNodeType, PrivateKeyNodeData } from '@/types/nodes/private-key-node'
import { Input } from '../ui/input'
import { getNodeStyles } from '@/utils/node/node-style.utils'
import type { NodeProps } from '@xyflow/react'
import { Keypair } from '@solana/web3.js'
import bs58 from 'bs58'
import { cn } from '@/lib/utils'

export const PrivateKeyNode = (props: NodeProps<PrivateKeyNodeType>) => {
  const [privateKey, setPrivateKey] = useState(props.data.privateKey || '')
  const { updateNodeData } = useTypedReactFlow()

  useEffect(() => {
    if (privateKey) {
      try {
        const secretKey = bs58.decode(privateKey)
        const keypair = Keypair.fromSecretKey(secretKey)
        const publicKey = keypair.publicKey.toBase58()

        updateNodeData<PrivateKeyNodeData>(props.id, {
          privateKey,
          publicKey,
        })
      } catch {
        updateNodeData<PrivateKeyNodeData>(props.id, {
          privateKey: '',
          publicKey: '',
        })
      }
    } else {
      updateNodeData<PrivateKeyNodeData>(props.id, {
        privateKey: '',
        publicKey: '',
      })
    }
  }, [privateKey, updateNodeData, props.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrivateKey(e.target.value)
  }

  const nodeStyles = getNodeStyles(props.type)

  return (
    <CustomNode {...props}>
      <div className="relative pr-10">
        <Input
          value={privateKey}
          color={nodeStyles.color}
          onChange={handleChange}
          placeholder="Paste private key..."
          className={cn('', privateKey ? 'blur-[3px]' : 'blur-none')}
        />
      </div>
    </CustomNode>
  )
}
