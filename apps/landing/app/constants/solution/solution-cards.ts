import { AlertTriangle, Flame, Grid3X3, Sparkles } from 'lucide-react'

export const SOLUTION_CARDS = [
  {
    title: 'Problem',
    description:
      'Solana and blockchain introduce many new concepts and flows that are hard to understand for newcomers. Terminology like keypairs, PDAs, the accounts model, transactions, instructions, and IDLs arrives all at once without a clear mental model or safe place to explore.',
    icon: AlertTriangle,
  },
  {
    title: 'Consequence',
    description:
      'Slow onboarding and low confidence. Builders rely on copy-paste snippets, ship brittle code, and struggle to reason about data flow. Mentors repeat the same explanations over and over instead of doing higher-level design reviews.',
    icon: Flame,
  },
  {
    title: 'Solution',
    description:
      'SOL Learn turns lessons into actions. Start from templates, connect nodes, preview accounts and data, and run on devnet safely. Learn by doing - no boilerplate, instant feedback, shareable flows.',
    icon: Grid3X3,
  },
  {
    title: 'Result',
    description:
      'Faster learning loops, reproducible templates, and fewer footguns. Beginners become productive. Teams align on clear, shared flows.',
    icon: Sparkles,
  },
]
