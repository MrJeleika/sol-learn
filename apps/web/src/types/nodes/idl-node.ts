import type { Node } from '@xyflow/react'
import type { NodeTypeEnum } from '../node'

// Anchor IDL types
export type IdlType =
  | 'bool'
  | 'u8'
  | 'i8'
  | 'u16'
  | 'i16'
  | 'u32'
  | 'i32'
  | 'f32'
  | 'u64'
  | 'i64'
  | 'f64'
  | 'u128'
  | 'i128'
  | 'bytes'
  | 'string'
  | 'publicKey'
  | { vec: IdlType }
  | { option: IdlType }
  | { defined: string }
  | { array: [IdlType, number] }

export type IdlField = {
  name: string
  type: IdlType
}

export type IdlAccountItem = {
  name: string
  isMut: boolean
  isSigner: boolean
}

export type IdlInstruction = {
  name: string
  accounts: IdlAccountItem[]
  args: IdlField[]
}

export type IdlAccount = {
  name: string
  type: {
    kind: 'struct'
    fields: IdlField[]
  }
}

export type Idl = {
  version: string
  name: string
  instructions: IdlInstruction[]
  accounts?: IdlAccount[]
  types?: IdlAccount[]
  metadata?: {
    address?: string
  }
}

export type IdlNodeData = {
  idlJson?: string
  idl?: Idl | null
  programId?: string
}

export type IdlNodeType = Node<IdlNodeData, NodeTypeEnum.IDL>
