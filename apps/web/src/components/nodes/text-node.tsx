import { useTypedReactFlow } from '@/hooks/flow/use-typed-react-flow'
import { CustomNode } from '../ui/custom-node'
import { useState } from 'react'
import type { TextNodeType, TextNodeData } from '@/types/nodes/text-node'
import { Input } from '../ui/input'

export const TextNode = (props: TextNodeType) => {
  const [text, setText] = useState('')
  const { updateNodeData } = useTypedReactFlow()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
    updateNodeData<TextNodeData>(props.id, { text: e.target.value })
  }

  return (
    <CustomNode {...props}>
      <Input value={text} onChange={handleChange} />
    </CustomNode>
  )
}
