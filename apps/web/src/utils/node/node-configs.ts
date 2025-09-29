import { NodeTypeEnum, type NodeType } from '@/types/nodes/base'
import type { NodeConfig } from '@/types/nodes/config'
import { textNodeConfig } from './configs/text-node-config'
import { hashNodeConfig } from './configs/hash-node-config'

export const nodeConfigs: Record<NodeType, NodeConfig> = {
  [NodeTypeEnum.text]: textNodeConfig,
  [NodeTypeEnum.hash]: hashNodeConfig,
}

export const getNodeConfig = (nodeType: NodeType) => {
  return nodeConfigs[nodeType]
}
