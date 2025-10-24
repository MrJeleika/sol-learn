'use client'

import * as React from 'react'
import { motion, type HTMLMotionProps, type Transition, type Variant } from 'motion/react'
import { cn } from '../../lib/utils'

export type FlipDirection = 'top' | 'bottom' | 'left' | 'right'

export type FlipButtonProps = HTMLMotionProps<'button'> & {
  frontText: string
  backText: string
  transition?: Transition
  frontClassName?: string
  frontStyle?: React.CSSProperties
  backClassName?: string
  backStyle?: React.CSSProperties
  from?: FlipDirection
}

const DEFAULT_SPAN_CLASS_NAME = 'absolute inset-0 flex items-center justify-center rounded-sm'

export function FlipButton({
  frontText,
  backText,
  transition = { type: 'spring', stiffness: 280, damping: 20 },
  className,
  frontClassName,
  frontStyle,
  backClassName,
  backStyle,
  from = 'top',
  ...props
}: FlipButtonProps) {
  const isVertical = from === 'top' || from === 'bottom'
  const rotateAxis = isVertical ? 'rotateX' : 'rotateY'
  const frontOffset = from === 'top' || from === 'left' ? '50%' : '-50%'
  const backOffset = from === 'top' || from === 'left' ? '-50%' : '50%'

  const buildVariant = (opacity: number, rotation: number, offset: string | null = null): Variant => ({
    opacity,
    [rotateAxis]: rotation,
    ...(isVertical && offset !== null ? { y: offset } : {}),
    ...(!isVertical && offset !== null ? { x: offset } : {}),
  })

  const frontVariants = {
    initial: buildVariant(1, 0, '0%'),
    hover: buildVariant(0, 90, frontOffset),
  }

  const backVariants = {
    initial: buildVariant(0, 90, backOffset),
    hover: buildVariant(1, 0, '0%'),
  }

  // Match Button sizing/typography; move color hover effect to the back face
  const baseWrapper =
    'relative inline-flex w-max h-[60px] px-6 py-2 text-[28px] font-medium cursor-pointer rounded-sm perspective-[1000px] outline-none transition-all disabled:pointer-events-none disabled:opacity-50'

  return (
    <motion.button
      data-slot="flip-button"
      initial="initial"
      whileHover="hover"
      whileTap={{ scale: 0.95 }}
      className={cn(baseWrapper, className)}
      {...props}
    >
      <motion.span
        data-slot="flip-button-front"
        variants={frontVariants}
        transition={transition}
        className={cn(DEFAULT_SPAN_CLASS_NAME, 'bg-background text-primary', frontClassName)}
        style={frontStyle}
      >
        {frontText}
      </motion.span>

      <motion.span
        data-slot="flip-button-back"
        variants={backVariants}
        transition={transition}
        className={cn(DEFAULT_SPAN_CLASS_NAME, 'bg-primary-2 text-foreground', backClassName)}
        style={backStyle}
      >
        {backText}
      </motion.span>

      <span className="invisible select-none">{frontText}</span>
    </motion.button>
  )
}
