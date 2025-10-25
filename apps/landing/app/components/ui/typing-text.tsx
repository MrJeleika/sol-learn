'use client'

import * as React from 'react'
import { motion, useInView } from 'framer-motion'
import { ElementType } from 'react'

type TypingEffectProps = {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
  className?: string
  delayPerChar?: number // seconds
  baseDuration?: number // seconds
}

export function TypingEffect({
  text = 'Typing Effect',
  as = 'h2',
  className,
  delayPerChar = 0.1,
  baseDuration = 0.2,
}: TypingEffectProps) {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true })

  const Tag: ElementType = as
  const defaultClass = 'text-xl text-center sm:text-4xl font-bold tracking-tighter md:text-6xl md:leading-[4rem]'

  return (
    <Tag ref={ref} className={className ?? defaultClass}>
      {text.split('').map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: baseDuration, delay: index * delayPerChar }}
        >
          {letter}
        </motion.span>
      ))}
    </Tag>
  )
}
