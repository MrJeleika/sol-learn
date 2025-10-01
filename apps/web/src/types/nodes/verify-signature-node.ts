import type { Node } from '@xyflow/react'
import type { NodeTypeEnum } from '../node'

export type VerifySignatureNodeData = {
  isValid: boolean
}

export type VerifySignatureNodeType = Node<VerifySignatureNodeData, NodeTypeEnum.VERIFY_SIGNATURE>
