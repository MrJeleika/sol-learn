import { NodeTypeEnum, type NodeType } from '@/types/node'
import type { NodeConfig } from '@/types/node-config'
import { textNodeConfig } from './data/text-node-data'
import { hashNodeConfig } from './data/hash-node-data'
import { keypairNodeConfig } from './data/keypair-node-data'
import { signNodeConfig } from './data/sign-node-data'
import { displayNodeConfig } from './data/display-node-data'
import { numberNodeConfig } from './data/number-node-config'
import { verifySignatureNodeConfig } from './data/verify-signature-node'
import { networkNodeConfig } from './data/network-node-data'

export const nodeConfigRegistry = {
  [NodeTypeEnum.TEXT]: textNodeConfig,
  [NodeTypeEnum.HASH]: hashNodeConfig,
  [NodeTypeEnum.KEYPAIR]: keypairNodeConfig,
  [NodeTypeEnum.SIGN]: signNodeConfig,
  [NodeTypeEnum.DISPLAY]: displayNodeConfig,
  [NodeTypeEnum.NUMBER]: numberNodeConfig,
  [NodeTypeEnum.VERIFY_SIGNATURE]: verifySignatureNodeConfig,
  [NodeTypeEnum.NETWORK]: networkNodeConfig,
} as const satisfies Record<NodeType, NodeConfig>

export const getNodeConfig = (nodeType: NodeType) => {
  return nodeConfigRegistry[nodeType] as NodeConfig
}
