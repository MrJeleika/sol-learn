import { useEffect, useMemo } from 'react'
import type { NodeProps } from '@xyflow/react'
import { CustomNode } from '../ui/custom-node'
import { useTypedNodesData } from '@/hooks/flow/use-typed-nodes-data'
import { useTypedReactFlow } from '@/hooks/flow/use-typed-react-flow'
import type { NodeTypeEnum, TargetFieldsForEnum } from '@/types/node'
import type { StringSearchNodeData, StringSearchNodeType } from '@/types/nodes/string-search-node'
import { toText } from '@/utils/string/string-node.utils'
import { StringNodeContent, StringNodeRows } from './string-node-content'

export const StringSearchNode = (props: NodeProps<StringSearchNodeType>) => {
  const { updateNodeData } = useTypedReactFlow()
  const resolved = useTypedNodesData<TargetFieldsForEnum<NodeTypeEnum.STRING_SEARCH>>(props.id)

  const text = useMemo(() => toText(resolved.text?.value), [resolved])
  const term = useMemo(() => toText(resolved.term?.value), [resolved])
  const first = useMemo(() => (term ? text.indexOf(term) : -1), [term, text])
  const last = useMemo(() => (term ? text.lastIndexOf(term) : -1), [term, text])

  useEffect(() => {
    updateNodeData<StringSearchNodeData>(props.id, { first, last })
  }, [first, last, props.id, updateNodeData])

  return (
    <CustomNode {...props}>
      <StringNodeContent>
        <StringNodeRows
          rows={[
            ['first', first],
            ['last', last],
          ]}
        />
      </StringNodeContent>
    </CustomNode>
  )
}
