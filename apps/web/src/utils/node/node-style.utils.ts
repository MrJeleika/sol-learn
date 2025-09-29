import { NodeTypeEnum, type NodeType } from '@/types/nodes/base'

interface NodeStyle {
  color: string
  width?: number
  height?: number
}

export const nodeStyles: Record<NodeType, NodeStyle> = {
  [NodeTypeEnum.text]: { color: '#006239', width: 300 },
  [NodeTypeEnum.hash]: { color: '#006239', width: 100 },
}

export const getNodeStyles = (nodeType?: NodeType) => {
  if (!nodeType) return nodeStyles[NodeTypeEnum.text]
  return nodeStyles[nodeType]
}
