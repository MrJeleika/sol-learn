import { SignNode } from '@/components/nodes/sign-node'
import { HashNode } from '@/components/nodes/hash-node'
import { KeypairNode } from '@/components/nodes/keypair-node'
import { TextNode } from '@/components/nodes/text-node'
import { NodeTypeEnum, type NodeType } from '@/types/node'
import { DisplayNode } from '@/components/nodes/display-node'
import { NumberNode } from '@/components/nodes/number-node'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const nodeMap: Record<NodeType, React.ComponentType<any>> = {
  [NodeTypeEnum.text]: TextNode,
  [NodeTypeEnum.hash]: HashNode,
  [NodeTypeEnum.keypair]: KeypairNode,
  [NodeTypeEnum.sign]: SignNode,
  [NodeTypeEnum.display]: DisplayNode,
  [NodeTypeEnum.number]: NumberNode,
}
