'use client'

import { motion } from 'motion/react'
import { useEffect, useState, RefObject, useRef } from 'react'

const textVariants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      delay: 2 + i * 0.05,
      duration: 0.3,
    },
  }),
}

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 2,
    },
  },
}

interface AnimationOverlayProps {
  onComplete?: () => void
  headerRef?: RefObject<Element | null>
}

export function AnimationOverlay({ onComplete, headerRef }: AnimationOverlayProps) {
  const logoRef = useRef<HTMLDivElement | null>(null)
  const overlayLogoRef = useRef<HTMLDivElement | null>(null)
  const [headerPos, setHeaderPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!headerRef?.current || !overlayLogoRef.current) return

    const compute = () => {
      const targetRect = headerRef.current!.getBoundingClientRect()
      const sourceRect = overlayLogoRef.current!.getBoundingClientRect()

      const targetCenterX = targetRect.left + targetRect.width / 2
      const targetCenterY = targetRect.top + targetRect.height / 2
      const sourceCenterX = sourceRect.left + sourceRect.width / 2
      const sourceCenterY = sourceRect.top + sourceRect.height / 2

      setHeaderPos({ x: targetCenterX - sourceCenterX, y: targetCenterY - sourceCenterY })
    }

    const timeout = setTimeout(compute, 1600)
    return () => clearTimeout(timeout)
  }, [headerRef])

  return (
    <motion.div
      className="fixed inset-0 z-999 w-screen h-screen bg-black pointer-events-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{
        delay: 3,
        duration: 1,
      }}
      onAnimationComplete={onComplete}
    >
      <div className="w-full h-full flex items-center justify-center">
        <motion.div
          ref={logoRef}
          className="flex items-center gap-4"
          initial={{
            x: 0,
            y: 0,
          }}
          animate={{
            x: [0, 0, headerPos.x],
            y: [0, 0, headerPos.y],
          }}
          transition={{
            duration: 1.3,
            times: [0, 1],
            ease: 'easeOut',
          }}
        >
          <div ref={overlayLogoRef} className="shrink-0 sm:w-16 w-12 sm:h-16 h-12">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1152 1024" className="w-full h-full fill-[#e2e8f0]">
              <g transform="translate(0.000000,1024.000000) scale(0.100000,-0.100000)">
                <path d="M6020 9999 c-188 -17 -358 -65 -550 -155 -410 -194 -727 -552 -881 -994 -18 -52 -33 -96 -34 -97 -1 -2 -150 47 -331 108 -181 60 -371 121 -423 134 -240 64 -531 71 -774 20 -328 -68 -593 -205 -821 -425 -296 -286 -463 -634 -506 -1055 -8 -74 -10 -308 -7 -710 4 -665 3 -655 78 -885 133 -411 433 -751 842 -954 164 -82 64 -48 1980 -681 805 -266 1132 -378 1196 -411 265 -135 456 -381 538 -691 24 -92 26 -116 31 -386 2 -164 0 -287 -5 -287 -5 0 -101 31 -213 69 -113 38 -864 290 -1670 561 -806 271 -1550 521 -1655 556 -261 89 -337 106 -465 106 -128 1 -217 -20 -321 -74 -125 -64 -239 -193 -290 -327 -47 -126 -49 -161 -49 -864 1 -739 0 -734 69 -872 49 -99 155 -207 253 -256 104 -53 2822 -955 2963 -984 397 -80 785 -34 1125 134 391 193 671 513 810 927 21 65 44 120 49 122 6 2 164 -48 353 -111 386 -129 515 -162 703 -177 491 -39 1014 156 1336 497 260 277 416 624 459 1025 13 122 13 1078 0 1213 -36 375 -193 719 -452 990 -162 170 -290 267 -477 361 -78 40 -236 97 -601 218 -272 90 -958 318 -1524 505 -620 206 -1051 354 -1085 373 -280 157 -459 406 -525 729 -12 57 -16 143 -16 344 -1 147 1 269 3 271 2 2 867 -284 1923 -635 1055 -352 1948 -647 1984 -655 83 -20 217 -20 299 -1 244 58 431 265 470 522 7 47 11 296 11 715 0 723 0 723 -71 868 -54 110 -178 237 -284 292 -69 36 -267 104 -1470 508 -341 115 -748 251 -905 304 -498 168 -606 197 -815 216 -120 11 -130 11 -255 -1z m-2433 -1614 c48 -9 268 -76 488 -149 l400 -132 6 -435 c6 -374 10 -450 27 -549 92 -516 459 -991 940 -1217 53 -25 345 -128 647 -228 303 -100 962 -318 1465 -485 503 -167 946 -316 985 -333 170 -72 334 -212 443 -377 70 -105 113 -203 150 -339 l27 -96 0 -595 0 -595 -28 -99 c-66 -236 -200 -443 -370 -572 -87 -66 -244 -140 -362 -170 -129 -34 -348 -38 -490 -10 -49 9 -274 80 -500 155 l-410 138 -6 469 c-4 277 -11 488 -17 515 -29 125 -54 211 -82 284 -153 395 -454 726 -835 917 -113 57 -257 106 -1920 654 -627 207 -1169 389 -1204 405 -154 70 -330 220 -430 368 -61 89 -116 211 -148 327 l-28 99 0 590 0 590 28 100 c83 295 265 532 517 672 73 41 209 88 295 102 39 6 81 13 95 15 47 8 229 -3 317 -19z" />
              </g>
            </svg>
          </div>
          <motion.div
            className="flex gap-1 whitespace-nowrap overflow-hidden"
            variants={containerVariants}
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            transition={{
              width: { delay: 1, duration: 0.5 },
              opacity: { duration: 0 },
            }}
          >
            {'SOL LEARN'.split('').map((char, i) => (
              <motion.span
                key={i}
                className="sm:text-3xl text-xl font-bold text-foreground kode-mono-bold inline-block"
                custom={i}
                variants={textVariants}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
