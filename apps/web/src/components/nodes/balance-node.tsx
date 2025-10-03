import { useCallback, useEffect, useMemo, useState } from 'react'
import { CustomNode } from '../ui/custom-node'
import type { BalanceNodeData, BalanceNodeType } from '@/types/nodes/balance-node'
import { useNodeActions } from '@/hooks/flow/use-node-actions'
import type { ActionsFor, NodeTypeEnum, TargetFieldsForEnum } from '@/types/node'
import { useSolanaBalance } from '@/hooks/solana/query/use-solana-balance'
import { useTypedNodesData } from '@/hooks/flow/use-typed-nodes-data'
import { useTypedReactFlow } from '@/hooks/flow/use-typed-react-flow'
import type { Network } from '@/types/network'
import { type NodeProps } from '@xyflow/react'
import { useTokenBalance } from '@/hooks/solana/query/use-token-balance'

export const BalanceNode = (props: NodeProps<BalanceNodeType>) => {
  const { updateNodeData } = useTypedReactFlow()
  const [key, setKey] = useState(1)
  const updateKey = useCallback(() => {
    setKey(key + 1)
  }, [key])

  const resolved = useTypedNodesData<TargetFieldsForEnum<NodeTypeEnum.BALANCE>>(props.id)

  const data = useMemo(() => {
    return {
      pubkey: (resolved.pubkey?.value as string) ?? '',
      network: (resolved.network?.value as Network) ?? null,
      token: (resolved.token?.value as string) ?? '',
    }
  }, [resolved])

  const { data: balanceData } = useSolanaBalance(data.pubkey, data.network, key)
  const { data: tokenBalanceData } = useTokenBalance(data.pubkey, data.network, data.token, key)
  useEffect(() => {
    if (!data.token) {
      if (balanceData) {
        updateNodeData<BalanceNodeData>(props.id, {
          balance: balanceData.uiBalance,
          balanceRaw: balanceData.rawBalance,
        })
      }
    } else {
      if (tokenBalanceData) {
        updateNodeData<BalanceNodeData>(props.id, {
          balance: tokenBalanceData.uiBalance,
          balanceRaw: tokenBalanceData.rawBalance,
        })
      }
    }
  }, [balanceData, props.id, updateNodeData, tokenBalanceData, data.token])

  const actions = useNodeActions<ActionsFor<NodeTypeEnum.BALANCE>>(props.type, {
    Refresh: updateKey,
  })

  return <CustomNode {...props} actions={actions} />
}
