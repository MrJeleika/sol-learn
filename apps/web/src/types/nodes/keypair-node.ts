import type { Node } from '@xyflow/react'
import type { NodeTypeEnum } from '../node'
import type { Keypair } from '@solana/web3.js'

export type KeypairNodeData = {
  keypair: Keypair
}

export type KeypairNodeType = Node<KeypairNodeData, NodeTypeEnum.keypair>
