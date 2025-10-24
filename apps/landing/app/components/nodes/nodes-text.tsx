import { MovingLineItem } from '@/app/types/moving-line'

interface NodesTextProps {
  hoveredItem: MovingLineItem | null
}

export const NodesText = ({ hoveredItem }: NodesTextProps) => {
  return (
    <div>
      <p className="text-sm text-gray-500">{hoveredItem?.text}</p>
    </div>
  )
}
