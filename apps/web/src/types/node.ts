import type { nodeConfigRegistry } from '@/utils/node/node-config-registry'

export enum NodeTypeEnum {
  TEXT = 'TEXT',
  HASH = 'HASH',
  KEYPAIR = 'KEYPAIR',
  PRIVATE_KEY = 'PRIVATE_KEY',
  SIGN = 'SIGN',
  DISPLAY = 'DISPLAY',
  NUMBER = 'NUMBER',
  BOOLEAN = 'BOOLEAN',
  ADD = 'ADD',
  SUBTRACT = 'SUBTRACT',
  MULTIPLY = 'MULTIPLY',
  DIVIDE = 'DIVIDE',
  MODULO = 'MODULO',
  EXPONENT = 'EXPONENT',
  ROUND = 'ROUND',
  MIN = 'MIN',
  MAX = 'MAX',
  AND = 'AND',
  OR = 'OR',
  NOT = 'NOT',
  EQUAL = 'EQUAL',
  COMPARE = 'COMPARE',
  HAS_VALUE = 'HAS_VALUE',
  IF = 'IF',
  VERIFY_SIGNATURE = 'VERIFY_SIGNATURE',
  NETWORK = 'NETWORK',
  BALANCE = 'BALANCE',
  TRANSACTION_VIEW = 'TRANSACTION_VIEW',
  PDA = 'PDA',
  TRANSACTION_BUILDER = 'TRANSACTION_BUILDER',
  INSTRUCTIONS = 'INSTRUCTIONS',
  TRANSACTION = 'TRANSACTION',
  IDL = 'IDL',
  PROGRAM_INSTRUCTIONS = 'PROGRAM_INSTRUCTIONS',
  STRING_COMBINE = 'STRING_COMBINE',
  STRING_LENGTH = 'STRING_LENGTH',
  STRING_SUBSTRING = 'STRING_SUBSTRING',
  STRING_SPLIT = 'STRING_SPLIT',
  STRING_SEARCH = 'STRING_SEARCH',
  STRING_REPLACE = 'STRING_REPLACE',
  STRING_ENCODE = 'STRING_ENCODE',
  STRING_DECODE = 'STRING_DECODE',
}

export type NodeType = keyof typeof NodeTypeEnum

type NodeConfigRegistryType = typeof nodeConfigRegistry

export type TargetFieldsFor<T extends keyof NodeConfigRegistryType> = Extract<
  NodeConfigRegistryType[T]['handles'][number],
  { type: 'target' }
>['dataField']

export type ActionsFor<T extends keyof NodeConfigRegistryType> = NonNullable<
  NodeConfigRegistryType[T]['actions']
>[number]['label']

// Helper to accept enum values too
export type TargetFieldsForEnum<T extends NodeTypeEnum> = TargetFieldsFor<T>
