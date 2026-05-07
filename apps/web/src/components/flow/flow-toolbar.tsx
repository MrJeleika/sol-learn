import { Panel, useReactFlow } from '@xyflow/react'
import { Share2, RotateCcw, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { useFlowStore } from '@/stores/flow-store'
import { buildShareUrl, clearFlowHash } from '@/utils/flow/share'
import { ExampleFlowsModal } from './example-flows-modal'

export const FlowToolbar = () => {
  const resetFlow = useFlowStore((s) => s.resetFlow)
  const { getViewport } = useReactFlow()
  const [examplesOpen, setExamplesOpen] = useState(false)

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

  const buttonClass =
    'flex items-center gap-1.5 rounded-md border border-border bg-[#141414] px-3 py-1.5 text-xs font-mono text-foreground hover:bg-[#1f1f1f] transition-colors cursor-pointer'

  return (
    <>
      <Panel position="bottom-left">
        <div className="flex gap-2 ml-[30px]">
          <button type="button" onClick={() => setExamplesOpen(true)} className={buttonClass}>
            <Sparkles className="h-3.5 w-3.5" />
            Examples
          </button>
          <button type="button" onClick={handleShare} className={buttonClass}>
            <Share2 className="h-3.5 w-3.5" />
            Share
          </button>
          <button type="button" onClick={handleReset} className={buttonClass}>
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </button>
        </div>
      </Panel>
      <ExampleFlowsModal open={examplesOpen} onOpenChange={setExamplesOpen} />
    </>
  )
}
