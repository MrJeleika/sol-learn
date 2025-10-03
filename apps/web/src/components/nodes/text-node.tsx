import { useTypedReactFlow } from '@/hooks/flow/use-typed-react-flow'
import { CustomNode } from '../ui/custom-node'
import { useState } from 'react'
import type { TextNodeType, TextNodeData } from '@/types/nodes/text-node'
import { Input } from '../ui/input'
import { getNodeStyles } from '@/utils/node/node-style.utils'
import type { NodeProps } from '@xyflow/react'

export const TextNode = (props: NodeProps<TextNodeType>) => {
  const [text, setText] = useState('')
  const { updateNodeData } = useTypedReactFlow()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
    updateNodeData<TextNodeData>(props.id, { text: e.target.value })
  }

  const nodeStyles = getNodeStyles(props.type)
  return (
    <CustomNode {...props}>
      <Input value={text} color={nodeStyles.color} onChange={handleChange} />
    </CustomNode>
  )
}
