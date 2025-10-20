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
import { balanceNodeConfig } from './data/balance-node-data'
import { transactionViewNodeConfig } from './data/transaction-view-node-data'
import { pdaNodeConfig } from './data/pda-node-data'
import { transactionBuilderNodeConfig } from './data/transaction-builder-node-data'
import { instructionsNodeConfig } from './data/instructions-node-data'
import { transactionNodeConfig } from './data/transaction-node-data'
import { idlNodeConfig } from './data/idl-node-data'
import { programInstructionsNodeConfig } from './data/program-instructions-node-data'

export const nodeConfigRegistry = {
  [NodeTypeEnum.TEXT]: textNodeConfig,
  [NodeTypeEnum.HASH]: hashNodeConfig,
  [NodeTypeEnum.KEYPAIR]: keypairNodeConfig,
  [NodeTypeEnum.SIGN]: signNodeConfig,
  [NodeTypeEnum.DISPLAY]: displayNodeConfig,
  [NodeTypeEnum.NUMBER]: numberNodeConfig,
  [NodeTypeEnum.VERIFY_SIGNATURE]: verifySignatureNodeConfig,
  [NodeTypeEnum.NETWORK]: networkNodeConfig,
  [NodeTypeEnum.BALANCE]: balanceNodeConfig,
  [NodeTypeEnum.TRANSACTION_VIEW]: transactionViewNodeConfig,
  [NodeTypeEnum.PDA]: pdaNodeConfig,
  [NodeTypeEnum.TRANSACTION_BUILDER]: transactionBuilderNodeConfig,
  [NodeTypeEnum.INSTRUCTIONS]: instructionsNodeConfig,
  [NodeTypeEnum.TRANSACTION]: transactionNodeConfig,
  [NodeTypeEnum.IDL]: idlNodeConfig,
  [NodeTypeEnum.PROGRAM_INSTRUCTIONS]: programInstructionsNodeConfig,
} as const satisfies Record<NodeType, NodeConfig>

export const getNodeConfig = (nodeType: NodeType) => {
  return nodeConfigRegistry[nodeType] as NodeConfig
}
