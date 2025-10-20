import type { NodeType } from '@/types/node'
import type { XYPosition } from '@xyflow/react'
import { useRef, useState, type RefObject } from 'react'
import { useDraggable } from '@neodrag/react'
import { cn } from '@/lib/utils'
import { getNodeStyles } from '@/utils/node/node-style.utils'
import { getNodeConfig } from '@/utils/node/node-config-registry'

export interface DraggableNodeProps {
  type: NodeType
  onDrop: (nodeType: NodeType, position: XYPosition) => void
  className?: string
}

export const DraggableNode = ({ type, onDrop, className }: DraggableNodeProps) => {
  const draggableRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState<XYPosition>({ x: 0, y: 0 })

  useDraggable(draggableRef as RefObject<HTMLElement>, {
    position: position,
    onDrag: ({ offsetX, offsetY }) => {
      // Calculate position relative to the viewport
      setPosition({
        x: offsetX,
        y: offsetY,
      })
    },
    onDragEnd: ({ event }) => {
      setPosition({ x: 0, y: 0 })
      onDrop(type, {
        x: event.clientX,
        y: event.clientY,
      })
    },
  })

  const nodeConfig = getNodeConfig(type as NodeType)

  const nodeStyles = getNodeStyles(type)

  return (
    <>
      <div
        ref={draggableRef}
        style={{ backgroundColor: nodeStyles.color }}
        className={cn(
          'dndnode',
          'relative rounded-[8px] cursor-pointer pointer-events-auto py-3 bg-background border-border w-full border z-20',
          className
        )}
      >
        <div className="border border-border rounded-[8px] w-full h-3 bg-background absolute top-[-1px] left-0"></div>
        <div className="rounded-[8px] w-full text-foreground">
          <div className="flex items-center justify-center gap-1">
            <p className="uppercase text-[10px] leading-[12px] text-center font-bold">{nodeConfig.label}</p>
          </div>
        </div>
        <div className="border-border rounded-[8px] w-full h-3 bg-background absolute bottom-0 left-0"></div>
      </div>
      {/* <div
        className={cn(
          'rounded-[8px] absolute top-0 left-0 py-3 bg-background border-border w-full border z-10',
          className
        )}
      >
        <div style={{ backgroundColor: nodeStyles.color }} className="rounded-[8px] w-full text-foreground">
          <p className="uppercase text-[10px] leading-[12px] text-center font-bold">{nodeConfig.label}</p>
        </div>
      </div> */}
    </>
  )
}
