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
      <div ref={draggableRef} className={cn('dndnode', className)}>
        <div className="relative border-border md:w-[180px] border rounded-t-[6px]">
          <div className="cursor-grab active:cursor-grabbing relative z-30 group inline-flex h-9 w-full items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-border">
            <p className="text-sm font-medium text-foreground capitalize text-center">
              {nodeConfig.label.toLowerCase()}
            </p>
          </div>
          <div
            className="absolute -bottom-1 z-20 left-0 right-0 h-3 rounded-b-[6px]"
            style={{ backgroundColor: nodeStyles.color }}
          />
        </div>
      </div>
    </>
  )
}
