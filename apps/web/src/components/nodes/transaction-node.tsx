import { CustomNode } from '../ui/custom-node'
import type { TransactionNodeType } from '@/types/nodes/transaction-node'
import type { ActionsFor, NodeTypeEnum } from '@/types/node'
import { useNodeActions } from '@/hooks/flow/use-node-actions'
import type { NodeProps } from '@xyflow/react'
import { Check, Loader2, X } from 'lucide-react'
import { useTransactionNode } from '@/hooks/nodes/use-transaction-node'

export const TransactionNode = (props: NodeProps<TransactionNodeType>) => {
  const { status, extraHandles, handleSend } = useTransactionNode(props.id)

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
