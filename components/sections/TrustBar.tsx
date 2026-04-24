'use client'

import MarqueeStrip from '@/components/ui/MarqueeStrip'
import { TRUST_BAR_ITEMS } from '@/lib/constants'

export default function TrustBar() {
  return (
    <section
      className="py-5 overflow-hidden"
      style={{
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        background: 'var(--bg-secondary)',
      }}
    >
      <MarqueeStrip items={TRUST_BAR_ITEMS} speed={28} direction="left" separator="·" />
    </section>
  )
}
