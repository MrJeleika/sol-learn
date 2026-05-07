import { useEffect, useMemo, useState } from 'react'
import type { NodeProps } from '@xyflow/react'
import { CustomNode } from '../../ui/custom-node'
import { useTypedNodesData } from '@/hooks/flow/use-typed-nodes-data'
import { useTypedReactFlow } from '@/hooks/flow/use-typed-react-flow'
import type { NodeTypeEnum, TargetFieldsForEnum } from '@/types/node'
import type { StringDecodeNodeData, StringDecodeNodeType } from '@/types/nodes/utils/string-decode-node'
import { decodeString, toText, type StringEncoding } from '@/utils/string/string-node.utils'
import { getNodeStyles } from '@/utils/node/node-style.utils'
import { StringEncodingSelect } from './string-encoding-select'
import { StringNodeContent, StringNodePreview } from '../string/string-node-content'

export const StringDecodeNode = (props: NodeProps<StringDecodeNodeType>) => {
  const [encoding, setEncoding] = useState<StringEncoding>(props.data.encoding ?? 'base64')
  const { updateNodeData } = useTypedReactFlow()
  const resolved = useTypedNodesData<TargetFieldsForEnum<NodeTypeEnum.STRING_DECODE>>(props.id)
  const nodeStyles = getNodeStyles(props.type)

  const input = useMemo(() => toText(resolved.input?.value), [resolved])
  const text = useMemo(() => decodeString(input, encoding), [encoding, input])

  useEffect(() => {
    updateNodeData<StringDecodeNodeData>(props.id, { encoding, text })
  }, [encoding, props.id, text, updateNodeData])

  return (
    <CustomNode {...props}>
      <StringNodeContent className="gap-2">
        <StringEncodingSelect color={nodeStyles.color} value={encoding} onChange={setEncoding} />
        <StringNodePreview value={text} />
      </StringNodeContent>
    </CustomNode>
  )
}
