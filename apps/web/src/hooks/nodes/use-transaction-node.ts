import { useCallback, useEffect, useMemo, useState } from 'react'
import { Keypair, Transaction } from '@solana/web3.js'
import { Position, useUpdateNodeInternals } from '@xyflow/react'
import type { Network } from '@/types/network'
import type { TransactionNodeData, TransactionStatus } from '@/types/nodes/transaction-node'
import { useTypedNodesData } from '@/hooks/flow/use-typed-nodes-data'
import { useTypedReactFlow } from '@/hooks/flow/use-typed-react-flow'
import { getSolanaConnection } from '@/constants/solana/connection'
import { createKeypairFromPrivateKey, getRequiredSigners, truncatePubkey } from '@/utils/solana/transaction.utils'

export const useTransactionNode = (nodeId: string) => {
  const { updateNodeData } = useTypedReactFlow()
  const updateNodeInternals = useUpdateNodeInternals()
  const [status, setStatus] = useState<TransactionStatus>('idle')

  const resolved = useTypedNodesData<'privateKey' | 'network' | 'transaction'>(nodeId)

  const inputs = useMemo(() => {
    return {
      privateKey: (resolved.privateKey?.value as string) ?? '',
      network: (resolved.network?.value as Network) ?? null,
      transaction: (resolved.transaction?.value as Transaction | null) ?? null,
    }
  }, [resolved])

  const feePayerKeypair = useMemo(() => {
    if (!inputs.privateKey) return null
    return createKeypairFromPrivateKey(inputs.privateKey)
  }, [inputs.privateKey])

  const requiredSigners = useMemo(() => {
    return getRequiredSigners(inputs.transaction)
  }, [inputs.transaction])

  const additionalSigners = useMemo(() => {
    if (!inputs.privateKey || !feePayerKeypair) return []
    if (requiredSigners.length <= 1) return []

    return requiredSigners.filter((signer) => signer.toBase58() !== feePayerKeypair.publicKey.toBase58())
  }, [inputs.privateKey, feePayerKeypair, requiredSigners])

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
    updateNodeInternals(nodeId)
  }, [extraHandles, nodeId, updateNodeInternals])

  const collectAdditionalSigners = useCallback(() => {
    const signers: Keypair[] = []
    const resolvedMap = resolved as unknown as Record<string, { value: unknown }>

    for (let i = 0; i < additionalSigners.length; i++) {
      const signerPrivateKey = resolvedMap[`signer_${i}`]?.value as string | undefined

      if (signerPrivateKey) {
        const signerKeypair = createKeypairFromPrivateKey(signerPrivateKey)
        if (signerKeypair) {
          const expectedPubkey = additionalSigners[i].toBase58()
          const actualPubkey = signerKeypair.publicKey.toBase58()

          if (expectedPubkey === actualPubkey) {
            signers.push(signerKeypair)
          } else {
            console.warn(`Signer ${i} mismatch. Expected: ${expectedPubkey}, Got: ${actualPubkey}`)
          }
        } else {
          console.error(`Failed to decode signer ${i}`)
        }
      } else {
        console.warn(`Missing signer ${i} for ${additionalSigners[i].toBase58()}`)
      }
    }

    return signers
  }, [additionalSigners, resolved])

  const handleSend = useCallback(async () => {
    if (!feePayerKeypair || !inputs.network || !inputs.transaction) return
    if (inputs.transaction.instructions.length === 0) {
      setStatus('failed')
      updateNodeData<TransactionNodeData>(nodeId, { status: 'failed' })
      return
    }

    try {
      setStatus('pending')
      updateNodeData<TransactionNodeData>(nodeId, { status: 'pending' })

      const connection = getSolanaConnection(inputs.network)
      const tx = inputs.transaction

      tx.feePayer = feePayerKeypair.publicKey
      tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash

      const allSigners: Keypair[] = [feePayerKeypair, ...collectAdditionalSigners()]

      tx.sign(...allSigners)
      const raw = tx.serialize()
      const sig = await connection.sendRawTransaction(raw, { skipPreflight: false })

      await connection.confirmTransaction({ signature: sig, ...(await connection.getLatestBlockhash()) }, 'confirmed')

      updateNodeData<TransactionNodeData>(nodeId, { signature: sig, status: 'success' })
      setStatus('success')
    } catch (e) {
      console.error(e)
      updateNodeData<TransactionNodeData>(nodeId, { status: 'failed' })
      setStatus('failed')
    }
  }, [feePayerKeypair, inputs.network, inputs.transaction, nodeId, updateNodeData, collectAdditionalSigners])

  return {
    status,
    extraHandles,
    handleSend,
  }
}
