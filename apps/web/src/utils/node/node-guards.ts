import { NodeTypeEnum, type NodeType } from '@/types/node'

export const isTextNode = (type: NodeType) => type === NodeTypeEnum.text
export const isHashNode = (type: NodeType) => type === NodeTypeEnum.hash
