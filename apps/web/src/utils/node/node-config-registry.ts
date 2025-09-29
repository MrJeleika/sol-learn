import { NodeTypeEnum, type NodeType } from '@/types/node'
import type { NodeConfig } from '@/types/node-config'
import { textNodeConfig } from './data/text-node-data'
import { hashNodeConfig } from './data/hash-node-data'
import { keypairNodeConfig } from './data/keypair-node-data'

export const nodeConfigRegistry = {
  [NodeTypeEnum.text]: textNodeConfig,
  [NodeTypeEnum.hash]: hashNodeConfig,
  [NodeTypeEnum.keypair]: keypairNodeConfig,
} as const satisfies Record<NodeType, NodeConfig>

export const getNodeConfig = (nodeType: NodeType) => {
  return nodeConfigRegistry[nodeType] as NodeConfig
}
