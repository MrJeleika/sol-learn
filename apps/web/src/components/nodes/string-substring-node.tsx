import { useEffect, useMemo } from 'react'
import type { NodeProps } from '@xyflow/react'
import { CustomNode } from '../ui/custom-node'
import { useTypedNodesData } from '@/hooks/flow/use-typed-nodes-data'
import { useTypedReactFlow } from '@/hooks/flow/use-typed-react-flow'
import type { NodeTypeEnum, TargetFieldsForEnum } from '@/types/node'
import type { StringSubstringNodeData, StringSubstringNodeType } from '@/types/nodes/string-substring-node'
import { toNumber, toText } from '@/utils/string/string-node.utils'
import { StringNodeContent, StringNodePreview } from './string-node-content'

export const StringSubstringNode = (props: NodeProps<StringSubstringNodeType>) => {
  const { updateNodeData } = useTypedReactFlow()
  const resolved = useTypedNodesData<TargetFieldsForEnum<NodeTypeEnum.STRING_SUBSTRING>>(props.id)

  const text = useMemo(() => toText(resolved.text?.value), [resolved])
  const start = useMemo(() => Math.max(0, toNumber(resolved.start?.value, 0)), [resolved])
  const length = useMemo(() => {
    if (resolved.length?.value === undefined) return undefined
    return Math.max(0, toNumber(resolved.length.value, 0))
  }, [resolved])
  const substring = useMemo(() => {
    const chars = Array.from(text)
    return chars.slice(start, length === undefined ? undefined : start + length).join('')
  }, [length, start, text])

  useEffect(() => {
    updateNodeData<StringSubstringNodeData>(props.id, { text: substring })
  }, [props.id, substring, updateNodeData])

  return (
    <CustomNode {...props}>
      <StringNodeContent>
        <StringNodePreview value={substring} />
      </StringNodeContent>
    </CustomNode>
  )
}
