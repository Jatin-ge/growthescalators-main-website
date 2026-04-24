'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import Link from 'next/link'

// ─── Data ──────────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    number: '01',
    title: 'Performance Marketing',
    tagline: 'Your ads should print money — ours do.',
    copy: "We've managed over ₹10Cr in ad spend across Meta, Google, and YouTube. Our campaigns don't just get impressions — they get results. Every rupee is tracked, optimised, and made to work overtime.",
    result: 'Average 30% CPL reduction in 60 days. 120% AOV increase. 2.5x ROAS on cold traffic.',
    deliverables: ['Campaign architecture & full setup', 'Creative testing at scale (A/B)', 'Audience segmentation & lookalikes', 'Weekly reporting & live optimisation', 'Landing page conversion feedback'],
    stats: [{ num: '₹10Cr+', label: 'Ad Spend Managed' }, { num: '30%', label: 'CPL Reduction' }, { num: '2.5x', label: 'ROAS Growth' }],
    testimonial: { quote: "ROAS went from 1.4x to 4.8x in 45 days. Best agency decision we've made.", name: 'Muaaz Shaikh', role: 'Business Owner' },
    steps: [
      { n: '01', title: 'Audit & Strategy', desc: 'Deep-dive into your account history, audience data, and competitor landscape.' },
      { n: '02', title: 'Campaign Build', desc: 'Full campaign architecture — ad sets, creatives, copy — built for scale.' },
      { n: '03', title: 'Launch & Test', desc: 'Controlled launch with rapid creative and audience testing cycles.' },
      { n: '04', title: 'Optimise & Scale', desc: 'Kill losers fast, scale winners hard. Weekly reporting with live dashboard access.' },
    ],
  },
  {
    number: '02',
    title: 'Funnel Marketing & Automation',
    tagline: 'Strangers become buyers while you sleep.',
    copy: 'A funnel built right runs 24/7. We architect the entire journey — awareness to purchase to repeat — so your brand never misses a touchpoint. WhatsApp, email, retargeting — all wired together.',
    result: 'Clients see avg 3.2x increase in lead-to-sale conversion within 90 days.',
    deliverables: ['Full funnel mapping & architecture', 'Landing page copy & design', 'Email nurture sequences (8–12 touch)', 'WhatsApp automation & follow-up flows', 'CRM integration & lead scoring'],
    stats: [{ num: '3.2x', label: 'Lead-to-Sale Conversion' }, { num: '90d', label: 'To See Results' }, { num: '24/7', label: 'Automated Follow-up' }],
    testimonial: { quote: 'Conversion rate jumped from 1.2% to 3.8% in month one. Absolutely recommend.', name: 'Richa Jain', role: 'Founder, Lifestyle Brand' },
    steps: [
      { n: '01', title: 'Funnel Mapping', desc: 'Map every touchpoint from first click to loyal customer.' },
      { n: '02', title: 'Build & Integrate', desc: 'Landing pages, email sequences, WhatsApp flows — wired together.' },
      { n: '03', title: 'Traffic & Nurture', desc: 'Send qualified traffic in and let automation do the nurturing.' },
      { n: '04', title: 'Test & Scale', desc: 'Continuous split testing at each funnel stage to compound conversion.' },
    ],
  },
  {
    number: '03',
    title: 'Website Development',
    tagline: 'Your website is your best salesperson.',
    copy: 'We build fast, conversion-optimised websites that rank on Google, load in under 2 seconds, and turn visitors into leads. No templates. No shortcuts. Built from scratch for your business.',
    result: 'Average 67% improvement in page load speed. 40% increase in time-on-site.',
    deliverables: ['Custom design & development (no templates)', 'Mobile-first & performance optimised', 'Technical SEO structure from day one', 'CRO implementation across all pages', 'Hosting, deployment & maintenance'],
    stats: [{ num: '<2s', label: 'Page Load Time' }, { num: '67%', label: 'Speed Improvement' }, { num: '40%', label: 'More Time on Site' }],
    testimonial: { quote: 'Page speed improved 67%. Our bounce rate dropped in half overnight.', name: 'Kabir Malhotra', role: 'EdTech Founder' },
    steps: [
      { n: '01', title: 'Discovery & Wire', desc: 'Goals, sitemap, user flows, and lo-fi wireframes locked in together.' },
      { n: '02', title: 'Design', desc: 'High-fidelity UI design system — desktop, tablet, and mobile.' },
      { n: '03', title: 'Build & Test', desc: 'Coded from scratch, performance-tested, and cross-browser verified.' },
      { n: '04', title: 'Launch & Support', desc: 'Deployment, Google Search Console setup, and 30-day post-launch support.' },
    ],
  },
  {
    number: '04',
    title: 'Personal Branding',
    tagline: "People don't buy from businesses. They buy from people.",
    copy: "Whether you're a founder, consultant, or industry expert — your personal brand is your most valuable asset. We build your LinkedIn authority, content strategy, and thought leadership that converts.",
    result: 'Clients average 400% follower growth in 6 months. 5–10 inbound leads per week from content alone.',
    deliverables: ['Brand positioning & messaging framework', 'LinkedIn profile audit & rebuild', 'Monthly content calendar & strategy', 'Ghostwriting & thought leadership publishing', 'Personal visual identity & photo direction'],
    stats: [{ num: '400%', label: 'Follower Growth' }, { num: '10+', label: 'Inbound Leads/Week' }, { num: '6mo', label: 'To Full Impact' }],
    testimonial: { quote: '0 to 8,200 LinkedIn followers. I now get 12 inbound consults per month.', name: 'Dr. Mukesh Sharma', role: 'Medical Professional' },
    steps: [
      { n: '01', title: 'Positioning Audit', desc: 'Clarify your niche, voice, and differentiation in the market.' },
      { n: '02', title: 'Profile Rebuild', desc: 'LinkedIn optimised end-to-end — banner, headline, summary, featured.' },
      { n: '03', title: 'Content Engine', desc: 'Weekly content calendar with ghostwritten posts, carousels, and hooks.' },
      { n: '04', title: 'Grow & Monetise', desc: 'Engagement strategy + DM funnels to convert followers into consults.' },
    ],
  },
  {
    number: '05',
    title: 'Social Media Marketing',
    tagline: 'Stop posting. Start building.',
    copy: "Random posts don't build brands. Systems do. We create a content machine — platform-specific, audience-first, algorithm-aware. The result? A feed that works like a 24/7 salesperson.",
    result: 'Average 300% engagement increase in 90 days. Communities of 10,000+ built from zero.',
    deliverables: ['Platform-specific content strategy', 'Scroll-stopping graphic design & reels', 'Reel scripting, shooting direction & editing', 'Daily community management & engagement', 'Monthly analytics reporting & optimisation'],
    stats: [{ num: '300%', label: 'Engagement Increase' }, { num: '10K+', label: 'Followers Built' }, { num: '90d', label: 'To See Results' }],
    testimonial: { quote: '0 to 12,400 Instagram followers in 5 months. Walk-ins tripled.', name: 'Tanya Bose', role: 'F&B Brand Founder' },
    steps: [
      { n: '01', title: 'Platform Audit', desc: 'Audit existing presence and identify platform-specific opportunities.' },
      { n: '02', title: 'Content Strategy', desc: 'Build monthly calendar with content pillars, formats, and hooks.' },
      { n: '03', title: 'Create & Publish', desc: 'Design, film, edit, write captions, and post on schedule every day.' },
      { n: '04', title: 'Engage & Report', desc: 'Community management, comment replies, and monthly performance review.' },
    ],
  },
  {
    number: '06',
    title: 'Branding & Identity',
    tagline: "Your brand is what people say when you're not in the room.",
    copy: "We build brand identities that are impossible to ignore — logo systems, colour palettes, typography, brand guidelines, and the full visual language your brand speaks. Built for longevity.",
    result: '100+ brand identities delivered. Average brand recognition increase of 60% within 6 months.',
    deliverables: ['Logo design system (primary + variations)', 'Complete brand guidelines document', 'Colour palette & typography system', 'Brand collateral & stationery design', 'Social media brand kit & templates'],
    stats: [{ num: '100+', label: 'Identities Delivered' }, { num: '60%', label: 'Recognition Increase' }, { num: '6mo', label: 'Average Timeline' }],
    testimonial: { quote: 'Our brand finally looks as premium as the product. Recognition is through the roof.', name: 'Neha Agarwal', role: 'D2C Brand Founder' },
    steps: [
      { n: '01', title: 'Brand Discovery', desc: 'Brand personality, target audience, competitor mapping, and moodboards.' },
      { n: '02', title: 'Logo & System', desc: 'Primary logo, variations, clear space rules, and misuse guidelines.' },
      { n: '03', title: 'Full Identity', desc: 'Colour palette, typography, iconography, and visual language system.' },
      { n: '04', title: 'Handoff & Kit', desc: 'Brand guidelines PDF, all file formats, and social media template kit.' },
    ],
  },
  {
    number: '07',
    title: 'SEO',
    tagline: 'Rank #1 or rank nowhere.',
    copy: "SEO isn't about gaming algorithms. It's about being the most relevant answer to your customer's question. Technical SEO, content SEO, local SEO — turning your site into an organic lead machine.",
    result: 'Clients average page 1 rankings within 4 months. 200% organic traffic increase in 6 months.',
    deliverables: ['Full technical SEO audit & fixes', 'Keyword research & intent mapping', 'On-page optimisation across all pages', 'Backlink strategy & outreach campaigns', 'Monthly ranking & traffic reports'],
    stats: [{ num: '200%', label: 'Organic Traffic Growth' }, { num: '4mo', label: 'To Page 1' }, { num: '#1', label: 'Target Position' }],
    testimonial: { quote: 'Page 1 for 12 keywords in under 4 months. Organic leads are now our #1 channel.', name: 'Vikram Choudhary', role: 'B2B Consulting Firm' },
    steps: [
      { n: '01', title: 'Technical Audit', desc: 'Crawl your site for indexing issues, speed problems, and broken signals.' },
      { n: '02', title: 'Keyword Strategy', desc: 'Map high-intent keywords to every page based on search volume and competition.' },
      { n: '03', title: 'On-Page & Content', desc: 'Optimise titles, meta, headers, internal linking, and content depth.' },
      { n: '04', title: 'Authority Building', desc: 'Backlink outreach, digital PR, and local citations to push rankings up.' },
    ],
  },
]

