import { NodeTypeEnum, type NodeType } from '@/types/node'

interface NodeStyle {
  color: string
  width?: number
  height?: number
}

export const nodeStyles: Record<NodeType, NodeStyle> = {
  [NodeTypeEnum.TEXT]: { color: '#006239', width: 300 },
  [NodeTypeEnum.HASH]: { color: '#006239', width: 150 },
  [NodeTypeEnum.KEYPAIR]: { color: '#006239', width: 150 },
  [NodeTypeEnum.SIGN]: { color: '#006239', width: 150 },
  [NodeTypeEnum.DISPLAY]: { color: '#006239', width: 300 },
  [NodeTypeEnum.NUMBER]: { color: '#006239', width: 100 },
  [NodeTypeEnum.VERIFY_SIGNATURE]: { color: '#006239', width: 150 },
}

export const getNodeStyles = (nodeType?: NodeType) => {
  if (!nodeType) return nodeStyles[NodeTypeEnum.TEXT]
  return nodeStyles[nodeType]
}
