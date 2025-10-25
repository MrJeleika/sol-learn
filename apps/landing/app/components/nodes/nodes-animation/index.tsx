'use client'

import { useEffect, useRef, useState } from 'react'
import { BaseNode } from '../node/base-node'
import { motion } from 'motion/react'
import { TypingEffect } from '../../ui/typing-text'
import {
  CONNECTOR_DURATION_MS,
  DELETE_PER_CHAR_MS,
  DISPLAY_COLOR,
  HASH_COLOR,
  POST_TYPE_PAUSE_MS,
  RESULT_PAUSE_MS,
  TEXT_COLOR,
  TEXT_ROTATION,
  TYPE_PER_CHAR_MS,
} from './constants'
import { sha256Hex, type Anchors, getMidLeft, getMidRight } from './utils'
import { useAnimateConnectors, useOnceInView } from './hooks'
import { Connectors } from './connectors'

export const NodesAnimation = () => {
  const { ref, inView } = useOnceInView()
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const hashRef = useRef<HTMLDivElement>(null)
  const displayRef = useRef<HTMLDivElement>(null)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [currentText, setCurrentText] = useState('')
  const [displayedText, setDisplayedText] = useState('')
  const [hashResult, setHashResult] = useState('')

  const [anchors, setAnchors] = useState<Anchors | null>(null)
  useEffect(() => {
    if (!inView) return
    const container = containerRef.current
    const t = textRef.current
    const h = hashRef.current
    const d = displayRef.current
    if (!container || !t || !h || !d) return
    const timeout = window.setTimeout(() => {
      const c = container.getBoundingClientRect()
      const bt = t.getBoundingClientRect()
      const bh = h.getBoundingClientRect()
      const bd = d.getBoundingClientRect()
      setAnchors({
        width: Math.ceil(c.width),
        height: Math.ceil(c.height),
        textRight: getMidRight(bt, c),
        hashLeft: getMidLeft(bh, c),
        hashRight: getMidRight(bh, c),
        displayLeft: getMidLeft(bd, c),
      })
    }, CONNECTOR_DURATION_MS)
    return () => window.clearTimeout(timeout)
  }, [inView])

  const { line1, line2, done } = useAnimateConnectors(anchors)

  useEffect(() => {
    if (!inView || !done) return
    let cancelled = false
    const run = async () => {
      const text = TEXT_ROTATION[currentIndex]
      setCurrentText(text)
      setDisplayedText('')
      setHashResult('')
      setIsTyping(true)
      for (let i = 1; i <= text.length; i++) {
        if (cancelled) return
        const partial = text.slice(0, i)
        setDisplayedText(partial)
        const hex = await sha256Hex(partial)
        if (cancelled) return
        setHashResult(hex)
        await new Promise((r) => setTimeout(r, TYPE_PER_CHAR_MS))
      }
      if (cancelled) return
      setIsTyping(false)
      await new Promise((r) => setTimeout(r, POST_TYPE_PAUSE_MS))
      if (cancelled) return
      await new Promise((r) => setTimeout(r, RESULT_PAUSE_MS))
      if (cancelled) return
      setIsDeleting(true)
      for (let i = text.length; i >= 0; i--) {
        if (cancelled) return
        const partial = text.slice(0, i)
        setDisplayedText(partial)
        const hex = await sha256Hex(partial)
        if (cancelled) return
        setHashResult(hex)
        await new Promise((r) => setTimeout(r, DELETE_PER_CHAR_MS))
      }
      setIsDeleting(false)
      setCurrentIndex((i) => (i + 1) % TEXT_ROTATION.length)
    }
    run()
    return () => {
      cancelled = true
    }
  }, [inView, currentIndex, done])

  return (
    <div ref={ref} className="w-full">
      <div ref={containerRef} className="relative w-full grid grid-cols-3 grid-rows-3 gap-6 min-h-[400px]">
        <motion.div
          ref={textRef}
          className="col-start-1 row-start-1 justify-self-start"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.0 }}
        >
          <BaseNode label="TEXT" color={TEXT_COLOR} width={300} height={110} isHovered>
            <div className="text-lg leading-5 text-foreground">
              {isTyping ? (
                <TypingEffect key={currentText} as="span" className="font-medium" text={currentText} />
              ) : isDeleting ? (
                <span className="font-medium">{displayedText}</span>
              ) : (
                <span className="font-medium">{currentText}</span>
              )}
            </div>
          </BaseNode>
        </motion.div>

        <motion.div
          ref={displayRef}
          className="col-start-3 row-start-2 justify-self-end"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
        >
          <BaseNode label="DISPLAY" color={DISPLAY_COLOR} width={320} height={110} isHovered>
            <div className="text-base font-mono break-all">{hashResult}</div>
          </BaseNode>
        </motion.div>

        <motion.div
          ref={hashRef}
          className="col-start-2 row-start-3  justify-self-center"
          initial={{ opacity: 0, y: 24, x: -50 }}
          animate={inView ? { opacity: 1, y: 0, x: -50 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
        >
          <BaseNode label="HASH" color={HASH_COLOR} width={160} height={110} isHovered>
            <div className="text-sm text-muted-foreground font-mono">hash()</div>
          </BaseNode>
        </motion.div>

        {anchors && <Connectors anchors={anchors} line1={line1} line2={line2} />}
      </div>
    </div>
  )
}
