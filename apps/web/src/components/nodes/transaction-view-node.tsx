import { useCallback, useEffect, useMemo, useState } from 'react'
import { CustomNode } from '../ui/custom-node'
import type { TransactionViewNodeData, TransactionViewNodeType } from '@/types/nodes/transaction-view-node'
import { useNodeActions } from '@/hooks/flow/use-node-actions'
import type { ActionsFor, NodeTypeEnum, TargetFieldsForEnum } from '@/types/node'
import { useTypedNodesData } from '@/hooks/flow/use-typed-nodes-data'
import { useTypedReactFlow } from '@/hooks/flow/use-typed-react-flow'
import type { Network } from '@/types/network'
import type { NodeProps } from '@xyflow/react'
import { useTransactionBySignature } from '@/hooks/solana/query/use-transaction'

export const TransactionViewNode = (props: NodeProps<TransactionViewNodeType>) => {
  const { updateNodeData } = useTypedReactFlow()
  const [key, setKey] = useState(1)
  const updateKey = useCallback(() => {
    setKey(key + 1)
  }, [key])

  const resolved = useTypedNodesData<TargetFieldsForEnum<NodeTypeEnum.TRANSACTION_VIEW>>(props.id)

  const data = useMemo(() => {
    return {
      signature: (resolved.signature?.value as string) ?? '',
      network: (resolved.network?.value as Network) ?? null,
    }
  }, [resolved])

  const { data: txData } = useTransactionBySignature(data.signature, data.network, key)
  console.log(txData)
  useEffect(() => {
    if (txData) {
      updateNodeData<TransactionViewNodeData>(props.id, {
        transactionJson: txData.transactionJson,
        slot: txData.slot,
        blockTime: txData.blockTime,
      })
    }
  }, [txData, props.id, updateNodeData])

  const actions = useNodeActions<ActionsFor<NodeTypeEnum.TRANSACTION_VIEW>>(props.type, {
    Refresh: updateKey,
  })

  return <CustomNode {...props} actions={actions} />
}
