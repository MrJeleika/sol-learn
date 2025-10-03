export enum NetworkEnum {
  MAINNET = 'MAINNET',
  TESTNET = 'TESTNET',
  DEVNET = 'DEVNET',
}

export type Network = keyof typeof NetworkEnum
