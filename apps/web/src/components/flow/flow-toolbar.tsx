import { Panel, useReactFlow } from '@xyflow/react'
import { Share2, RotateCcw } from 'lucide-react'
import { toast } from 'sonner'
import { useFlowStore } from '@/stores/flow-store'
import { buildShareUrl, clearFlowHash } from '@/utils/flow/share'

export const FlowToolbar = () => {
  const resetFlow = useFlowStore((s) => s.resetFlow)
  const { getViewport } = useReactFlow()

  const handleShare = async () => {
    const { nodes, edges } = useFlowStore.getState()
    const viewport = getViewport()
    const url = buildShareUrl({ nodes, edges, viewport })
    try {
      await navigator.clipboard.writeText(url)
      toast.success('Share link copied')
    } catch {
      toast.error('Failed to copy link')
    }
  }

  const handleReset = () => {
    resetFlow()
    clearFlowHash()
    toast.success('Canvas reset')
  }

  return (
    <Panel position="bottom-left">
      <div className="flex gap-2 ml-[30px]">
        <button
          type="button"
          onClick={handleShare}
          className="flex items-center gap-1.5 rounded-md border border-border bg-[#141414] px-3 py-1.5 text-xs font-mono text-foreground hover:bg-[#1f1f1f] transition-colors"
        >
          <Share2 className="h-3.5 w-3.5" />
          Share
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center gap-1.5 rounded-md border border-border bg-[#141414] px-3 py-1.5 text-xs font-mono text-foreground hover:bg-[#1f1f1f] transition-colors"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </button>
      </div>
    </Panel>
  )
}
