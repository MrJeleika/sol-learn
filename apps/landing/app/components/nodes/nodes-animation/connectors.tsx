import { bezierFor, type Anchors } from './utils'

interface Props {
  anchors: Anchors
  line1: number
  line2: number
}

export const Connectors = ({ anchors, line1, line2 }: Props) => {
  const path1 = bezierFor(anchors.textRight, anchors.hashLeft, 'right', 'left')
  const path2 = bezierFor(anchors.hashRight, anchors.displayLeft, 'right', 'left')
  return (
    <svg className="pointer-events-none absolute inset-0" width={anchors.width} height={anchors.height}>
      <path
        d={path1}
        stroke="#6b7280"
        strokeWidth="2"
        fill="none"
        pathLength={1}
        strokeDasharray={`${line1} 1`}
        strokeLinecap="round"
      />
      <path
        d={path2}
        stroke="#6b7280"
        strokeWidth="2"
        fill="none"
        pathLength={1}
        strokeDasharray={`${line2} 1`}
        strokeLinecap="round"
      />
    </svg>
  )
}
