import { cn } from '@/lib/utils'
import type { NodeType } from '@/types/nodes/base'
import { getNodeStyles } from '@/utils/node/node-style.utils'
import { Handle, type Node } from '@xyflow/react'
import type { PropsWithChildren } from 'react'
import { getNodeConfig } from '@/utils/node/node-configs'

interface Props extends PropsWithChildren, Node {
  className?: string
}

export const CustomNode = ({ className, children, selected, type }: Props) => {
  const nodeStyles = getNodeStyles(type as NodeType)
  const nodeConfig = getNodeConfig(type as NodeType)
  return (
    <div style={{ width: nodeStyles.width }} className={cn('relative rounded-[8px] text-[#e2e8f0]')}>
      <div
        style={{ height: nodeStyles.height, minHeight: 40 }}
        className={cn(
          'relative z-20',
          'p-3 rounded-[8px] transition-all bg-[#171717] border-[#1f1f1f] border',
          className,
          selected && 'border-[#313131] bg-[#1f1f1f]'
        )}
      >
        {nodeConfig.handles.map((handle) => (
          <Handle key={handle.position} className="relative" type={handle.type} position={handle.position}>
            <div className={cn('absolute text-[8px] -top-[5px]', handle.type === 'target' ? 'left-1.5' : 'right-1.5')}>
              {handle.label}
            </div>
          </Handle>
        ))}
        {children}
      </div>
      <div
        style={{ backgroundColor: nodeStyles.color }}
        className={cn(
          'absolute z-10 top-0 flex items-end justify-center left-0 h-[calc(100%+12px)] w-full border-[#1f1f1f] border rounded-[8px]',
          selected && 'border-[#313131]'
        )}
      >
        <p className="uppercase text-[10px] leading-[12px] font-bold">{nodeConfig.label}</p>
      </div>
    </div>
  )
}
