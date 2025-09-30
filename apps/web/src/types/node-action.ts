import type { Position } from '@xyflow/react'

export type NodeActionConfig = {
  position: Position
  label?: string
  // Accept any args, return any type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: (...args: any[]) => void
}
