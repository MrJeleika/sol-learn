import { useCallback, useMemo, useState } from 'react'
import { CustomNode } from '../ui/custom-node'
import type { TransactionNodeData, TransactionNodeType, TransactionStatus } from '@/types/nodes/transaction-node'
import { useTypedNodesData } from '@/hooks/flow/use-typed-nodes-data'
import type { ActionsFor, NodeTypeEnum } from '@/types/node'
import type { Network } from '@/types/network'
import { useTypedReactFlow } from '@/hooks/flow/use-typed-react-flow'
import { useNodeActions } from '@/hooks/flow/use-node-actions'
import { getSolanaConnection } from '@/constants/solana/connection'
import { Keypair, Transaction } from '@solana/web3.js'
import bs58 from 'bs58'
import type { NodeProps } from '@xyflow/react'
import { Check, Loader2, X } from 'lucide-react'

export const TransactionNode = (props: NodeProps<TransactionNodeType>) => {
  const { updateNodeData } = useTypedReactFlow()
  const [status, setStatus] = useState<TransactionStatus>('idle')

  const resolved = useTypedNodesData<'privateKey' | 'network' | 'transaction'>(props.id)

  const inputs = useMemo(() => {
    return {
      privateKey: (resolved.privateKey?.value as string) ?? '',
      network: (resolved.network?.value as Network) ?? null,
      transaction: (resolved.transaction?.value as Transaction | null) ?? null,
    }
  }, [resolved])

  const handleSend = useCallback(async () => {
    if (!inputs.privateKey || !inputs.network || !inputs.transaction) return
    if (inputs.transaction.instructions.length === 0) {
      setStatus('failed')
      updateNodeData<TransactionNodeData>(props.id, { status: 'failed' })
      return
    }
    try {
      setStatus('pending')
      updateNodeData<TransactionNodeData>(props.id, { status: 'pending' })

      const connection = getSolanaConnection(inputs.network as Network)
      const kp = Keypair.fromSecretKey(bs58.decode(inputs.privateKey))

      const tx = new Transaction()
      // Copy existing instructions
      tx.add(...inputs.transaction.instructions)
      tx.feePayer = kp.publicKey
      tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash

      tx.sign(kp)
      const raw = tx.serialize()
      const sig = await connection.sendRawTransaction(raw, { skipPreflight: false })

      await connection.confirmTransaction({ signature: sig, ...(await connection.getLatestBlockhash()) }, 'confirmed')

      updateNodeData<TransactionNodeData>(props.id, { signature: sig, status: 'success' })
      setStatus('success')
    } catch (e) {
      console.error(e)
      updateNodeData<TransactionNodeData>(props.id, { status: 'failed' })
      setStatus('failed')
    }
  }, [inputs, props.id, updateNodeData])

  const actions = useNodeActions<ActionsFor<NodeTypeEnum.TRANSACTION>>(props.type, {
    Send: handleSend,
  })

  return (
    <CustomNode {...props} actions={actions}>
      <div className="mt-2 flex items-center gap-2 text-[10px] leading-[12px]">
        {status === 'pending' && (
          <>
            <Loader2 className="size-3 animate-spin" />
            <span>Sending...</span>
          </>
        )}
        {status === 'success' && (
          <>
            <Check className="size-3 text-green-500" />
            <span>Success</span>
          </>
        )}
        {status === 'failed' && (
          <>
            <X className="size-3 text-red-500" />
            <span>Failed</span>
          </>
        )}
      </div>
      {props.data?.signature && <div className="mt-1 text-[8px] break-all">{String(props.data.signature)}</div>}
    </CustomNode>
  )
}
