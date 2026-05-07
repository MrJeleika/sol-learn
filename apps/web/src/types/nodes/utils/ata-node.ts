import type { Node } from '@xyflow/react'
import type { NodeTypeEnum } from '../../node'

export type AtaNodeData = {
  ata?: string
}

export type AtaNodeType = Node<AtaNodeData, NodeTypeEnum.ATA>
