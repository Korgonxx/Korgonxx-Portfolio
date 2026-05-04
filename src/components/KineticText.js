'use client'

import { useEffect, useRef, useState } from 'react'

// Pretext for text measurement
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext'

// Uses Intl.Segmenter to split text into visible glyphs (emoji, CJK safe)
function segmentText(text) {
  const seg = new Intl.Segmenter(undefined, { granularity: 'grapheme' })
  const segments = []
  for (const { segment } of seg.segment(text)) {
    segments.push(segment)
  }
  return segments
}

export default function KineticText({
  text,
  className = '',
  tag: Tag = 'h2',
  wave = true,
  stagger = 0.03,
  delay = 0,
  onVisible,
}) {
  const containerRef = useRef(null)
  const [mounted, setMounted] = useState(false)
  const [show, setShow] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => setShow(true), delay * 1000)
    return () => clearTimeout(timer)
  }, [delay])

  if (!mounted) return <Tag className={className}>{text}</Tag>

  const graphemes = segmentText(text)

  return (
    <Tag
      ref={containerRef}
      className={className}
      style={{
        display: 'inline-block',
        // preserve space between words by rendering as inline-grid
        display: 'inline-grid',
        gridAutoFlow: 'column',
        gap: '0.15em',
      }}
    >
      {graphemes.map((g, i) => {
        const baseDelay = i * stagger
        const finalDelay = baseDelay + (delay || 0)
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              opacity: show ? 1 : 0,
              transform: show
                ? 'translateY(0) rotateX(0)'
                : 'translateY(0.6em) rotateX(45deg)',
              transition: `opacity 0.5s ease ${finalDelay}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${finalDelay}s`,
              transformOrigin: 'bottom center',
              // optional: slight wave on hover
              ...(wave && {
                transition: `opacity 0.5s ease ${finalDelay}s, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${finalDelay}s`,
              }),
            }}
          >
            {g}
          </span>
        )
      })}
    </Tag>
  )
}
