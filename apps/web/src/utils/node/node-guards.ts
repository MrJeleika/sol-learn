import { NodeTypeEnum, type NodeType } from '@/types/node'

export const isTextNode = (type: NodeType) => type === NodeTypeEnum.TEXT
export const isHashNode = (type: NodeType) => type === NodeTypeEnum.HASH
