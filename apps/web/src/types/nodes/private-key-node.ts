import type { Node } from '@xyflow/react'
import type { NodeTypeEnum } from '../node'

export type PrivateKeyNodeData = {
  publicKey: string
  privateKey: string
}

export type PrivateKeyNodeType = Node<PrivateKeyNodeData, NodeTypeEnum.PRIVATE_KEY>
