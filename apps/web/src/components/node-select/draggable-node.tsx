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
        className={cn(
          'dndnode',
          'group relative cursor-pointer pointer-events-auto w-full z-20',
          'rounded-[8px] overflow-hidden border border-border bg-background/60 hover:bg-background transition-colors',
          className
        )}
      >
        <div
          className={cn(
            'absolute top-0 left-0 bottom-0 w-full hover:bg-background transition-all duration-300 ease-out',
            'rounded-[8px]'
          )}
          style={{
            background: `linear-gradient(90deg, ${nodeStyles.color} 0%, #171717 90%`,
          }}
        ></div>

        <div className="relative w-full text-foreground">
          <div className="flex items-center justify-center gap-1 px-4 py-3">
            <p className="uppercase text-[10px] leading-[12px] text-center font-bold">{nodeConfig.label}</p>
          </div>
        </div>
      </div>
    </>
  )
}
