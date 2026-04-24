'use client'

interface MarqueeStripProps {
  items: string[]
  speed?: number
  direction?: 'left' | 'right'
  separator?: string
  className?: string
}

export default function MarqueeStrip({
  items,
  speed = 30,
  direction = 'left',
  separator = '·',
  className = '',
}: MarqueeStripProps) {
  const doubled = [...items, ...items]

  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className={`flex whitespace-nowrap ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center">
            <span
              className="font-outfit text-xs uppercase tracking-[0.2em]"
              style={{ color: 'var(--text-muted)' }}
            >
              {item}
            </span>
            <span
              className="mx-4 text-xs"
              style={{ color: 'var(--orange)' }}
            >
              {separator}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