const TICKER = ['PERFORMANCE MARKETING', 'FUNNEL AUTOMATION', 'WEB DEV', 'PERSONAL BRANDING', 'SOCIAL MEDIA', 'BRANDING', 'SEO']

// Stacked area chart data — 7 layers, 12 months each (cumulative index 0–10)
const CHART_LAYERS = [
  { label: 'Performance Marketing', color: '#ff9f6b' },
  { label: 'Funnel Automation',     color: '#ff7d3f' },
  { label: 'Website Development',   color: '#f05f1e' },
  { label: 'Personal Branding',     color: '#d94b10' },
  { label: 'Social Media',          color: '#c03a08' },
  { label: 'Branding & Identity',   color: '#9a2c05' },
  { label: 'SEO',                   color: '#6b1c03' },
]

const BASE_CURVES: number[][] = [
  [0.1,0.2,0.35,0.5,0.65,0.75,0.82,0.88,0.92,0.95,0.97,1.0],
  [0.0,0.05,0.12,0.22,0.35,0.48,0.58,0.67,0.74,0.80,0.85,0.90],
  [0.0,0.0,0.05,0.14,0.25,0.36,0.46,0.55,0.62,0.68,0.73,0.78],
  [0.0,0.0,0.02,0.08,0.16,0.25,0.34,0.42,0.50,0.57,0.63,0.69],
  [0.0,0.0,0.0,0.04,0.10,0.18,0.26,0.34,0.41,0.47,0.53,0.58],
  [0.0,0.0,0.0,0.02,0.06,0.12,0.19,0.26,0.33,0.39,0.44,0.49],
  [0.0,0.0,0.0,0.0,0.03,0.08,0.14,0.20,0.26,0.32,0.37,0.42],
]

