import { NodeTypeEnum, type NodeType } from '@/types/node'

interface NodeStyle {
  color: string
  width?: number
  height?: number
}

export const nodeStyles: Record<NodeType, NodeStyle> = {
  [NodeTypeEnum.TEXT]: { color: '#531d2b', width: 300 },
  [NodeTypeEnum.DISPLAY]: { color: '#531d2b', width: 300 },
  [NodeTypeEnum.NUMBER]: { color: '#531d2b', width: 100 },

  [NodeTypeEnum.TRANSACTION_BUILDER]: { color: '#2a5f2b', width: 100 },
  [NodeTypeEnum.TRANSACTION]: { color: '#2a5f2b', width: 300 },
  [NodeTypeEnum.TRANSACTION_VIEW]: { color: '#2a5f2b', width: 300 },

  [NodeTypeEnum.NETWORK]: { color: '#75511e', width: 200 },
  [NodeTypeEnum.BALANCE]: { color: '#75511e', width: 200 },

  [NodeTypeEnum.IDL]: { color: '#5a1d5f', width: 350 },
  [NodeTypeEnum.PROGRAM_INSTRUCTIONS]: { color: '#5a1d5f', width: 350 },
  [NodeTypeEnum.INSTRUCTIONS]: { color: '#5a1d5f', width: 300 },
  [NodeTypeEnum.PDA]: { color: '#5a1d5f', width: 100 },

  [NodeTypeEnum.HASH]: { color: '#265c75', width: 150 },
  [NodeTypeEnum.KEYPAIR]: { color: '#265c75', width: 150 },
  [NodeTypeEnum.SIGN]: { color: '#265c75', width: 150 },
  [NodeTypeEnum.VERIFY_SIGNATURE]: { color: '#265c75', width: 150 },
  [NodeTypeEnum.PRIVATE_KEY]: { color: '#265c75', width: 300 },

  [NodeTypeEnum.STRING_COMBINE]: { color: '#7a3f24', width: 240 },
  [NodeTypeEnum.STRING_LENGTH]: { color: '#7a3f24', width: 180 },
  [NodeTypeEnum.STRING_SUBSTRING]: { color: '#7a3f24', width: 240 },
  [NodeTypeEnum.STRING_SPLIT]: { color: '#7a3f24', width: 240 },
  [NodeTypeEnum.STRING_SEARCH]: { color: '#7a3f24', width: 190 },
  [NodeTypeEnum.STRING_REPLACE]: { color: '#7a3f24', width: 240 },
  [NodeTypeEnum.STRING_ENCODE]: { color: '#7a3f24', width: 240 },
  [NodeTypeEnum.STRING_DECODE]: { color: '#7a3f24', width: 240 },
}

export const getNodeStyles = (nodeType?: NodeType) => {
  if (!nodeType) return nodeStyles[NodeTypeEnum.TEXT]
  return nodeStyles[nodeType]
}
