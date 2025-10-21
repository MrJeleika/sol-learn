import { Boxes, Globe, Puzzle, GitBranch } from 'lucide-react'

export const ABOUT_CARDS = [
  {
    title: 'Visual Node Builder',
    description:
      'Drag-and-drop nodes to construct Solana transactions and flows. See data transform at every step with zero boilerplate.',
    icon: Boxes,
  },
  {
    title: 'Real On-Chain Execution',
    description:
      'Connect to devnet or mainnet, sign and send transactions, verify signatures, and inspect results directly in the UI.',
    icon: Globe,
  },
  {
    title: 'Composable Modules',
    description:
      'Reusable nodes for keypairs, PDAs, instructions and IDL-driven builders. Mix, match and extend without rewrites.',
    icon: Puzzle,
  },
  {
    title: 'Open-Source',
    description:
      'Built to grow with you. Add custom nodes and utilities like plugins to tailor advanced workflows and learning paths.',
    icon: GitBranch,
  },
]
