import { useEffect, useMemo } from 'react'
import type { NodeProps } from '@xyflow/react'
import { CustomNode } from '../ui/custom-node'
import { useTypedNodesData } from '@/hooks/flow/use-typed-nodes-data'
import { useTypedReactFlow } from '@/hooks/flow/use-typed-react-flow'
import type { NodeTypeEnum, TargetFieldsForEnum } from '@/types/node'
import type { StringSplitNodeData, StringSplitNodeType } from '@/types/nodes/string-split-node'
import { toText } from '@/utils/string/string-node.utils'
import { StringNodeContent, StringNodePreview } from './string-node-content'

export const StringSplitNode = (props: NodeProps<StringSplitNodeType>) => {
  const { updateNodeData } = useTypedReactFlow()
  const resolved = useTypedNodesData<TargetFieldsForEnum<NodeTypeEnum.STRING_SPLIT>>(props.id)

  const text = useMemo(() => toText(resolved.text?.value), [resolved])
  const separator = useMemo(() => toText(resolved.separator?.value), [resolved])
  const parts = useMemo(() => text.split(separator), [separator, text])
  const first = parts[0] ?? ''
  const last = parts.at(-1) ?? ''
  const json = JSON.stringify(parts)

  useEffect(() => {
    updateNodeData<StringSplitNodeData>(props.id, { first, last, count: parts.length, json })
  }, [first, json, last, parts.length, props.id, updateNodeData])

  return (
    <CustomNode {...props}>
      <StringNodeContent>
        <StringNodePreview value={json} />
      </StringNodeContent>
    </CustomNode>
  )
}
