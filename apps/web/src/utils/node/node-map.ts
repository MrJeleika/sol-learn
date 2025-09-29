import { HashNode } from '@/components/nodes/hash-node'
import { TextNode } from '@/components/nodes/text-node'
import { NodeTypeEnum, type NodeType } from '@/types/nodes/base'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const nodeMap: Record<NodeType, React.ComponentType<any>> = {
  [NodeTypeEnum.text]: TextNode,
  [NodeTypeEnum.hash]: HashNode,
}
