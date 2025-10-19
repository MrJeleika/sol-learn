import { NodeTypeEnum, type NodeType } from '@/types/node'

interface NodeStyle {
  color: string
  width?: number
  height?: number
}

export const nodeStyles: Record<NodeType, NodeStyle> = {
  [NodeTypeEnum.TEXT]: { color: '#531d2b', width: 300 },
  [NodeTypeEnum.HASH]: { color: '#006239', width: 150 },
  [NodeTypeEnum.KEYPAIR]: { color: '#39214a', width: 150 },
  [NodeTypeEnum.SIGN]: { color: '#265c75', width: 150 },
  [NodeTypeEnum.DISPLAY]: { color: '#1b3251', width: 300 },
  [NodeTypeEnum.NUMBER]: { color: '#1c604d', width: 100 },
  [NodeTypeEnum.VERIFY_SIGNATURE]: { color: '#850081', width: 150 },
  [NodeTypeEnum.NETWORK]: { color: '#75511e', width: 200 },
  [NodeTypeEnum.BALANCE]: { color: '#75511e', width: 200 },
  [NodeTypeEnum.TRANSACTION_VIEW]: { color: '#123a72', width: 300 },
  [NodeTypeEnum.PDA]: { color: '#2a5f2b', width: 100 },
  [NodeTypeEnum.TRANSACTION_BUILDER]: { color: '#2a5f2b', width: 100 },
  [NodeTypeEnum.INSTRUCTIONS]: { color: '#2a5f2b', width: 300 },
  [NodeTypeEnum.TRANSACTION]: { color: '#2a5f2b', width: 300 },
}

export const getNodeStyles = (nodeType?: NodeType) => {
  if (!nodeType) return nodeStyles[NodeTypeEnum.TEXT]
  return nodeStyles[nodeType]
}
