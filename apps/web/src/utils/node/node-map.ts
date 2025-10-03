import { SignNode } from '@/components/nodes/sign-node'
import { HashNode } from '@/components/nodes/hash-node'
import { KeypairNode } from '@/components/nodes/keypair-node'
import { TextNode } from '@/components/nodes/text-node'
import { NodeTypeEnum, type NodeType } from '@/types/node'
import { DisplayNode } from '@/components/nodes/display-node'
import { NumberNode } from '@/components/nodes/number-node'
import { VerifySignatureNode } from '@/components/nodes/verify-signature-node'
import { NetworkNode } from '@/components/nodes/network-node'
import { BalanceNode } from '@/components/nodes/balance-node'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const nodeMap: Record<NodeType, React.ComponentType<any>> = {
  [NodeTypeEnum.TEXT]: TextNode,
  [NodeTypeEnum.HASH]: HashNode,
  [NodeTypeEnum.KEYPAIR]: KeypairNode,
  [NodeTypeEnum.SIGN]: SignNode,
  [NodeTypeEnum.DISPLAY]: DisplayNode,
  [NodeTypeEnum.NUMBER]: NumberNode,
  [NodeTypeEnum.VERIFY_SIGNATURE]: VerifySignatureNode,
  [NodeTypeEnum.NETWORK]: NetworkNode,
  [NodeTypeEnum.BALANCE]: BalanceNode,
}
