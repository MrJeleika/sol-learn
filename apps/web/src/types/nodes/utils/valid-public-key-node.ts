import type { Node } from '@xyflow/react'
import type { NodeTypeEnum } from '../../node'

export type ValidPublicKeyNodeData = {
  publicKey?: string
  isValid?: boolean
}

export type ValidPublicKeyNodeType = Node<ValidPublicKeyNodeData, NodeTypeEnum.VALID_PUBLIC_KEY>
