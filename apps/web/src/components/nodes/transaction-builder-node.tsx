import { useEffect } from 'react'
import { CustomNode } from '../ui/custom-node'
import type { TransactionBuilderNodeData, TransactionBuilderNodeType } from '@/types/nodes/transaction-builder-node'
import { useTypedReactFlow } from '@/hooks/flow/use-typed-react-flow'
import { Transaction } from '@solana/web3.js'
import type { NodeProps } from '@xyflow/react'

export const TransactionBuilderNode = (props: NodeProps<TransactionBuilderNodeType>) => {
  const { updateNodeData } = useTypedReactFlow()

  useEffect(() => {
    updateNodeData<TransactionBuilderNodeData>(props.id, { transaction: new Transaction() })
  }, [props.id, updateNodeData])

  return <CustomNode {...props} />
}
