import { cn } from '@/lib/utils'
import { NodeTypeEnum, type NodeType } from '@/types/node'
import { getNodeStyles } from '@/utils/node/node-style.utils'
import { Handle, Position, useReactFlow, useUpdateNodeInternals, type NodeProps } from '@xyflow/react'
import type { PropsWithChildren } from 'react'
import { getNodeConfig } from '@/utils/node/node-config-registry'
import type { NodeActionConfig } from '@/types/node-action'
import { generateNodeId } from '@/utils/crypto/crypto.utils'

interface Props extends PropsWithChildren, NodeProps {
  className?: string
  actions?: NodeActionConfig[]
}

const handleSpacing = 12

export const CustomNode = ({
  className,
  children,
  selected,
  type,
  id,
  actions,
  positionAbsoluteX,
  positionAbsoluteY,
}: Props) => {
  const { setNodes, setEdges } = useReactFlow()
  const updateNodeInternals = useUpdateNodeInternals()

  const nodeStyles = getNodeStyles(type as NodeType)
  const nodeConfig = getNodeConfig(type as NodeType)
  // Track how many handles we have rendered per position to stack them
  const handleIndices: Record<string, number> = {}
  const handleCounts: Record<string, number> = {}

  nodeConfig.handles.forEach((h) => {
    const key = String(h.position)
    handleCounts[key] = (handleCounts[key] ?? 0) + 1
  })

  actions?.forEach((action) => {
    const posKey = String(action.position)
    handleCounts[posKey] = (handleCounts[posKey] ?? 0) + 1
  })

  const maxHandleCount = Math.max(...Object.values(handleCounts))

  const minHeight = Math.max(maxHandleCount * 16, nodeStyles.height ?? 0)

  const addDisplayNodeOnDoubleClick = (handleId: string, position: Position) => {
    if (position === Position.Left) return

    const newPosition = { x: positionAbsoluteX + (nodeStyles.width ?? 200) + 50, y: positionAbsoluteY }
    const newId = generateNodeId()
    setNodes((nds) =>
      nds.concat({
        id: newId,
        type: NodeTypeEnum.DISPLAY,
        position: newPosition,
        data: {},
      })
    )

    const targetHandle = newId + '-' + 'input' + '-' + Position.Left

    setTimeout(() => {
      updateNodeInternals(newId)
      setEdges((eds) =>
        eds.concat({
          id: 'xy-edge__' + handleId + '-' + targetHandle,
          source: id,
          sourceHandle: handleId,
          target: newId,
          targetHandle,
        })
      )
    }, 0)
  }

  return (
    <div style={{ width: nodeStyles.width }} className={cn('relative rounded-[8px] text-foreground')}>
      <div
        style={{ height: nodeStyles.height ?? 'auto', minHeight }}
        className={cn(
          'relative z-20',
          'p-3 rounded-[8px] transition-all bg-background border-border border',
          className,
          selected && 'border-active-border bg-border'
        )}
      >
        {nodeConfig.handles.map((handle) => {
          const posKey = String(handle.position)
          const index = handleIndices[posKey] ?? 0
          const count = handleCounts[posKey] ?? 1
          const offsetFromCenter = (index - (count - 1) / 2) * handleSpacing

          handleIndices[posKey] = index + 1

          const handleId = id + '-' + handle.dataField + '-' + handle.position
          return (
            <Handle
              key={handleId}
              id={handleId}
              onDoubleClick={() => addDisplayNodeOnDoubleClick(handleId, handle.position)}
              className="top-1/2"
              type={handle.type}
              position={handle.position}
              style={{ marginTop: offsetFromCenter }}
              data-field={handle.dataField}
            >
              <div
                className={cn(
                  'absolute text-[7px] whitespace-nowrap top-1/2 translate-y-[-50%]',
                  handle.type === 'target' ? 'left-1.5' : 'right-1.5'
                )}
              >
                {handle.label}
              </div>
            </Handle>
          )
        })}
        {actions?.map((action) => {
          const posKey = String(action.position)
          const index = handleIndices[posKey] ?? 0
          const count = handleCounts[posKey] ?? 1
          const offsetFromCenter = (index - (count - 1) / 2) * handleSpacing

          handleIndices[posKey] = index + 1
          return (
            <button
              onClick={action.onClick}
              key={id + '-' + action.label + '-' + action.position}
              className={cn(
                'absolute cursor-pointer group top-1/2 flex transition-all active:scale-90 items-center gap-0.5 translate-y-[-50%]',
                action.position === Position.Left ? 'left-0 -translate-x-1' : 'right-0 translate-x-1 flex-row-reverse'
              )}
              style={{ marginTop: offsetFromCenter }}
            >
              <div style={{ backgroundColor: nodeStyles.color }} className="rounded-[2px] p-1"></div>
              <div className={cn('text-[7px] leading-[10px]')}>{action.label}</div>
            </button>
          )
        })}
        {children}
      </div>
      <div
        style={{ backgroundColor: nodeStyles.color }}
        className={cn(
          'absolute z-10 top-0 flex items-end justify-center left-0 h-[calc(100%+12px)] w-full border-border border rounded-[8px]',
          selected && 'border-active-border'
        )}
      >
        <p className="uppercase text-[10px] leading-[12px] font-bold">{nodeConfig.label}</p>
      </div>
    </div>
  )
}
