'use client'

import { motion } from 'motion/react'
import { Boxes, Globe, Puzzle, GitBranch } from 'lucide-react'

const iconMap = {
  boxes: Boxes,
  globe: Globe,
  puzzle: Puzzle,
  gitBranch: GitBranch,
}

interface SectionCardProps {
  title: string
  description: string
  icon: string
  index: number
}

export const SectionCard = ({ title, description, icon, index }: SectionCardProps) => {
  const Icon = iconMap[icon as keyof typeof iconMap] || Boxes

  return (
    <motion.div
      className="group rounded-lg lx:p-4 flex flex-col gap-4"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      <Icon className="h-14 w-14" />
      <h3 className="text-3xl font-semibold tracking-wide">{title}</h3>
      <p className="text-lg">{description}</p>
    </motion.div>
  )
}
