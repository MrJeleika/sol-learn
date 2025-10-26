import { bezierFor, type Anchors } from './utils'
import { useBreakpoint } from '@/app/components/ui/use-breakpoint'

interface Props {
  anchors: Anchors
  line1: number
  line2: number
}

export const Connectors = ({ anchors, line1, line2 }: Props) => {
  const isSmUp = useBreakpoint('sm')
  const path1 = isSmUp
    ? bezierFor(anchors.textRight, anchors.hashLeft, 'right', 'left')
    : bezierFor(anchors.textBottom!, anchors.hashTop!, 'bottom', 'top')
  const path2 = isSmUp
    ? bezierFor(anchors.hashRight, anchors.displayLeft, 'right', 'left')
    : bezierFor(anchors.hashBottom!, anchors.displayTop!, 'bottom', 'top')
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
