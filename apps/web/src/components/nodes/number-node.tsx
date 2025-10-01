import { useTypedReactFlow } from '@/hooks/flow/use-typed-react-flow'
import { CustomNode } from '../ui/custom-node'
import { useState } from 'react'
import { Input } from '../ui/input'
import type { NumberNodeData, NumberNodeType } from '@/types/nodes/number-node'
import { ChevronDown, ChevronUp } from 'lucide-react'

export const NumberNode = (props: NumberNodeType) => {
  const [number, setNumber] = useState('')
  const { updateNodeData } = useTypedReactFlow()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value
    raw = raw.replace(/,/g, '.')
    raw = raw.replace(/[^\d.-]/g, '')
    const hasLeadingMinus = raw.startsWith('-')
    raw = raw.replace(/-/g, '')
    if (hasLeadingMinus) raw = '-' + raw
    const parts = raw.split('.')
    if (parts.length > 2) raw = parts[0] + '.' + parts.slice(1).join('')

    setNumber(raw)
    const parsed = parseFloat(raw)
    if (!isNaN(parsed)) updateNodeData<NumberNodeData>(props.id, { number: parsed })
  }

  const handleIncrement = () => {
    const parsed = !number ? 0 : Number(number)

    setNumber(String(parsed + 1))
    updateNodeData<NumberNodeData>(props.id, { number: parsed })
  }
  const handleDecrement = () => {
    const parsed = !number ? 0 : Number(number)

    setNumber(String(parsed - 1))
    updateNodeData<NumberNodeData>(props.id, { number: parsed })
  }

  return (
    <CustomNode {...props}>
      <div className="relative">
        <Input value={number} onChange={handleChange} />
        <button
          className="absolute right-0.5 transition-colors active:text-pink-600 top-1 w-3 h-3 cursor-pointer"
          onClick={handleIncrement}
        >
          <ChevronUp className="w-3 h-3" />
        </button>
        <button
          className="absolute right-0.5 bottom-0 w-3 h-3 cursor-pointer transition-colors active:text-pink-600"
          onClick={handleDecrement}
        >
          <ChevronDown className="w-3 h-3" />
        </button>
      </div>
    </CustomNode>
  )
}
