import { HashNode } from '@/components/nodes/hash-node'
import { KeypairNode } from '@/components/nodes/keypair-node'
import { TextNode } from '@/components/nodes/text-node'
import { NodeTypeEnum, type NodeType } from '@/types/node'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const nodeMap: Record<NodeType, React.ComponentType<any>> = {
  [NodeTypeEnum.text]: TextNode,
  [NodeTypeEnum.hash]: HashNode,
  [NodeTypeEnum.keypair]: KeypairNode,
}
