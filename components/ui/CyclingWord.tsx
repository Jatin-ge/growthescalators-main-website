'use client'

import { useEffect, useRef, useState } from 'react'

const WORDS = ['Escalate', 'Grow', 'Dominate', 'Convert', 'Scale', 'Compound', 'Win']
const TYPE_MS = 90
const DELETE_MS = 55
const HOLD_MS = 2600
const PAUSE_MS = 200

export default function CyclingWord() {
  const [display, setDisplay] = useState('')
  const wordIdx = useRef(0)
  const charIdx = useRef(0)
  const deleting = useRef(false)
  const timer = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    function tick() {
      const word = WORDS[wordIdx.current]

      if (!deleting.current) {
        charIdx.current += 1
        setDisplay(word.slice(0, charIdx.current))

        if (charIdx.current === word.length) {
          timer.current = setTimeout(() => {
            deleting.current = true
            tick()
          }, HOLD_MS)
          return
        }
        timer.current = setTimeout(tick, TYPE_MS)
      } else {
        charIdx.current -= 1
        setDisplay(word.slice(0, charIdx.current))

        if (charIdx.current === 0) {
          wordIdx.current = (wordIdx.current + 1) % WORDS.length
          deleting.current = false
          timer.current = setTimeout(tick, PAUSE_MS)
          return
        }
        timer.current = setTimeout(tick, DELETE_MS)
      }
    }

    timer.current = setTimeout(tick, PAUSE_MS)
    return () => clearTimeout(timer.current)
  }, [])

  return (
    <span
      style={{
        color: 'var(--orange)',
        display: 'inline-block',
        whiteSpace: 'nowrap',
      }}
    >
      {display}
      <span
        aria-hidden="true"
        style={{
          display: 'inline-block',
          width: '2.5px',
          height: '0.8em',
          background: 'var(--orange)',
          marginLeft: '3px',
          verticalAlign: 'middle',
          animation: 'blink 1s step-end infinite',
        }}
      />
    </span>
  )
}
