import type { nodeConfigRegistry } from '@/utils/node/node-config-registry'

export enum NodeTypeEnum {
  TEXT = 'TEXT',
  HASH = 'HASH',
  KEYPAIR = 'KEYPAIR',
  SIGN = 'SIGN',
  DISPLAY = 'DISPLAY',
  NUMBER = 'NUMBER',
  VERIFY_SIGNATURE = 'VERIFY_SIGNATURE',
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
