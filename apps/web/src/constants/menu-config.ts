import { NodeTypeEnum, type NodeType } from '@/types/node'

export type MenuCategory = {
  id: string
  label: string
  color: string
  nodes: NodeType[]
}

export const menuConfig: MenuCategory[] = [
  {
    id: 'input',
    label: 'Input',
    color: '#39214a',
    nodes: [NodeTypeEnum.KEYPAIR, NodeTypeEnum.TEXT, NodeTypeEnum.NUMBER],
  },
  {
    id: 'transactions',
    label: 'Transactions',
    color: '#2a5f2b',
    nodes: [NodeTypeEnum.TRANSACTION_BUILDER, NodeTypeEnum.TRANSACTION, NodeTypeEnum.TRANSACTION_VIEW],
  },
  {
    id: 'network',
    label: 'Network',
    color: '#75511e',
    nodes: [NodeTypeEnum.NETWORK, NodeTypeEnum.BALANCE],
  },
  {
    id: 'programs',
    label: 'Programs',
    color: '#5a1d5f',
    nodes: [NodeTypeEnum.IDL, NodeTypeEnum.PROGRAM_INSTRUCTIONS, NodeTypeEnum.INSTRUCTIONS],
  },
  {
    id: 'crypto',
    label: 'Crypto',
    color: '#265c75',
    nodes: [
      NodeTypeEnum.HASH,
      NodeTypeEnum.SIGN,
      NodeTypeEnum.VERIFY_SIGNATURE,
      NodeTypeEnum.PDA,
      NodeTypeEnum.DISPLAY,
    ],
  },
]
