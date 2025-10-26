'use client'
import { useEffect, useState } from 'react'
import { cn } from '@/app/lib/utils'
import { motion } from 'motion/react'

interface SolutionTitleProps {
  bottomVisible: boolean
}
export const SolutionTitle = ({ bottomVisible }: SolutionTitleProps) => {
  const [released, setReleased] = useState(false)

  useEffect(() => {
    if (!bottomVisible) setReleased(false)
  }, [bottomVisible])

  return (
    <div className={released ? 'relative z-10' : 'sticky top-0 z-20'}>
      <motion.div
        initial={false}
        animate={{ y: bottomVisible ? '-100%' : 0, opacity: bottomVisible ? 0 : 1 }}
        transition={{ type: 'spring', stiffness: 420, damping: 38, mass: 0.9 }}
        onAnimationComplete={() => {
          if (bottomVisible) setReleased(true)
        }}
        className={cn('sm:px-12 px-6 py-6 bg-primary-2 will-change-transform', bottomVisible ? '' : 'pt-12 sm:pt-18')}
      >
        <h2 className="text-2xl font-bold">Problem → Solution</h2>
      </motion.div>
    </div>
  )
}
