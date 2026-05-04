import { useEffect, useMemo } from 'react'
import type { NodeProps } from '@xyflow/react'
import { CustomNode } from '../ui/custom-node'
import { useTypedNodesData } from '@/hooks/flow/use-typed-nodes-data'
import { useTypedReactFlow } from '@/hooks/flow/use-typed-react-flow'
import type { NodeTypeEnum, TargetFieldsForEnum } from '@/types/node'
import type { StringLengthNodeData, StringLengthNodeType } from '@/types/nodes/string-length-node'
import { getUtf8ByteLength, toText } from '@/utils/string/string-node.utils'
import { StringNodeContent, StringNodeRows } from './string-node-content'

export const StringLengthNode = (props: NodeProps<StringLengthNodeType>) => {
  const { updateNodeData } = useTypedReactFlow()
  const resolved = useTypedNodesData<TargetFieldsForEnum<NodeTypeEnum.STRING_LENGTH>>(props.id)

  const text = useMemo(() => toText(resolved.text?.value), [resolved])
  const chars = useMemo(() => Array.from(text).length, [text])
  const bytes = useMemo(() => getUtf8ByteLength(text), [text])

  useEffect(() => {
    updateNodeData<StringLengthNodeData>(props.id, { chars, bytes })
  }, [bytes, chars, props.id, updateNodeData])

  return (
    <CustomNode {...props}>
      <StringNodeContent>
        <StringNodeRows
          rows={[
            ['chars', chars],
            ['bytes', bytes],
          ]}
        />
      </StringNodeContent>
    </CustomNode>
  )
}
