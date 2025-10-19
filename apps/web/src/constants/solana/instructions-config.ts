import { ComputeBudgetProgram, PublicKey, SystemProgram, type TransactionInstruction } from '@solana/web3.js'
import type { Transaction } from '@solana/web3.js'
import { getATA } from '@/utils/solana/solana.utils'

export type FieldType = 'publicKey' | 'uiAmount' | 'number' | 'mint' | 'decimals' | 'network'

export type InstructionField = {
  key: string
  label: string
  type: FieldType
}

export type InstructionDef = {
  id: string
  label: string
  fields: InstructionField[]
  build: (base: Transaction, inputs: Record<string, unknown>) => Promise<TransactionInstruction[]>
}

export const INSTRUCTIONS: InstructionDef[] = [
  {
    id: 'systemTransfer',
    label: 'System transfer',
    fields: [
      { key: 'fromPubkey', label: 'From', type: 'publicKey' },
      { key: 'toPubkey', label: 'To', type: 'publicKey' },
      { key: 'amountUi', label: 'Amount (SOL)', type: 'uiAmount' },
    ],
    build: async (_base, inputs) => {
      const from = new PublicKey(String(inputs.fromPubkey))
      const to = new PublicKey(String(inputs.toPubkey))
      const lamports = Math.round(Number(inputs.amountUi) * 1e9)
      return [SystemProgram.transfer({ fromPubkey: from, toPubkey: to, lamports })]
    },
  },
  {
    id: 'computeUnitLimit',
    label: 'Compute unit limit',
    fields: [{ key: 'computeUnits', label: 'Compute Units', type: 'number' }],
    build: async (_base, inputs) => {
      return [ComputeBudgetProgram.setComputeUnitLimit({ units: Number(inputs.computeUnits) })]
    },
  },
  {
    id: 'computeUnitPrice',
    label: 'Compute unit price',
    fields: [{ key: 'microLamports', label: 'Micro Lamports', type: 'number' }],
    build: async (_base, inputs) => {
      return [ComputeBudgetProgram.setComputeUnitPrice({ microLamports: Number(inputs.microLamports) })]
    },
  },
  {
    id: 'splTransfer',
    label: 'SPL transfer',
    fields: [
      { key: 'ownerPubkey', label: 'Owner', type: 'publicKey' },
      { key: 'toPubkey', label: 'To', type: 'publicKey' },
      { key: 'mint', label: 'Mint', type: 'mint' },
      { key: 'decimals', label: 'Decimals', type: 'decimals' },
      { key: 'amountUi', label: 'Amount (token)', type: 'uiAmount' },
    ],
    build: async (_base, inputs) => {
      const owner = String(inputs.ownerPubkey)
      const to = String(inputs.toPubkey)
      const mint = String(inputs.mint)
      const decimals = Number(inputs.decimals)
      const amount = BigInt(Math.round(Number(inputs.amountUi) * 10 ** decimals))

      const sourceAta = await getATA(owner, mint)
      const destAta = await getATA(to, mint)

      // Delayed import to avoid pulling spl-token at top-level if tree-shaken
      const { createTransferInstruction } = await import('@solana/spl-token')
      return [createTransferInstruction(sourceAta, destAta, new PublicKey(owner), Number(amount))]
    },
  },
  {
    id: 'splCreateAta',
    label: 'SPL create ATA',
    fields: [
      { key: 'ownerPubkey', label: 'Owner', type: 'publicKey' },
      { key: 'mint', label: 'Mint', type: 'mint' },
    ],
    build: async (_base, inputs) => {
      const owner = new PublicKey(String(inputs.ownerPubkey))
      const mint = new PublicKey(String(inputs.mint))
      const ata = await getATA(owner.toBase58(), mint.toBase58())
      const { createAssociatedTokenAccountInstruction } = await import('@solana/spl-token')
      return [createAssociatedTokenAccountInstruction(owner, ata, owner, mint)]
    },
  },
]

export const getInstructionById = (id: string) => INSTRUCTIONS.find((i) => i.id === id)
