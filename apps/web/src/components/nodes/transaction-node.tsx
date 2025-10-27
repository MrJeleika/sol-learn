import { useCallback, useEffect, useMemo, useState } from 'react'
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
import { Position, useUpdateNodeInternals } from '@xyflow/react'
import { getRequiredSigners, truncatePubkey } from '@/utils/solana/transaction.utils'

export const TransactionNode = (props: NodeProps<TransactionNodeType>) => {
  const { updateNodeData } = useTypedReactFlow()
  const updateNodeInternals = useUpdateNodeInternals()
  const [status, setStatus] = useState<TransactionStatus>('idle')

  const resolved = useTypedNodesData<'privateKey' | 'network' | 'transaction'>(props.id)

  const inputs = useMemo(() => {
    return {
      privateKey: (resolved.privateKey?.value as string) ?? '',
      network: (resolved.network?.value as Network) ?? null,
      transaction: (resolved.transaction?.value as Transaction | null) ?? null,
    }
  }, [resolved])

  const feePayerPublicKey = useMemo(() => {
    if (!inputs.privateKey) return null
    try {
      const kp = Keypair.fromSecretKey(bs58.decode(inputs.privateKey))
      return kp.publicKey
    } catch {
      return null
    }
  }, [inputs.privateKey])

  const requiredSigners = useMemo(() => {
    return getRequiredSigners(inputs.transaction)
  }, [inputs.transaction])

  const additionalSigners = useMemo(() => {
    if (requiredSigners.length <= 1) return []
    if (!feePayerPublicKey) return requiredSigners.slice(1)

    return requiredSigners.filter((signer) => signer.toBase58() !== feePayerPublicKey.toBase58())
  }, [feePayerPublicKey, requiredSigners])

  const extraHandles = useMemo(() => {
    const handles: {
      position: Position
      type: 'target' | 'source'
      dataField: string
      label: string
      dataType?: string
    }[] = []

    additionalSigners.forEach((signer, index) => {
      handles.push({
        position: Position.Left,
        type: 'target',
        dataField: `signer_${index}`,
        label: `Signer ${truncatePubkey(signer.toBase58())}`,
        dataType: 'privateKey',
      })
    })

    return handles
  }, [additionalSigners])

  useEffect(() => {
    updateNodeInternals(props.id)
  }, [extraHandles, props.id, updateNodeInternals])

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
      const feePayerKeypair = Keypair.fromSecretKey(bs58.decode(inputs.privateKey))

      const tx = new Transaction()
      tx.add(...inputs.transaction.instructions)
      tx.feePayer = feePayerKeypair.publicKey
      tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash

      const allSigners: Keypair[] = [feePayerKeypair]

      // Get additional signers
      for (let i = 0; i < additionalSigners.length; i++) {
        const resolvedMap = resolved as unknown as Record<string, { value: unknown }>
        const signerPrivateKey = resolvedMap[`signer_${i}`]?.value as string | undefined

        if (signerPrivateKey) {
          try {
            const signerKeypair = Keypair.fromSecretKey(bs58.decode(signerPrivateKey))
            const expectedPubkey = additionalSigners[i].toBase58()
            const actualPubkey = signerKeypair.publicKey.toBase58()

            if (expectedPubkey === actualPubkey) {
              allSigners.push(signerKeypair)
            } else {
              console.warn(`Signer ${i} mismatch. Expected: ${expectedPubkey}, Got: ${actualPubkey}`)
            }
          } catch (e) {
            console.error(`Failed to decode signer ${i}:`, e)
          }
        } else {
          console.warn(`Missing signer ${i} for ${additionalSigners[i].toBase58()}`)
        }
      }

      tx.sign(...allSigners)

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
  }, [inputs, props.id, updateNodeData, additionalSigners, resolved])

  const actions = useNodeActions<ActionsFor<NodeTypeEnum.TRANSACTION>>(props.type, {
    Send: handleSend,
  })

  return (
    <CustomNode {...props} actions={actions} extraHandles={extraHandles}>
      <div className="mt-2 flex items-center gap-2 text-[10px] leading-[12px] justify-center">
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