// ─── CountUp hook ──────────────────────────────────────────────────────────────
function useCountUp(target: string, active: boolean) {
  const [display, setDisplay] = useState(target)
  const rafRef = useRef<number | null>(null)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!active || hasRun.current) return
    const match = target.match(/[\d.]+/)
    if (!match) { setDisplay(target); return }
    const end = parseFloat(match[0])
    const prefix = target.slice(0, match.index)
    const suffix = target.slice((match.index ?? 0) + match[0].length)
    const isDecimal = match[0].includes('.')
    const duration = 1400
    const start = performance.now()
    hasRun.current = true
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      const val = end * ease
      setDisplay(prefix + (isDecimal ? val.toFixed(1) : Math.floor(val)) + suffix)
      if (p < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [active, target])

  return display
}

// ─── Compound Effect Chart ─────────────────────────────────────────────────────
function CompoundChart({ triggered }: { triggered: boolean }) {
  const [visibleLayers, setVisibleLayers] = useState(0)
  const [tooltip, setTooltip] = useState<{ x: number; y: number; label: string; val: string } | null>(null)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!triggered || hasRun.current) return
    hasRun.current = true
    CHART_LAYERS.forEach((_, i) => {
      setTimeout(() => setVisibleLayers(i + 1), i * 300)
    })
  }, [triggered])

  const W = 900, H = 320
  const PAD = { t: 20, r: 20, b: 40, l: 48 }
  const cw = W - PAD.l - PAD.r
  const ch = H - PAD.t - PAD.b
  const months = 12

  const stacks: number[][] = []
  for (let m = 0; m < months; m++) {
    let cum = 0
    stacks.push(BASE_CURVES.map(row => { cum += row[m]; return cum }))
  }
  const maxVal = stacks[months - 1][CHART_LAYERS.length - 1]

  const xPos = (m: number) => PAD.l + (m / (months - 1)) * cw
  const yPos = (v: number) => PAD.t + ch - (v / maxVal) * ch

  const layerPath = (layerIdx: number): string => {
    const top = stacks.map((s, m) => ({ m, v: s[layerIdx] }))
    const bot = layerIdx === 0
      ? top.map(p => ({ ...p, v: 0 }))
      : stacks.map((s, m) => ({ m, v: s[layerIdx - 1] }))
    const pts = top.map(p => `${xPos(p.m).toFixed(1)},${yPos(p.v).toFixed(1)}`).join(' L ')
    const bpts = bot.slice().reverse().map(p => `${xPos(p.m).toFixed(1)},${yPos(p.v).toFixed(1)}`).join(' L ')
    return `M ${pts} L ${bpts} Z`
  }

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = (e.currentTarget as SVGSVGElement).getBoundingClientRect()
    const svgX = ((e.clientX - rect.left) / rect.width) * W
    const mRaw = ((svgX - PAD.l) / cw) * (months - 1)
    const m = Math.max(0, Math.min(months - 1, Math.round(mRaw)))
    const svgY = ((e.clientY - rect.top) / rect.height) * H
    let hit = -1
    for (let li = CHART_LAYERS.length - 1; li >= 0; li--) {
      if (svgY >= yPos(li === 0 ? 0 : stacks[m][li - 1]) && svgY <= yPos(stacks[m][li])) {
        hit = li; break
      }
    }
    if (hit < 0) { setTooltip(null); return }
    const contrib = (stacks[m][hit] - (hit === 0 ? 0 : stacks[m][hit - 1])).toFixed(2)
    setTooltip({ x: e.clientX - rect.left, y: e.clientY - rect.top, label: CHART_LAYERS[hit].label, val: `+${contrib}x at Month ${m + 1}` })
  }

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: '100%', height: 'auto', overflow: 'visible', cursor: 'crosshair' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setTooltip(null)}
      >
        <defs>
          {CHART_LAYERS.map((_, i) => (
            <clipPath key={i} id={`clip-${i}`}>
              <rect x={PAD.l} y={0} width={0} height={H}>
                {triggered && (
                  <animate attributeName="width" from="0" to={cw} dur="1.4s" begin={`${i * 0.3}s`} fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1" keyTimes="0;1" />
                )}
              </rect>
            </clipPath>
          ))}
        </defs>

        {[0, 0.25, 0.5, 0.75, 1].map(f => {
          const y = yPos(f * maxVal)
          return (
            <g key={f}>
              <line x1={PAD.l} y1={y} x2={W - PAD.r} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              <text x={PAD.l - 6} y={y + 4} fill="rgba(255,255,255,0.25)" fontSize="10" textAnchor="end">
                {(f * maxVal).toFixed(1)}x
              </text>
            </g>
          )
        })}

        {[1, 3, 6, 9, 12].map(m => (
          <text key={m} x={xPos(m - 1)} y={H - 6} fill="rgba(255,255,255,0.25)" fontSize="10" textAnchor="middle">
            M{m}
          </text>
        ))}

        {CHART_LAYERS.map((layer, i) => (
          i < visibleLayers && (
            <path key={i} d={layerPath(i)} fill={layer.color} opacity={0.82} clipPath={`url(#clip-${i})`} />
          )
        ))}

        <line x1={PAD.l} y1={PAD.t} x2={PAD.l} y2={H - PAD.b} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <line x1={PAD.l} y1={H - PAD.b} x2={W - PAD.r} y2={H - PAD.b} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      </svg>

      {tooltip && (
        <div style={{ position: 'absolute', left: tooltip.x + 12, top: tooltip.y - 8, background: 'rgba(15,15,15,0.95)', border: '1px solid rgba(232,71,10,0.4)', borderRadius: '8px', padding: '10px 14px', pointerEvents: 'none', zIndex: 10, backdropFilter: 'blur(8px)' }}>
          <div className="font-syne font-bold" style={{ fontSize: '12px', color: 'var(--orange)', marginBottom: '3px' }}>{tooltip.label}</div>
          <div className="font-outfit" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>{tooltip.val}</div>
        </div>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '20px', justifyContent: 'center' }}>
        {CHART_LAYERS.map((layer, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', opacity: i < visibleLayers ? 1 : 0.2, transition: 'opacity 0.4s ease' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: layer.color, flexShrink: 0 }} />
            <span className="font-outfit text-[11px]" style={{ color: 'rgba(255,255,255,0.55)', letterSpacing: '0.03em' }}>{layer.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Service strip ─────────────────────────────────────────────────────────────
function ServiceStrip({ svc, index, isOpen, onToggle }: {
  svc: typeof SERVICES[0]
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  const bodyRef = useRef<HTMLDivElement>(null)
  const numWmRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = bodyRef.current
    if (!el) return
    if (isOpen) {
      el.style.maxHeight = el.scrollHeight + 2000 + 'px'
      el.style.opacity = '1'
    } else {
      el.style.maxHeight = '0px'
      el.style.opacity = '0'
    }
  }, [isOpen])

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const wm = numWmRef.current
    if (!wm) return
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 30
    wm.style.transform = `translateX(${x}px)`
  }, [])
  const onMouseLeave = useCallback(() => {
    const wm = numWmRef.current
    if (wm) wm.style.transform = ''
  }, [])

  const c0 = useCountUp(svc.stats[0].num, isOpen)
  const c1 = useCountUp(svc.stats[1].num, isOpen)
  const c2 = useCountUp(svc.stats[2].num, isOpen)
  const counts = [c0, c1, c2]

  return (
    <div
      className="svc-strip"
      data-index={index}
      style={{
        borderBottom: '1px solid rgba(0,0,0,0.08)',
        background: isOpen ? 'rgba(255,101,0,0.025)' : 'transparent',
        transition: 'background 0.4s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Watermark */}
      <div
        ref={numWmRef}
        aria-hidden
        className="font-syne"
        style={{
          position: 'absolute',
          right: '-20px',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: 'clamp(80px,10vw,140px)',
          color: 'rgba(255,101,0,0.04)',
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
          transition: 'transform 0.4s ease',
          zIndex: 0,
        }}
      >{svc.number}</div>

      {/* Header row */}
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '52px 1fr auto auto',
          alignItems: 'center',
          gap: '20px',
          padding: 'clamp(18px,2vw,28px) clamp(24px,4vw,64px)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Number */}
        <span
          className="font-outfit text-[13px] tracking-[0.08em]"
          style={{ color: isOpen ? 'var(--orange)' : 'rgba(13,13,15,0.25)', transition: 'color 0.4s ease', lineHeight: 1 }}
        >{svc.number}</span>

        {/* Title */}
        <span
          className="font-syne font-bold"
          style={{ fontSize: 'clamp(17px,2.2vw,28px)', letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1.1 }}
        >{svc.title}</span>

        {/* Tagline — desktop only */}
        <span
          className="svc-tagline font-outfit font-light text-[13px]"
          style={{ color: 'var(--text-muted)', fontStyle: 'italic', maxWidth: '260px', lineHeight: 1.5, display: 'none' }}
        >{svc.tagline}</span>

        {/* +/× indicator */}
        <div style={{
          width: '34px', height: '34px', borderRadius: '50%',
          border: isOpen ? '1.5px solid var(--orange)' : '1.5px solid rgba(13,13,15,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '15px',
          color: isOpen ? 'var(--orange)' : 'var(--text-muted)',
          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
          flexShrink: 0,
        }}>+</div>
      </button>

      {/* Expandable body */}
      <div
        ref={bodyRef}
        style={{ maxHeight: '0px', opacity: 0, overflow: 'hidden', transition: 'max-height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease' }}
      >
        {/* 3-col grid */}
        <div
          className="svc-body-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '200px 1fr 300px',
            gap: 'clamp(24px,3vw,48px)',
            padding: '0 clamp(24px,4vw,64px) 40px',
            paddingLeft: 'calc(clamp(24px,4vw,64px) + 52px + 20px)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* COL 1 — Stats */}
          <div style={{ overflow: 'hidden' }}>
            <p className="font-outfit text-[10px] tracking-[0.4em] uppercase" style={{ color: 'var(--orange)', marginBottom: '24px' }}>
              By The Numbers
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {svc.stats.map((stat, j) => (
                <div key={j}>
                  <div
                    className="font-syne font-extrabold"
                    style={{ fontSize: 'clamp(24px,3vw,40px)', lineHeight: 1, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: '4px', wordBreak: 'break-all' }}
                  >{counts[j]}</div>
                  <div className="font-outfit text-[10px] uppercase tracking-[0.25em]" style={{ color: 'var(--text-muted)' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* COL 2 — Description + deliverables */}
          <div>
            <p className="font-outfit text-[10px] tracking-[0.4em] uppercase" style={{ color: 'var(--orange)', marginBottom: '24px' }}>
              What We Do
            </p>
            <p className="font-outfit font-light leading-relaxed" style={{ fontSize: 'clamp(14px,1.2vw,17px)', color: 'var(--text-muted)', marginBottom: '20px' }}>
              {svc.copy}
            </p>
            <div style={{ display: 'flex', gap: '12px', padding: '14px 18px', border: '1px solid var(--border)', background: 'var(--orange-glow)', borderRadius: '8px', marginBottom: '24px' }}>
              <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <p className="font-outfit font-light" style={{ fontSize: '13px', fontStyle: 'italic', color: 'var(--text-primary)', lineHeight: 1.6, margin: 0 }}>{svc.result}</p>
            </div>
            <p className="font-outfit text-[10px] tracking-[0.4em] uppercase" style={{ color: 'var(--orange)', marginBottom: '12px' }}>
              What&apos;s Included
            </p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
              {svc.deliverables.map((d, j) => (
                <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '1px', height: '16px', background: 'var(--orange)', opacity: 0.35, flexShrink: 0 }} />
                  <span className="font-outfit font-light text-[13px]" style={{ color: 'var(--text-muted)' }}>{d}</span>
                </li>
              ))}
            </ul>
            <a
              href="/contact"
              className="font-outfit font-semibold text-sm"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                marginTop: '28px', padding: '11px 26px', borderRadius: '999px',
                border: '1.5px solid var(--orange)', color: 'var(--orange)', background: 'transparent',
                textDecoration: 'none', cursor: 'pointer', transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'var(--orange)'; el.style.color = '#fff' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'transparent'; el.style.color = 'var(--orange)' }}
            >
              Start with {svc.title} →
            </a>
          </div>

          {/* COL 3 — Testimonial */}
          <div>
            <p className="font-outfit text-[10px] tracking-[0.4em] uppercase" style={{ color: 'var(--orange)', marginBottom: '24px' }}>
              Client Voice
            </p>
            <div style={{ background: '#111', borderRadius: '16px', padding: '28px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '3px', height: '100%', background: 'var(--orange)' }} />
              <div className="font-syne" style={{ fontSize: '30px', color: 'var(--orange)', lineHeight: 1, marginBottom: '12px' }}>&ldquo;</div>
              <p className="font-outfit font-light" style={{ fontSize: '13px', fontStyle: 'italic', lineHeight: 1.75, color: 'rgba(255,255,255,0.78)', marginBottom: '20px' }}>
                {svc.testimonial.quote}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div className="font-syne font-bold" style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'linear-gradient(135deg,var(--orange),#ff8533)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#fff', flexShrink: 0 }}>
                    {svc.testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-syne font-bold text-[11px]" style={{ color: '#fff' }}>{svc.testimonial.name}</div>
                    <div className="font-outfit font-light text-[10px]" style={{ color: 'rgba(255,255,255,0.38)', marginTop: '2px' }}>{svc.testimonial.role}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} width="10" height="10" viewBox="0 0 24 24" fill="var(--orange)">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div style={{
          borderTop: '1px solid rgba(13,13,15,0.07)',
          margin: '0 clamp(24px,4vw,64px) 0',
          marginLeft: 'calc(clamp(24px,4vw,64px) + 52px + 20px)',
          paddingTop: '24px', paddingBottom: '36px',
          position: 'relative', zIndex: 1,
        }}>
          <p className="font-outfit text-[10px] tracking-[0.4em] uppercase" style={{ color: 'var(--orange)', marginBottom: '18px' }}>
            How It Works
          </p>
          <div className="how-it-works-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px' }}>
            {svc.steps.map((step, j) => (
              <div key={j} style={{ display: 'flex', gap: '12px' }}>
                <span className="font-outfit text-[11px] tracking-[0.04em]" style={{ color: 'var(--orange)', opacity: 0.5, flexShrink: 0, paddingTop: '2px' }}>{step.n}</span>
                <div>
                  <div className="font-syne font-bold text-[13px]" style={{ color: 'var(--text-primary)', marginBottom: '4px', lineHeight: 1.2 }}>{step.title}</div>
                  <div className="font-outfit font-light text-[12px]" style={{ color: 'var(--text-muted)', lineHeight: 1.65 }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [scrollDepth, setScrollDepth] = useState(0)
  const [activeService, setActiveService] = useState(1)
  const [chartTriggered, setChartTriggered] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<HTMLDivElement>(null)
  const didAnimate = useRef(false)

  const toggle = (i: number) => setOpenIndex(prev => prev === i ? null : i)

  // Scroll progress bar
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      if (total > 0) setScrollDepth(window.scrollY / total)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active service badge
  useEffect(() => {
    const strips = document.querySelectorAll('.svc-strip')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const idx = parseInt((e.target as HTMLElement).dataset.index ?? '0')
          setActiveService(idx + 1)
        }
      })
    }, { threshold: 0.3 })
    strips.forEach(s => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  // Chart trigger
  useEffect(() => {
    if (!chartRef.current) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setChartTriggered(true); obs.disconnect() }
    }, { threshold: 0.25 })
    obs.observe(chartRef.current)
    return () => obs.disconnect()
  }, [])

  // Hero entrance
  useEffect(() => {
    if (didAnimate.current) return
    didAnimate.current = true
    const items = heroRef.current?.querySelectorAll<HTMLElement>('.hero-item')
    if (!items) return
    items.forEach((el, i) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(28px)'
      setTimeout(() => {
        el.style.transition = 'opacity 0.7s ease, transform 0.7s ease'
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      }, 80 + i * 100)
    })
  }, [])

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <Navbar />

      {/* Global styles */}
      <style>{`
        @keyframes ticker-scroll { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @media (min-width: 768px) { .svc-tagline { display: block !important; } }
        .svc-strip:last-child { border-bottom: none !important; }
        @media (max-width: 900px) {
          .svc-body-grid { grid-template-columns: 1fr !important; }
          .how-it-works-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 600px) {
          .how-it-works-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Scroll progress */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '3px', zIndex: 9999, background: 'var(--orange-glow)', pointerEvents: 'none' }}>
        <div style={{ height: '100%', background: 'var(--orange)', width: `${scrollDepth * 100}%`, transition: 'width 0.1s linear' }} />
      </div>

      {/* ── HERO ── */}
      <section ref={heroRef} style={{ padding: 'clamp(120px,12vw,160px) clamp(24px,5vw,80px) clamp(56px,7vw,100px)', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, backgroundImage: 'linear-gradient(var(--border-subtle) 1px,transparent 1px),linear-gradient(90deg,var(--border-subtle) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />
        <div aria-hidden style={{ position: 'absolute', top: '-10%', right: '-5%', width: 'clamp(240px,32vw,480px)', height: 'clamp(240px,32vw,480px)', borderRadius: '50%', background: 'radial-gradient(circle,var(--orange-glow) 0%,transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }} />

        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Label pill — matches homepage exactly */}
          <div className="hero-item" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid var(--border)', background: 'var(--orange-glow)', borderRadius: '100px', padding: '6px 16px', marginBottom: '28px' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--orange)', display: 'inline-block', width: '5px', height: '5px', borderRadius: '50%' }} />
            <span className="font-outfit text-[11px] tracking-[0.35em] uppercase" style={{ color: 'var(--orange)' }}>
              Our Services
            </span>
          </div>

          {/* Hero h1 — same scale as homepage hero */}
          <h1 className="hero-item font-syne font-extrabold leading-none" style={{ fontSize: 'clamp(28px,4.5vw,64px)', color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: '28px' }}>
            Seven Weapons.<br />
            <span style={{ color: 'var(--orange)' }}>One Mission.</span>
          </h1>

          <div className="hero-item" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: '24px', justifyContent: 'space-between' }}>
            <p className="font-outfit font-light leading-relaxed" style={{ fontSize: 'clamp(14px,1.2vw,17px)', color: 'var(--text-muted)', maxWidth: '480px' }}>
              Every service we offer is a precision growth lever. Pull the right ones and your brand doesn&apos;t just grow — it compounds. We&apos;ve engineered growth for 100+ brands across India.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
              {['₹10Cr+ Ad Spend', '100+ Brands', '97% Retention', '4.9★ Rating'].map(t => (
                <span key={t} className="font-outfit text-[11px]" style={{ padding: '7px 16px', borderRadius: '999px', background: 'var(--bg-secondary)', color: 'var(--text-muted)', border: '1px solid var(--border-strong)' }}>{t}</span>
              ))}
            </div>
          </div>

          <div className="hero-item" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '36px' }}>
            <a
              href="/contact"
              className="font-outfit font-semibold text-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', background: 'var(--orange)', color: '#fff', textDecoration: 'none', cursor: 'pointer', boxShadow: '0 6px 26px var(--orange-glow)', transition: 'transform 0.2s ease,box-shadow 0.2s ease' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = '' }}
            >Get Free Audit →</a>
            <Link
              href="/work"
              className="font-outfit font-medium text-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', border: '1.5px solid var(--border-strong)', color: 'var(--text-primary)', textDecoration: 'none', cursor: 'pointer', transition: 'border-color 0.2s ease' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--orange)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-strong)' }}
            >See Our Work</Link>
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div style={{ overflow: 'hidden', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', padding: '14px 0', background: 'var(--bg-secondary)' }}>
        <div style={{ display: 'flex', animation: 'ticker-scroll 22s linear infinite', whiteSpace: 'nowrap', willChange: 'transform' }}>
          {[...Array(4)].map((_, rep) => (
            <span key={rep} style={{ display: 'inline-flex' }}>
              {TICKER.map(t => (
                <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: '16px', paddingRight: '32px' }}>
                  <span className="font-outfit text-[10px] tracking-[0.25em] uppercase" style={{ color: 'var(--orange)' }}>{t}</span>
                  <span style={{ color: 'var(--border)', fontSize: '6px' }}>◆</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── ACCORDION ── */}
      <section style={{ padding: 'clamp(56px,7vw,96px) 0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ padding: '0 clamp(24px,4vw,64px) clamp(28px,4vw,48px)' }}>
            <span className="font-outfit text-[10px] tracking-[0.4em] uppercase" style={{ color: 'var(--orange)', display: 'block', marginBottom: '10px' }}>
              What We Do
            </span>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
              <h2 className="font-syne font-extrabold leading-none" style={{ fontSize: 'clamp(22px,3vw,40px)', letterSpacing: '-0.02em', color: 'var(--text-primary)', margin: 0 }}>
                Click any service to explore
              </h2>
              <p className="font-outfit font-light text-[12px]" style={{ color: 'var(--text-muted)', margin: 0 }}>
                {openIndex !== null ? SERVICES[openIndex].title : '7 services · tap to expand'}
              </p>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border-subtle)' }}>
            {SERVICES.map((svc, i) => (
              <ServiceStrip
                key={svc.number}
                svc={svc}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPOUND EFFECT ── */}
      <section ref={chartRef} style={{ background: '#0f0f0f', padding: 'clamp(72px,9vw,128px) clamp(24px,5vw,80px)', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, backgroundImage: 'linear-gradient(rgba(255,101,0,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,101,0,0.025) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div aria-hidden style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '700px', height: '500px', background: 'radial-gradient(ellipse,rgba(255,101,0,0.1) 0%,transparent 65%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ marginBottom: '64px' }}>
            <span className="font-outfit text-[10px] tracking-[0.4em] uppercase" style={{ color: 'var(--orange)', display: 'block', marginBottom: '18px' }}>
              The Compound Effect
            </span>
            <h2 className="font-syne font-extrabold leading-none" style={{ fontSize: 'clamp(28px,4.5vw,58px)', letterSpacing: '-0.02em', color: '#ffffff', marginBottom: '16px', maxWidth: '780px' }}>
              When all 7 work together, growth isn&apos;t linear — it&apos;s{' '}
              <span style={{ color: 'var(--orange)' }}>exponential.</span>
            </h2>
            <p className="font-outfit font-light leading-relaxed" style={{ fontSize: 'clamp(14px,1.2vw,17px)', color: 'rgba(255,255,255,0.4)', maxWidth: '520px' }}>
              Here&apos;s what our full-stack clients see in 12 months. Each layer compounds the one below it.
            </p>
          </div>

          <CompoundChart triggered={chartTriggered} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: 'rgba(255,255,255,0.06)', borderRadius: '16px', overflow: 'hidden', marginTop: '56px' }} className="compound-stats">
            {[
              { val: '487%', label: 'Average revenue growth', sub: 'Full-stack clients · 12 months' },
              { val: '12 Months', label: 'Average time to full compound effect', sub: 'From onboarding to peak performance' },
              { val: '₹10Cr+', label: 'Total ad spend managed', sub: 'Across all services & clients' },
            ].map((stat, i) => (
              <div key={i} style={{ padding: 'clamp(28px,3vw,48px)', background: '#0f0f0f' }}>
                <div className="font-syne font-extrabold" style={{ fontSize: 'clamp(28px,4vw,52px)', letterSpacing: '-0.02em', color: '#fff', lineHeight: 1, marginBottom: '10px' }}>{stat.val}</div>
                <div className="font-outfit text-[13px]" style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, marginBottom: '4px' }}>{stat.label}</div>
                <div className="font-outfit font-light text-[11px]" style={{ color: 'rgba(255,255,255,0.25)' }}>{stat.sub}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '56px', textAlign: 'center' }}>
            <a
              href="/contact"
              className="font-outfit font-semibold"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '12px',
                padding: '18px 52px',
                background: 'var(--orange)', color: '#fff',
                fontSize: '15px',
                textDecoration: 'none', cursor: 'pointer',
                boxShadow: '0 8px 40px rgba(255,101,0,0.4)',
                transition: 'transform 0.2s ease,box-shadow 0.2s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 14px 56px rgba(255,101,0,0.55)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 40px rgba(255,101,0,0.4)' }}
            >
              Build Your Full-Stack Growth Engine →
            </a>
            <p className="font-outfit font-light text-[11px]" style={{ color: 'rgba(255,255,255,0.2)', marginTop: '14px' }}>No contracts. No fluff. Just compounding results.</p>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section style={{ padding: 'clamp(72px,9vw,120px) clamp(24px,5vw,80px)', background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '400px', background: 'radial-gradient(ellipse,rgba(255,101,0,0.12) 0%,transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <span className="font-outfit text-[10px] tracking-[0.4em] uppercase" style={{ color: 'var(--orange)', display: 'block', marginBottom: '18px' }}>
            Not sure where to start?
          </span>
          <h2 className="font-syne font-extrabold leading-none" style={{ fontSize: 'clamp(28px,5vw,60px)', letterSpacing: '-0.02em', color: '#fff', marginBottom: '18px' }}>
            Let&apos;s figure it out<br />together.
          </h2>
          <p className="font-outfit font-light leading-relaxed" style={{ fontSize: 'clamp(14px,1.2vw,17px)', color: 'rgba(255,255,255,0.4)', marginBottom: '32px', maxWidth: '440px', marginLeft: 'auto', marginRight: 'auto' }}>
            Book a free 30-minute audit and we&apos;ll tell you exactly which services your brand needs — and which ones it doesn&apos;t.
          </p>
          <a
            href="/contact"
            className="font-outfit font-semibold text-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '15px 42px', background: 'var(--orange)', color: '#fff', textDecoration: 'none', cursor: 'pointer', boxShadow: '0 8px 34px rgba(255,101,0,0.36)', transition: 'transform 0.2s ease,box-shadow 0.2s ease' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 14px 48px rgba(255,101,0,0.5)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 34px rgba(255,101,0,0.36)' }}
          >Claim Your Free Audit →</a>
          <p className="font-outfit font-light text-[11px]" style={{ color: 'rgba(255,255,255,0.18)', marginTop: '14px' }}>No contracts. No fluff. Just clarity.</p>
        </div>
      </section>

      {/* Floating badge */}
      <div style={{ position: 'fixed', bottom: '32px', left: '24px', zIndex: 9998, background: 'var(--nav-bg)', backdropFilter: 'blur(16px)', border: '1px solid var(--border-subtle)', borderRadius: '999px', padding: '9px 16px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--orange)' }} />
        <span className="font-outfit text-[10px]" style={{ color: 'var(--text-muted)' }}>Service</span>
        <span className="font-syne font-bold" style={{ fontSize: '14px', color: 'var(--orange)', letterSpacing: '-0.01em' }}>
          {String(activeService).padStart(2,'0')}<span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>/07</span>
        </span>
      </div>

      <Footer />
    </div>
  )
}
