export enum NodeTypeEnum {
  text = 'text',
  hash = 'hash',
}

export type NodeType = keyof typeof NodeTypeEnum
