import type { Node } from '@xyflow/react'
import type { NodeTypeEnum } from '../node'

export type KeypairNodeData = {
  publicKey: string
  privateKey: string
}

export type KeypairNodeType = Node<KeypairNodeData, NodeTypeEnum.KEYPAIR>
