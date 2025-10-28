export enum NetworkEnum {
  MAINNET = 'MAINNET',
  DEVNET = 'DEVNET',
}

export type Network = keyof typeof NetworkEnum
