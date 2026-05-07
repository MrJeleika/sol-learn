import { useEffect, useMemo } from 'react'
import type { NodeProps } from '@xyflow/react'
import { CustomNode } from '../../ui/custom-node'
import { useTypedNodesData } from '@/hooks/flow/use-typed-nodes-data'
import { useTypedReactFlow } from '@/hooks/flow/use-typed-react-flow'
import type { NodeTypeEnum, TargetFieldsForEnum } from '@/types/node'
import type { StringReplaceNodeData, StringReplaceNodeType } from '@/types/nodes/string/string-replace-node'
import { toText } from '@/utils/string/string-node.utils'
import { StringNodeContent, StringNodePreview } from './string-node-content'

export const StringReplaceNode = (props: NodeProps<StringReplaceNodeType>) => {
  const { updateNodeData } = useTypedReactFlow()
  const resolved = useTypedNodesData<TargetFieldsForEnum<NodeTypeEnum.STRING_REPLACE>>(props.id)

  const text = useMemo(() => toText(resolved.text?.value), [resolved])
  const find = useMemo(() => toText(resolved.find?.value), [resolved])
  const replacement = useMemo(() => toText(resolved.replacement?.value), [resolved])
  const result = useMemo(() => (find ? text.split(find).join(replacement) : text), [find, replacement, text])

  useEffect(() => {
    updateNodeData<StringReplaceNodeData>(props.id, { text: result })
  }, [props.id, result, updateNodeData])

  return (
    <CustomNode {...props}>
      <StringNodeContent>
        <StringNodePreview value={result} />
      </StringNodeContent>
    </CustomNode>
  )
}
