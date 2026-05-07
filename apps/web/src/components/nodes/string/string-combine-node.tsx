import { useEffect, useMemo } from 'react'
import type { NodeProps } from '@xyflow/react'
import { CustomNode } from '../../ui/custom-node'
import { useTypedNodesData } from '@/hooks/flow/use-typed-nodes-data'
import { useTypedReactFlow } from '@/hooks/flow/use-typed-react-flow'
import type { NodeTypeEnum, TargetFieldsForEnum } from '@/types/node'
import type { StringCombineNodeData, StringCombineNodeType } from '@/types/nodes/string/string-combine-node'
import { toText } from '@/utils/string/string-node.utils'
import { StringNodeContent, StringNodePreview } from './string-node-content'

export const StringCombineNode = (props: NodeProps<StringCombineNodeType>) => {
  const { updateNodeData } = useTypedReactFlow()
  const resolved = useTypedNodesData<TargetFieldsForEnum<NodeTypeEnum.STRING_COMBINE>>(props.id)

  const text = useMemo(() => [resolved.a?.value, resolved.b?.value, resolved.c?.value].map(toText).join(''), [resolved])

  useEffect(() => {
    updateNodeData<StringCombineNodeData>(props.id, { text })
  }, [props.id, text, updateNodeData])

  return (
    <CustomNode {...props}>
      <StringNodeContent>
        <StringNodePreview value={text} />
      </StringNodeContent>
    </CustomNode>
  )
}
