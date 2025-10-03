import { cn } from '@/lib/utils'
import type { NodeType } from '@/types/node'
import { getNodeStyles } from '@/utils/node/node-style.utils'
import { Handle, type Node } from '@xyflow/react'
import type { PropsWithChildren } from 'react'
import { getNodeConfig } from '@/utils/node/node-config-registry'
import type { NodeActionConfig } from '@/types/node-action'

interface Props extends PropsWithChildren, Node {
  className?: string
  actions?: NodeActionConfig[]
}

const handleSpacing = 12

export const CustomNode = ({ className, children, selected, type, id, actions }: Props) => {
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

          return (
            <Handle
              key={id + '-' + handle.dataField + '-' + handle.dataType + '-' + handle.position}
              id={id + '-' + handle.dataField + '-' + handle.dataType + '-' + handle.position}
              className="top-1/2"
              type={handle.type}
              position={handle.position}
              style={{ marginTop: offsetFromCenter }}
              data-type={handle.dataType}
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
              className="absolute cursor-pointer group top-1/2 flex transition-all active:scale-90 items-center gap-0.5 translate-x-[-16px] translate-y-[-50%]"
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
