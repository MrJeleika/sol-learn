import { useEffect } from 'react'
import { CustomNode } from '../../ui/custom-node'
import type { NodeProps } from '@xyflow/react'
import type { WalletNodeData, WalletNodeType } from '@/types/nodes/wallet/wallet-node'
import { useTypedReactFlow } from '@/hooks/flow/use-typed-react-flow'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { Wallet as WalletIcon, LogOut } from 'lucide-react'
import { truncatePubkey } from '@/utils/solana/transaction.utils'
import { toast } from 'sonner'

export const WalletNode = (props: NodeProps<WalletNodeType>) => {
  const { updateNodeData } = useTypedReactFlow()
  const { wallet, publicKey, connected, disconnect } = useWallet()
  const { setVisible } = useWalletModal()

  useEffect(() => {
    const pk = publicKey?.toBase58() ?? ''
    updateNodeData<WalletNodeData>(props.id, {
      publicKey: pk,
      wallet: pk ? { kind: 'wallet', publicKey: pk } : null,
    })
  }, [publicKey, props.id, updateNodeData])

  const handleConnect = () => setVisible(true)

  const handleDisconnect = async () => {
    try {
      await disconnect()
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Failed to disconnect')
    }
  }

  return (
    <CustomNode {...props}>
      <div className="flex flex-col gap-2 pr-10">
        {connected && publicKey ? (
          <>
            <div className="flex items-center gap-2">
              {wallet?.adapter.icon && <img src={wallet.adapter.icon} alt={wallet.adapter.name} className="w-4 h-4" />}
              <span className="text-[10px] font-mono">{wallet?.adapter.name}</span>
            </div>
            <div className="text-[8px] font-mono text-muted-foreground">{truncatePubkey(publicKey.toBase58())}</div>
            <button
              type="button"
              onClick={handleDisconnect}
              className="flex items-center justify-center gap-1 rounded-md border border-border bg-background px-2 py-1 text-[10px] font-mono text-foreground hover:bg-[#1f1f1f] transition-colors cursor-pointer"
            >
              <LogOut className="w-2.5 h-2.5" />
              Disconnect
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={handleConnect}
            className="flex items-center justify-center gap-1.5 rounded-md border border-border bg-background px-2 py-1.5 text-[10px] font-mono text-foreground hover:bg-[#1f1f1f] transition-colors cursor-pointer"
          >
            <WalletIcon className="w-3 h-3" />
            Connect Wallet
          </button>
        )}
      </div>
    </CustomNode>
  )
}
