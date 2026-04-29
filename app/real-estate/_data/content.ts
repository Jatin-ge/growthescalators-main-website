/**
 * All copy and data for the /real-estate landing page.
 *
 * Targeted at: builders, developers, and project marketing teams selling
 * premium residential, commercial, and luxury properties — not individual
 * agents flipping resale flats.
 */

import type { LandingContent } from '@/components/landing/IndustryLandingPage'

export const REAL_ESTATE_CONTENT: LandingContent = {
  industryLabel: 'Real Estate',

  hero: {
    badge: 'TRUSTED BY DEVELOPERS SELLING ₹50CR+ INVENTORY',
    headlineLines: ['More Site Visits.', 'Higher-Quality Buyers.'],
    cyclingWords: [
      'Built for builders.',
      'Built for developers.',
      'Built for premium projects.',
      'Built for luxury residential.',
      'Built for commercial real estate.',
    ],
    subhead:
      "We help real estate developers fill site visits with serious, capable buyers — not tire-kickers — through AI-powered targeting that matches your project's price tier, audience, and timeline. Premium projects deserve premium leads.",
    primaryCta: { label: 'Book a Free Project Audit', href: '#lead-form' },
    secondaryCta: { label: 'See Real Results ↓', href: '#results' },
    statPills: [
      { emoji: '🏗️', value: '₹500Cr+', label: 'Inventory Marketed' },
      { emoji: '🎯', value: '4.7×',    label: 'Buyer-Quality Score' },
      { emoji: '📅', value: '+218%',   label: 'Avg. Site-Visit Lift' },
    ],
  },

  painPointsTag: 'IF ANY OF THIS SOUNDS FAMILIAR',
  painPointsHeadline: "Why most real estate marketing burns budget without filling sales galleries",
  painPoints: [
    {
      emoji: '🥱',
      title: 'Tire-kickers eating your sales team',
      body: "Most agencies optimize for cheap leads, not good ones. Your sales reps spend 80% of their time qualifying out window-shoppers and competitors’ brokers — and miss real buyers in the noise.",
    },
    {
      emoji: '⏳',
      title: 'A 6-month decision cycle nobody is nurturing',
      body: 'Real estate isn’t e-com. Buyers research for 3–9 months before they sign. Most agencies run a Meta campaign, hand you the leads, and walk away — leaving your follow-up to chance and your CRM rotting.',
    },
    {
      emoji: '💎',
      title: 'Premium projects, generic audiences',
      body: 'Your ₹5 crore villa is being shown to people whose annual income is ₹15 lakh. Generic interest-based targeting can’t differentiate aspirational scrollers from actual UHNW buyers — and you’re the one paying for every wasted impression.',
    },
    {
      emoji: '🤝',
      title: 'Brokers eating your margin',
      body: "When direct lead-gen fails, you fall back on broker channels — paying 1.5–3% per booking and losing pricing control as brokers play projects against each other. Your direct funnel should be the cheaper one.",
    },
  ],

  aiAdvantage: {
    tag: 'POWERED BY AI',
    headline: "Premium projects need premium intelligence",
    subhead:
      "Generic targeting can’t separate a ₹2 crore-budget buyer from a window-shopping student. Our AI is trained specifically on premium-property buyer behavior — and it shows up in every part of the funnel.",
    cards: [
      {
        emoji: '🧠',
        title: 'AI buyer-quality scoring',
        body: "Every lead is scored on 30+ signals (income proxies, profession, search history, time-on-page, response speed) before it reaches your sales team. Your reps only call leads scoring 70+. Useless leads are silently filtered.",
      },
      {
        emoji: '🎯',
        title: 'AI look-alikes from real signed deals',
        body: "Most agencies build look-alikes from “leads.” We build them from your actual signed bookings (with consent). The audience matches the people who actually wrote checks — not the people who clicked your ad.",
      },
      {
        emoji: '💬',
        title: 'AI-driven 6-month nurture',
        body: "Personalized WhatsApp + email + retargeting sequences that adapt to where each buyer is in their decision cycle. AI watches engagement patterns and re-engages cold leads with the right message at the right week.",
      },
      {
        emoji: '📊',
        title: 'AI demand-forecasting for pre-launches',
        body: "Predict exactly when your campaign should peak: 6 weeks before launch, 2 weeks, launch week. Our AI watches search volume, competitor inventory absorption, and seasonal patterns — so your launch budget hits when it matters.",
      },
    ],
  },

  servicesTag: 'WHAT WE DO',
  servicesHeadline: 'A complete sales-gallery-filling engine',
  servicesSubhead: "Six services, one promise: a calendar of qualified site visits with buyers who can actually afford your project.",
  services: [
    {
      title: 'Premium-Project Performance Marketing',
      body: 'Meta + Google + LinkedIn campaigns calibrated to your project’s price tier. Income-targeted creative, geo-fenced to high-affluence pockets, with budget split engineered around your absorption goals.',
    },
    {
      title: 'NRI / HNI Audience Targeting',
      body: 'Layered targeting for Non-Resident Indian and high-net-worth audiences—people genuinely capable of premium-property purchases. We layer in publication readership, investment behaviors, and travel patterns the standard interest-targeting can’t see.',
    },
    {
      title: 'Virtual Tour & 3D Walk-Through Funnels',
      body: 'Drone footage, 360° apartment tours, and 3D model integrations—paired with conversion-optimized landing pages that turn the buyer who couldn’t visit physically into a booked site visit.',
    },
    {
      title: 'Builder & Developer SEO',
      body: 'Rank for "luxury apartments in [city]", "premium villas [location]", "commercial property [micromarket]". Long-term, compounding traffic that’s 5–10× cheaper than Meta ads month over month.',
    },
    {
      title: 'WhatsApp + CRM Nurture for Long Sales Cycles',
      body: 'Multi-month automated sequences keyed to where each buyer is in their decision—pricing-curiosity, configuration-comparison, financing-question, ready-to-book. Built to handle the 6-month decision cycle real estate actually has.',
    },
    {
      title: 'Pre-Launch Hype + EOI Campaigns',
      body: 'Engineered campaigns for the 6–8 weeks before a project launch—expression-of-interest forms, exclusive pre-launch pricing, broker-bypass referral programs. Most projects sell 30–40% of inventory in pre-launch when this is done right.',
    },
  ],

  resultsTag: 'PROOF, NOT PROMISES',
  resultsHeadline: 'Developers we’ve helped sell faster',
  resultHighlight: {
    label: 'FEATURED CLIENT',
    name: 'Aspire Developers',
    detail: 'Premium Residential Highrise · 2 Towers · Jaipur',
    quote:
      "Our previous agency was getting us 400 leads a month at ₹350 per lead—our sales team was drowning in tire-kickers and we were closing 6 bookings. Growth Escalators got us 220 leads at ₹780, but 27 became signed bookings in the same period. Their AI scoring is the real difference.",
    metrics: [
      { value: '+340%', label: 'Booking conversion (90 days)' },
      { value: '₹780',  label: 'Cost per qualified lead'        },
      { value: '12.4×', label: 'Return on ad spend (project)'   },
    ],
  },

  process: [
    {
      step: '01',
      title: 'Project & Audience Audit',
      body: 'A 45-minute call. We review your project tier, target buyer profile, current marketing spend, and lead-quality data. We tell you exactly which audiences your current campaigns are missing.',
    },
    {
      step: '02',
      title: 'Custom Launch Plan',
      body: 'Within 7 days you get a written plan: campaign architecture, budget allocation by pre-launch / launch / sustain phases, expected absorption timeline, and the unit economics we’ll be accountable to.',
    },
    {
      step: '03',
      title: 'Build & Launch',
      body: 'Tracking, AI scoring, landing pages, CRM integrations, and the first wave of campaigns go live within 14 days. Most projects see their first qualified site visit in week 1.',
    },
    {
      step: '04',
      title: 'Optimize Toward Bookings',
      body: 'We optimize for cost-per-booking, not cost-per-lead. Weekly creative refresh, audience expansion as inventory shifts, and broker-bypass programs to protect your margin as the project scales.',
    },
  ],

  whyUs: [
    {
      title: 'Real estate-only on this team',
      body: "Our real estate pod has marketed over ₹500 crore of premium inventory. We don’t dilute attention with restaurants or doctors—only builders, developers, and project marketing teams.",
    },
    {
      title: 'Cost-per-booking accountable',
      body: 'We don’t optimize for cheap leads. We optimize for signed bookings. We can structure performance contracts around CPL, CPSV (cost per site visit), or even CPB (cost per booking) for qualified projects.',
    },
    {
      title: 'Broker-bypass DNA',
      body: 'Every campaign is structured to maximize direct bookings, not feed broker channels. We protect your margin and your project pricing strategy.',
    },
    {
      title: 'You own everything',
      body: 'CRM data, ad accounts, landing pages, creative library, audience seeds—all created in your name. Fire us at any point and you walk away with the entire infrastructure intact.',
    },
  ],

  faqs: [
    {
      q: 'How is this different from a generic Meta agency?',
      a: 'Generic agencies optimize for cheap clicks. We optimize for signed bookings. The AI scoring layer alone typically improves your sales-team efficiency by 3–4×, because they stop wasting calls on unqualified buyers. We also handle the 6-month nurture that most agencies skip entirely.',
    },
    {
      q: 'What’s the minimum project size you work with?',
      a: 'We work best with developers selling at least ₹50 crore of inventory across the project lifecycle—that’s usually a 30–100 unit residential project at ₹1.5 crore+ ticket size, or a commercial project of similar value. Smaller projects work too but the unit economics get tight below this scale.',
    },
    {
      q: 'Do you handle NRI marketing?',
      a: 'Yes—for premium Indian projects, NRI audiences are often 30–50% of bookings. We have established geo + behavioral targeting playbooks for the UAE, Singapore, US, UK, and Australia, including currency-aware creative and tax-aware landing pages.',
    },
    {
      q: 'How do you handle the broker conflict?',
      a: 'We design campaigns specifically to drive direct enquiries. Where a project is broker-heavy by tradition, we run parallel direct-funnel and broker-aware funnel structures so you can A/B them and shift mix over time. You stay in control of pricing.',
    },
    {
      q: 'How long before we see real bookings?',
      a: "Qualified site visits start in week 1–2. First bookings typically land in week 6–10, since real estate has a built-in 30–60 day decision lag from first interest to booking. Pre-launch projects often see bookings faster because demand is concentrated.",
    },
    {
      q: 'What if we’re launching multiple projects?',
      a: 'For developer groups with multiple active or upcoming projects, we structure campaigns around shared audience pools and project-level budget allocation. This is far more efficient than running parallel agencies per project. Multi-project pricing on request.',
    },
  ],

  finalCta: {
    title: 'Ready to fill your sales gallery with real buyers?',
    subhead: "Book a free, no-obligation project audit. We’ll review your current campaigns, your buyer-quality data, and your pre-launch / launch timeline—and tell you the three highest-leverage fixes, whether you hire us or not.",
    ctaLabel: 'Book a Free Project Audit',
  },

  videoTestimonialsTag: 'HEAR FROM DEVELOPERS',
  videoTestimonialsHeadline: 'Real builders, real bookings',
  videoTestimonialsSubhead: 'Tap any short to hear how we helped them sell premium inventory faster.',
  videoTestimonials: [
    // Add YouTube Shorts URLs from real estate clients here.
  ],

  leadForm: {
    recipient: 'Info@growthescalators.com',
    subjectPrefix: 'New Real Estate Lead',
    headline: "Tell us about your project",
    subhead: "Share a few details about your project, and we’ll get back within 24 hours with your free audit.",
    tag: "BOOK YOUR FREE AUDIT",
  },
}
