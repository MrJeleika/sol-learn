import { useEffect, useState } from 'react'
import type { NodeProps } from '@xyflow/react'
import { Check, X } from 'lucide-react'
import { CustomNode } from '../../ui/custom-node'
import { useTypedReactFlow } from '@/hooks/flow/use-typed-react-flow'
import type { BooleanNodeData, BooleanNodeType } from '@/types/nodes/logic/boolean-node'
import { getNodeStyles } from '@/utils/node/node-style.utils'
import { cn } from '@/lib/utils'

export const BooleanNode = (props: NodeProps<BooleanNodeType>) => {
  const [value, setValue] = useState(Boolean(props.data.value))
  const { updateNodeData } = useTypedReactFlow()
  const nodeStyles = getNodeStyles(props.type)

  useEffect(() => {
    updateNodeData<BooleanNodeData>(props.id, { value })
  }, [props.id, updateNodeData, value])

  const toggleValue = () => setValue((current) => !current)

  return (
    <CustomNode {...props}>
      <button
        style={{ '--primary': nodeStyles.color } as React.CSSProperties}
        className={cn(
          'mx-auto flex h-6 min-w-16 items-center justify-center gap-1 rounded-md border border-input px-2 text-[9px] leading-[10px] font-medium transition-colors',
          'hover:border-primary active:scale-95'
        )}
        onClick={toggleValue}
      >
        {value ? <Check className="size-3 text-green-500" /> : <X className="size-3 text-red-500" />}
        {String(value)}
      </button>
    </CustomNode>
  )
}
