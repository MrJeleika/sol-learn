import { MovingLineItem } from '@/app/types/moving-line'

interface NodesTextProps {
  hoveredItem: MovingLineItem | null
}

const defaultText = `Nodes are visual building blocks that represent Solana actions and data.
Connect a node's output handle to another node's input to pass values through the flow.
For example: use a Keypair node to create a signer, connect it to a Transaction Builder node, then attach Instruction nodes. Finally, send the Transaction node to execute on chain.`

export const NodesText = ({ hoveredItem }: NodesTextProps) => {
  return (
    <div>
      <p className="text-lg leading-relaxed whitespace-pre-line">{hoveredItem?.text ?? defaultText}</p>
    </div>
  )
}
