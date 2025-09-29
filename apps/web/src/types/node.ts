import type { nodeConfigRegistry } from '@/utils/node/node-config-registry'

export enum NodeTypeEnum {
  text = 'text',
  hash = 'hash',
  keypair = 'keypair',
}

export type NodeType = keyof typeof NodeTypeEnum

type NodeConfigRegistryType = typeof nodeConfigRegistry

export type TargetFieldsFor<T extends keyof NodeConfigRegistryType> = Extract<
  NodeConfigRegistryType[T]['handles'][number],
  { type: 'target' }
>['dataField']

// Helper to accept enum values too
export type TargetFieldsForEnum<T extends NodeTypeEnum> = TargetFieldsFor<T>
