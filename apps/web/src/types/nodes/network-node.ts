import type { Node } from '@xyflow/react'
import type { NodeTypeEnum } from '../node'
import type { Network } from '../network'

export type NetworkNodeData = {
  network: Network
}

export type NetworkNodeType = Node<NetworkNodeData, NodeTypeEnum.NETWORK>
