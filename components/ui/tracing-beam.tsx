'use client'

import React, { useEffect, useRef, useState } from 'react'
import {
  motion,
  useTransform,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from 'framer-motion'
import { cn } from '@/lib/utils'

interface TracingBeamProps {
  children: React.ReactNode
  className?: string
}

export const TracingBeam: React.FC<TracingBeamProps> = ({
  children,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const [svgHeight, setSvgHeight] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', setScrollProgress)

  useEffect(() => {
    const updateHeight = () => {
      if (contentRef.current && containerRef.current) {
        const contentHeight = contentRef.current.offsetHeight
        const containerHeight = containerRef.current.offsetHeight
        setSvgHeight(Math.max(contentHeight, containerHeight))
      }
    }

    updateHeight()

    const resizeObserver = new ResizeObserver(updateHeight)
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current)
    }

    window.addEventListener('resize', updateHeight)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateHeight)
    }
  }, [children])

  const gradientStart = useSpring(
    useTransform(scrollYProgress, [0, 0.5], [50, svgHeight / 2]),
    { stiffness: 500, damping: 90 },
  )

  const gradientEnd = useSpring(
    useTransform(scrollYProgress, [0.5, 1], [svgHeight / 2, svgHeight - 50]),
    { stiffness: 500, damping: 90 },
  )

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        'relative mx-auto h-full w-full max-w-4xl p-4 sm:p-6 lg:p-8',
        className,
      )}
    >
      <div
        className="absolute -left-4 top-3 md:-left-20"
        style={{ height: svgHeight }}
      >
        <motion.div
          initial={false}
          animate={{
            boxShadow:
              scrollProgress > 0 ? 'none' : 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
          }}
          transition={{ duration: 0.2, delay: 0.5 }}
          className="ml-[27px] flex h-4 w-4 items-center justify-center rounded-full border border-neutral-200 shadow-sm"
        >
          <motion.div
            initial={false}
            animate={{
              backgroundColor:
                scrollProgress > 0 ? '#FFFFFF' : 'var(--emerald-500)',
              borderColor:
                scrollProgress > 0
                  ? 'rgb(212, 212, 212)'
                  : 'var(--emerald-600)',
            }}
            transition={{ duration: 0.2, delay: 0.5 }}
            className="h-2 w-2 rounded-full border"
          />
        </motion.div>

        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="ml-4 block"
          aria-hidden="true"
        >
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="#9091A0"
            strokeOpacity="0.16"
            transition={{ duration: 10 }}
          />
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="1.25"
            className="motion-reduce:hidden"
            transition={{ duration: 10 }}
          />
          <defs>
            <motion.linearGradient
              id="gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={gradientStart}
              y2={gradientEnd}
            >
              <stop stopColor="#18CCFC" stopOpacity="0" />
              <stop offset="0.2" stopColor="#18CCFC" />
              <stop offset="0.5" stopColor="#6344F5" />
              <stop offset="0.8" stopColor="#AE48FF" />
              <stop offset="1" stopColor="#AE48FF" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  )
}
