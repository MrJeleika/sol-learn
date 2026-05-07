import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { StringEncoding } from '@/utils/string/string-node.utils'

interface Props {
  color: string
  value: StringEncoding
  onChange: (value: StringEncoding) => void
}

const options: StringEncoding[] = ['base64', 'base58', 'hex']

export const StringEncodingSelect = ({ color, value, onChange }: Props) => {
  return (
    <Select value={value} onValueChange={(nextValue) => onChange(nextValue as StringEncoding)}>
      <SelectTrigger color={color} className="h-5">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
