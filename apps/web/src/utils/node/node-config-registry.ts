import { NodeTypeEnum, type NodeType } from '@/types/node'
import type { NodeConfig } from '@/types/node-config'
import { textNodeConfig } from './data/text-node-data'
import { hashNodeConfig } from './data/hash-node-data'
import { keypairNodeConfig } from './data/keypair-node-data'
import { privateKeyNodeConfig } from './data/private-key-node-data'
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
import { stringCombineNodeConfig } from './data/string-combine-node-data'
import { stringLengthNodeConfig } from './data/string-length-node-data'
import { stringSubstringNodeConfig } from './data/string-substring-node-data'
import { stringSplitNodeConfig } from './data/string-split-node-data'
import { stringSearchNodeConfig } from './data/string-search-node-data'
import { stringReplaceNodeConfig } from './data/string-replace-node-data'
import { stringEncodeNodeConfig } from './data/string-encode-node-data'
import { stringDecodeNodeConfig } from './data/string-decode-node-data'

export const nodeConfigRegistry = {
  [NodeTypeEnum.TEXT]: textNodeConfig,
  [NodeTypeEnum.HASH]: hashNodeConfig,
  [NodeTypeEnum.KEYPAIR]: keypairNodeConfig,
  [NodeTypeEnum.PRIVATE_KEY]: privateKeyNodeConfig,
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
  [NodeTypeEnum.STRING_COMBINE]: stringCombineNodeConfig,
  [NodeTypeEnum.STRING_LENGTH]: stringLengthNodeConfig,
  [NodeTypeEnum.STRING_SUBSTRING]: stringSubstringNodeConfig,
  [NodeTypeEnum.STRING_SPLIT]: stringSplitNodeConfig,
  [NodeTypeEnum.STRING_SEARCH]: stringSearchNodeConfig,
  [NodeTypeEnum.STRING_REPLACE]: stringReplaceNodeConfig,
  [NodeTypeEnum.STRING_ENCODE]: stringEncodeNodeConfig,
  [NodeTypeEnum.STRING_DECODE]: stringDecodeNodeConfig,
} as const satisfies Record<NodeType, NodeConfig>

export const getNodeConfig = (nodeType: NodeType) => {
  return nodeConfigRegistry[nodeType] as NodeConfig
}
