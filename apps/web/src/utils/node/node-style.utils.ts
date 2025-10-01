import { NodeTypeEnum, type NodeType } from '@/types/node'

interface NodeStyle {
  color: string
  width?: number
  height?: number
}

export const nodeStyles: Record<NodeType, NodeStyle> = {
  [NodeTypeEnum.text]: { color: '#006239', width: 300 },
  [NodeTypeEnum.hash]: { color: '#006239', width: 150 },
  [NodeTypeEnum.keypair]: { color: '#006239', width: 150 },
  [NodeTypeEnum.sign]: { color: '#006239', width: 150 },
  [NodeTypeEnum.display]: { color: '#006239', width: 300 },
  [NodeTypeEnum.number]: { color: '#006239', width: 100 },
}

export const getNodeStyles = (nodeType?: NodeType) => {
  if (!nodeType) return nodeStyles[NodeTypeEnum.text]
  return nodeStyles[nodeType]
}
