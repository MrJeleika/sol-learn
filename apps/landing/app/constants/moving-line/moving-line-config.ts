import type { MovingLineItem } from '../../types/moving-line'

const nodeEntries: Array<{ label: string; color: string }> = [
  { label: 'IDL', color: '#b266ff' },
  { label: 'Display', color: '#60a5fa' },
  { label: 'Hash', color: '#22c55e' },
  { label: 'Verify Signature', color: '#e879f9' },
  { label: 'Program Instructions', color: '#a78bfa' },
  { label: 'Instructions', color: '#34d399' },
  { label: 'Transaction', color: '#34d399' },
  { label: 'Transaction Builder', color: '#34d399' },
  { label: 'PDA', color: '#34d399' },
  { label: 'Transaction View', color: '#60a5fa' },
  { label: 'Balance', color: '#fbbf24' },
  { label: 'Text', color: '#f43f5e' },
  { label: 'Sign', color: '#22d3ee' },
  { label: 'Number', color: '#2dd4bf' },
  { label: 'Network', color: '#fbbf24' },
  { label: 'Keypair', color: '#c084fc' },
]

export const movingLineItems: MovingLineItem[] = nodeEntries.map(({ label, color }) => ({
  label,
  text: label,
  color,
}))
