import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { Info } from 'lucide-react'
import type { NodeType } from '@/types/node'
import { getNodeTooltip } from '@/constants/node-tooltips'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

export const TooltipProvider = TooltipPrimitive.Provider
export const Tooltip = TooltipPrimitive.Root
export const TooltipTrigger = TooltipPrimitive.Trigger

export function TooltipContent({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>) {
  return <TooltipPrimitive.Content side="bottom" sideOffset={8} className={className} {...props} />
}

interface BaseTooltipProps {
  trigger?: React.ReactNode
  content?: React.ReactNode
  type?: NodeType
}

export const BaseTooltip = ({ trigger, content, type }: BaseTooltipProps) => {
  const [open, setOpen] = React.useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <button
            type="button"
            aria-label="Node info"
            className="inline-flex items-center text-foreground/80 hover:text-foreground"
          >
            <Info size={10} />
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <div className="text-sm leading-5 space-y-2">{content ? content : getNodeTooltip(type as NodeType)}</div>
      </DialogContent>
    </Dialog>
  )
}
