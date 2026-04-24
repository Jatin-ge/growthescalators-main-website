'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { X, Send, MessageCircle } from 'lucide-react'
import gsap from 'gsap'

// ─── Types ────────────────────────────────────────────────────────────────────

type StateKey =
  | 'welcome'
  | 'just_browsing'
  | 'quick_question'
  | 'show_services'
  | 'service_selected'
  | 'show_results'
  | 'who_worked_with'
  | 'how_it_works'
  | 'pricing'
  | 'seems_expensive'
  | 'collect_name'
  | 'collect_business'
  | 'collect_service_interest'
  | 'collect_budget'
  | 'collect_time'
  | 'booking_confirmed'
  | 'all_set'
  | 'contact_info'
  | 'location_info'
  | 'fallback_question'
  | 'case_studies'
  | 'team_info'
  | 'onboarding_info'
  | 'guarantee_info'
  | 'timeline_info'
  | 'industries_info'
  | 'about_ge'

interface Message {
  id: string
  role: 'bot' | 'user'
  text: string
  chips?: string[]
  showInput?: boolean
  timestamp: number
}

interface BotState {
  currentState: StateKey
  userName: string
  businessName: string
  selectedService: string
  selectedBudget: string
  messages: Message[]
  unreadCount: number
}

// ─── State Machine Config ─────────────────────────────────────────────────────

const SERVICE_MESSAGES: Record<string, string> = {
  'Performance Marketing':
    "Smart choice 🎯 We manage ₹10Cr+ in Meta & Google ad spend. Our clients see an average 30% CPL reduction in 60 days and 2.5x ROAS growth. We run everything from lead gen to e-commerce scaling — with weekly reporting so you always know what's working. Want to see if this is right for your brand?",
  'Funnel & Automation':
    "Love it 🔄 We build end-to-end funnels that convert strangers into loyal buyers — fully automated via WhatsApp sequences, email drips & smart retargeting. Clients see 3.2x lead-to-sale conversion in 90 days. Ready to plug the leaks in your funnel?",
  'Website Development':
    "Great pick 💻 We build fast, CRO-optimised websites that load in under 2 seconds and rank on Google. Our average client sees a 67% speed improvement and measurable uplift in on-site conversions. Want a free audit of your current site?",
  'Personal Branding':
    "Powerful move 🌟 We've grown founders from 0 to 8,200+ LinkedIn followers with 10+ inbound leads per week — all organically. We handle content strategy, ghostwriting, and positioning. Is this for you or your business?",
  'Social Media':
    "Perfect 📱 We build content systems that grow communities, not just post counts. Average 300% engagement increase in 90 days. We handle strategy, creation, and distribution across all platforms. What platform are you most focused on?",
  'Branding & Identity':
    "Excellent 🎨 We've built 100+ brand identities from scratch. A strong brand converts 60% better and commands higher prices. We do everything from logo & guidelines to full brand books. Do you have an existing brand or are you starting fresh?",
  SEO: "Strong foundation 🔍 We get clients to Page 1 within 4 months with 200%+ organic traffic growth — through technical SEO, authority building, and content clusters. Do you have an existing website we can audit?",
}

const getStateConfig = (
  state: StateKey,
  data: { userName: string; businessName: string }
): { text: string; chips?: string[]; showInput?: boolean } => {
  const { userName, businessName } = data

  switch (state) {
    case 'welcome':
      return {
        text: "Hey there 👋 I'm Growth Bot — your personal guide to everything Growth Escalators. Are you looking to grow your brand, or just exploring?",
        chips: ["I want to grow my brand 🚀", "Just browsing 👀", "I have a quick question ❓"],
      }
    case 'just_browsing':
      return {
        text: "No worries at all! Feel free to explore. Just so you know — we've scaled 100+ brands across Performance Marketing, Funnels, Web, Social, SEO and more. Anything catch your eye?",
        chips: ['Tell me about your services', 'Show me results', 'Who have you worked with?'],
      }
    case 'quick_question':
      return {
        text: "Of course! What's on your mind? Ask me anything about Growth Escalators, our services, pricing, or how we work.",
        showInput: true,
      }
    case 'show_services':
      return {
        text: 'We offer 7 core growth services 🚀 Each one is data-driven, results-focused and built around your specific goals. Which one interests you most?',
        chips: [
          'Performance Marketing',
          'Funnel & Automation',
          'Website Development',
          'Personal Branding',
          'Social Media',
          'Branding & Identity',
          'SEO',
        ],
      }
    case 'show_results':
      return {
        text: "Our results speak for themselves 📊\n\n• Exzept: ROAS 1.8x → 5.2x in 90 days\n• Yellow Diaries: 0 → 12,400 followers in 5 months\n• Flight Ticket Fare: CPL ₹380 → ₹94\n• Dr. Mukesh: 0 → 8,200 LinkedIn followers\n• Elixzor: ROAS 2.1x → 6.8x\n• A1 Gears: 240% increase in organic traffic\n• StyleHive: 3.4x ROAS in first 45 days\n\nWant results like these for your brand?",
        chips: ["Yes! Let's talk", 'How do you do it?', 'Book free audit'],
      }
    case 'who_worked_with':
      return {
        text: "We've worked with 100+ brands across India — from D2C eCommerce to real estate, healthcare, SaaS, and personal brands. Industries include fashion, F&B, travel, education, wellness and more. Want to see specific case studies?",
        chips: ['Show me case studies', 'Book free audit', 'What services do you offer?'],
      }
    case 'how_it_works':
      return {
        text: "Our process has 5 stages 🚀\n\n1️⃣ Discovery — We audit your brand & find the gaps\n2️⃣ Strategy — Custom 90-day growth blueprint\n3️⃣ Execution — Deploy across all channels simultaneously\n4️⃣ Optimisation — Weekly reporting & real-time adjustments\n5️⃣ Escalation — Scale what works, kill what doesn't\n\nEvery client gets a dedicated strategist and weekly growth calls. Want to start your ascent?",
        chips: ['Start my ascent!', 'Book free audit', 'Tell me about pricing'],
      }
    case 'pricing':
      return {
        text: "We have flexible packages starting from as little as ₹10,000/month all the way up to ₹75,000/month depending on the services and scale you need. A lot of our clients start small and grow their retainer as they see results 📈 The best next step is a free 30-min audit call — we'll scope exactly what you need and what it'll cost. No obligation.",
        chips: ['Book the free audit', 'That works for me', 'Seems expensive'],
      }
    case 'seems_expensive':
      return {
        text: "Totally fair 🙏 But here's the thing — our packages start from just ₹10,000/month. That's less than the cost of one bad ad campaign. And if we improve your ROAS by even 20%, the service pays for itself many times over. We also scale up only when you're ready. Let's just have a quick chat — zero pressure.",
        chips: ["Okay, let's talk", 'Book free audit'],
      }
    case 'collect_name':
      return {
        text: "Amazing! Let's get you booked for your free 30-minute growth audit 🎯 First — what's your name?",
        showInput: true,
      }
    case 'collect_business':
      return {
        text: `Great to meet you, ${userName}! What's the name of your business or brand?`,
        showInput: true,
      }
    case 'collect_service_interest':
      return {
        text: `Perfect. Which service are you most interested in exploring for ${businessName}?`,
        chips: [
          'Performance Marketing',
          'Funnels & Automation',
          'Website Development',
          'Personal Branding',
          'Social Media',
          'Branding & Identity',
          'SEO',
          'Not sure yet',
        ],
      }
    case 'collect_budget':
      return {
        text: "Got it! What's your approximate monthly marketing budget?",
        chips: ['Under ₹50K', '₹50K–1L', '₹1L–3L', '₹3L+', "I'm not sure yet"],
      }
    case 'collect_time':
      return {
        text: "Last one — when works best for your free audit call?",
        chips: ['Today', 'Tomorrow', 'This week', 'Next week', "I'll decide later"],
      }
    case 'booking_confirmed':
      return {
        text: `🎉 Excellent! Here's what happens next:\n\n✅ Our team will reach out to ${userName} within 4 hours\n📞 We'll confirm your slot and send a calendar invite\n🚀 Come prepared with your current marketing challenges\n\nIn the meantime, feel free to explore our work at the Work section!\n\nAny other questions?`,
        chips: ['See your work', 'Ask another question', 'No thanks, all set!'],
      }
    case 'all_set':
      return {
        text: `Brilliant! Looking forward to connecting with you soon, ${userName || 'there'} 🚀 Your growth journey starts here. Have a great day! 🎊`,
      }
    case 'contact_info':
      return {
        text: "You can reach us at:\n\n📧 Info@growthescalators.com\n📞 +91 77338 88883\n💬 WhatsApp: wa.me/917733888883\n\nOr just book the free audit and we'll call you within 4 hours!",
        chips: ['Book the free audit', 'Ask something else'],
      }
    case 'location_info':
      return {
        text: "We're based in Jaipur, Rajasthan 🏰 — but we work with brands across all of India and internationally 🌍 Distance is never a barrier when it comes to growth!",
        chips: ['Tell me about your services', 'Book free audit', 'Ask something else'],
      }
    case 'fallback_question':
      return {
        text: "Great question! Our team would be best placed to answer that in detail. Want to book a free 15-min call with Jatin directly?",
        chips: ['Yes, book the call', 'Ask something else'],
      }
    case 'case_studies':
      return {
        text: "Here are some of our favourite wins 🏆\n\n📦 Exzept (D2C): ROAS 1.8x → 5.2x in 90 days via Meta Ads restructure\n📸 Yellow Diaries: 0 → 12K Instagram followers with organic content\n✈️ Flight Ticket Fare: CPL cut from ₹380 → ₹94 in 45 days\n🩺 Dr. Mukesh: Built personal brand with 8,200 LinkedIn followers\n💎 Elixzor: ROAS from 2.1x → 6.8x in 3 months\n\nWant us to do the same for your brand?",
        chips: ['Yes! Book free audit', 'How did you achieve this?', 'What services do you offer?'],
      }
    case 'team_info':
      return {
        text: "Growth Escalators is led by Jatin — a performance marketer with 5+ years of experience scaling D2C and service brands. The team includes specialists in paid ads, SEO, design, funnels, and social media. We're a lean, results-obsessed crew 💪",
        chips: ['Talk to Jatin', 'Book free audit', 'Tell me more about services'],
      }
    case 'onboarding_info':
      return {
        text: "Onboarding is smooth and fast ⚡\n\n📋 Week 1: Deep-dive audit & strategy call\n🎯 Week 2: Campaign setup & creative production\n🚀 Week 3: Go live across channels\n📊 Week 4: First performance report\n\nMost clients see early results within 30 days. Want to get started?",
        chips: ['Start onboarding', 'Book free audit', 'Tell me about pricing'],
      }
    case 'guarantee_info':
      return {
        text: "We're performance-obsessed 🎯 While we can't guarantee specific numbers (no ethical agency can), we DO guarantee:\n\n✅ Weekly transparent reporting\n✅ Clear KPI targets set upfront\n✅ Performance-linked incentives for eligible clients\n✅ 90-day growth plan with monthly reviews\n\nWe only win when you win.",
        chips: ['Sounds good, book audit', 'Tell me about pricing', 'Ask something else'],
      }
    case 'timeline_info':
      return {
        text: "Here's a realistic timeline 📅\n\n🗓️ Week 1–2: Strategy & setup\n📈 Month 1: Early signals & baseline data\n🚀 Month 2–3: Optimisation & scaling\n💡 Month 4+: Compounding returns\n\nSEO takes 3–4 months for Page 1. Ads can show results in week 1. Every channel is different — we'll set clear expectations in your free audit.",
        chips: ['Book free audit', 'Tell me about pricing', 'Ask something else'],
      }
    case 'industries_info':
      return {
        text: "We've worked across a wide range of industries 🏭\n\n🛍️ D2C & eCommerce\n🏥 Healthcare & Wellness\n🏠 Real Estate\n✈️ Travel & Hospitality\n🎓 Education & EdTech\n👗 Fashion & Lifestyle\n🍕 Food & Beverage\n💼 Professional Services & SaaS\n\nIf your industry isn't listed, we've probably worked in an adjacent one. Let's talk!",
        chips: ['Book free audit', 'Tell me about your services', 'Show me results'],
      }
    case 'about_ge':
      return {
        text: "Growth Escalators is a full-service digital growth agency based in Jaipur 🚀\n\nWe've been scaling brands since 2020 with ₹10Cr+ in ad spend managed, 100+ brands scaled, and a 97% client retention rate. Our philosophy: data-driven strategy + creative execution = compounding growth.\n\nWe don't just run campaigns — we build growth systems.",
        chips: ['Tell me about services', 'See our results', 'Book free audit'],
      }
    default:
      return { text: "How can I help you today?", chips: ['Tell me about your services', 'Book free audit'] }
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const uid = () => Math.random().toString(36).slice(2)

const playPop = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.setValueAtTime(520, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 0.12)
    gain.gain.setValueAtTime(0.08, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.15)
  } catch {}
}

const SESSION_KEY = 'growthbot_state'

const saveSession = (state: BotState) => {
  try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(state)) } catch {}
}

const loadSession = (): BotState | null => {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

const initialState = (): BotState => ({
  currentState: 'welcome',
  userName: '',
  businessName: '',
  selectedService: '',
  selectedBudget: '',
  messages: [],
  unreadCount: 0,
})

// ─── Component ────────────────────────────────────────────────────────────────

export default function GrowthBot() {
  const [open, setOpen] = useState(false)
  const [botState, setBotState] = useState<BotState>(initialState)
  const [typing, setTyping] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showConfetti, setShowConfetti] = useState(false)

  const windowRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const shakeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hasInteracted = useRef(false)
  const isFirstOpen = useRef(true)

  // Load session on mount
  useEffect(() => {
    const saved = loadSession()
    if (saved && saved.messages.length > 0) {
      setBotState(saved)
    } else {
      // Queue welcome message
      queueBotMessage('welcome', { userName: '', businessName: '' })
    }
  }, [])

  // Shake button after 8s if no interaction
  useEffect(() => {
    shakeTimeoutRef.current = setTimeout(() => {
      if (!hasInteracted.current && buttonRef.current) {
        gsap.fromTo(
          buttonRef.current,
          { x: 0 },
          { x: 8, duration: 0.08, repeat: 7, yoyo: true, ease: 'power1.inOut', onComplete: () => gsap.set(buttonRef.current, { x: 0 }) }
        )
      }
    }, 8000)
    return () => { if (shakeTimeoutRef.current) clearTimeout(shakeTimeoutRef.current) }
  }, [])

  // GSAP open/close animation
  useEffect(() => {
    if (!windowRef.current) return
    if (open) {
      gsap.fromTo(
        windowRef.current,
        { opacity: 0, y: 24, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'back.out(1.4)' }
      )
    } else {
      gsap.to(windowRef.current, { opacity: 0, y: 16, scale: 0.96, duration: 0.22, ease: 'power2.in' })
    }
  }, [open])

  // Scroll to bottom on new message
  useEffect(() => {
    const el = messagesContainerRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [botState.messages, typing])

  // Save session on state change
  useEffect(() => {
    if (botState.messages.length > 0) saveSession(botState)
  }, [botState])

  // Reset unread when opened
  useEffect(() => {
    if (open) {
      setBotState(prev => ({ ...prev, unreadCount: 0 }))
      saveSession({ ...botState, unreadCount: 0 })
    }
  }, [open])

  // Auto-focus input
  useEffect(() => {
    if (open && !typing) {
      const lastMsg = botState.messages[botState.messages.length - 1]
      if (lastMsg?.showInput) {
        setTimeout(() => inputRef.current?.focus(), 100)
      }
    }
  }, [open, typing, botState.messages])

  const queueBotMessage = useCallback(
    (state: StateKey, data: { userName: string; businessName: string }, delay = 0) => {
      const config = getStateConfig(state, data)
      const typingDelay = 800 + Math.random() * 400

      setTimeout(() => {
        setTyping(true)
        setTimeout(() => {
          setTyping(false)
          const msg: Message = {
            id: uid(),
            role: 'bot',
            text: config.text,
            chips: config.chips,
            showInput: config.showInput,
            timestamp: Date.now(),
          }
          if (soundEnabled) playPop()
          setBotState(prev => {
            const next = { ...prev, messages: [...prev.messages, msg] }
            if (!open) next.unreadCount = prev.unreadCount + 1
            saveSession(next)
            return next
          })
        }, typingDelay)
      }, delay)
    },
    [open, soundEnabled]
  )

  const addUserMessage = (text: string) => {
    const msg: Message = { id: uid(), role: 'user', text, timestamp: Date.now() }
    setBotState(prev => {
      const next = { ...prev, messages: [...prev.messages, msg] }
      saveSession(next)
      return next
    })
  }

  const transition = useCallback(
    (newState: StateKey, userText?: string, stateOverrides?: Partial<BotState>) => {
      setBotState(prev => {
        const updated = { ...prev, currentState: newState, ...stateOverrides }
        saveSession(updated)
        return updated
      })
      const data = {
        userName: stateOverrides?.userName ?? botState.userName,
        businessName: stateOverrides?.businessName ?? botState.businessName,
      }
      queueBotMessage(newState, data, 200)

      if (newState === 'all_set') {
        setTimeout(() => setShowConfetti(true), 1800)
        setTimeout(() => setShowConfetti(false), 5000)
      }
    },
    [botState, queueBotMessage]
  )

  const handleChip = useCallback(
    (chip: string) => {
      hasInteracted.current = true
      addUserMessage(chip)
      const cur = botState.currentState

      // Welcome
      if (chip === "I want to grow my brand 🚀") return transition('collect_name')
      if (chip === "Just browsing 👀") return transition('just_browsing')
      if (chip === "I have a quick question ❓") return transition('quick_question')

      // Just browsing
      if (chip === 'Tell me about your services') return transition('show_services')
      if (chip === 'Show me results') return transition('show_results')
      if (chip === 'Who have you worked with?') return transition('who_worked_with')

      // Show results
      if (chip === "Yes! Let's talk") return transition('collect_name')
      if (chip === 'How do you do it?') return transition('how_it_works')

      // Results / general
      if (chip === 'Book free audit' || chip === 'Book the free audit' || chip === 'Start my ascent!' || chip === 'Yes, book the call' || chip === 'Start onboarding' || chip === 'Sounds good, book audit') return transition('collect_name')
      if (chip === 'That works for me') return transition('collect_name')
      if (chip === "Okay, let's talk") return transition('collect_name')

      // Who worked with
      if (chip === 'Show me case studies') return transition('case_studies')
      if (chip === 'What services do you offer?') return transition('show_services')

      // How it works
      if (chip === 'Tell me about pricing') return transition('pricing')

      // Pricing
      if (chip === 'Seems expensive') return transition('seems_expensive')

      // Services
      if (SERVICE_MESSAGES[chip]) {
        const msg: Message = {
          id: uid(),
          role: 'bot',
          text: SERVICE_MESSAGES[chip],
          chips: ["Yes, tell me more", "Book a free audit", "Show me another service"],
          timestamp: Date.now(),
        }
        setBotState(prev => {
          const next = { ...prev, currentState: 'service_selected', selectedService: chip, messages: [...prev.messages, msg] }
          if (!open) next.unreadCount = prev.unreadCount + 1
          saveSession(next)
          return next
        })
        if (soundEnabled) setTimeout(playPop, 1000)
        setTyping(true)
        setTimeout(() => setTyping(false), 900 + Math.random() * 400)
        return
      }

      // Service selected follow-ups
      if (chip === "Yes, tell me more") return transition('collect_name')
      if (chip === "Book a free audit") return transition('collect_name')
      if (chip === "Show me another service") return transition('show_services')

      // Collect service interest
      if (cur === 'collect_service_interest') {
        setBotState(prev => ({ ...prev, selectedService: chip }))
        return transition('collect_budget', undefined, { selectedService: chip })
      }

      // Budget
      if (cur === 'collect_budget') {
        setBotState(prev => ({ ...prev, selectedBudget: chip }))
        return transition('collect_time', undefined, { selectedBudget: chip })
      }

      // Time
      if (cur === 'collect_time') return transition('booking_confirmed')

      // Booking confirmed
      if (chip === 'See your work') {
        addUserMessage(chip)
        const msg: Message = {
          id: uid(), role: 'bot',
          text: "Head over to the Work section on our site — you'll find detailed case studies and results there. Is there anything else I can help you with?",
          chips: ['Ask another question', "No thanks, all set!"],
          timestamp: Date.now(),
        }
        setBotState(prev => { const next = { ...prev, messages: [...prev.messages, msg] }; saveSession(next); return next })
        if (soundEnabled) setTimeout(playPop, 1000)
        return
      }
      if (chip === 'Ask another question') return transition('quick_question')
      if (chip === "No thanks, all set!") return transition('all_set')

      // Extra states
      if (chip === 'Tell me about your team' || chip === 'Talk to Jatin') return transition('team_info')
      if (chip === 'How does onboarding work?') return transition('onboarding_info')
      if (chip === 'Do you offer guarantees?') return transition('guarantee_info')
      if (chip === 'How long does it take?') return transition('timeline_info')
      if (chip === 'Which industries do you serve?') return transition('industries_info')
      if (chip === 'About Growth Escalators') return transition('about_ge')
      if (chip === 'Ask something else') return transition('quick_question')
      if (chip === 'Tell me more about services') return transition('show_services')
      if (chip === "Yes! Book free audit" || chip === "Yes, book free audit") return transition('collect_name')
      if (chip === 'How did you achieve this?') return transition('how_it_works')

      // Default fallback
      transition('quick_question')
    },
    [botState, transition, open, soundEnabled]
  )

  const handleSend = useCallback(() => {
    const text = inputValue.trim()
    if (!text) return
    setInputValue('')
    hasInteracted.current = true
    addUserMessage(text)
    const lower = text.toLowerCase()
    const cur = botState.currentState

    if (cur === 'collect_name') {
      const name = text
      setBotState(prev => ({ ...prev, userName: name }))
      return transition('collect_business', undefined, { userName: name })
    }
    if (cur === 'collect_business') {
      const biz = text
      setBotState(prev => ({ ...prev, businessName: biz }))
      return transition('collect_service_interest', undefined, { businessName: biz })
    }

    // Free text keyword routing
    if (/price|cost|how much|pricing/.test(lower)) return transition('pricing')
    if (/service|what do you do|offer|help/.test(lower)) return transition('show_services')
    if (/result|case study|portfolio|work|client/.test(lower)) return transition('show_results')
    if (/contact|email|phone|reach|number/.test(lower)) return transition('contact_info')
    if (/location|where|jaipur|office|based/.test(lower)) return transition('location_info')
    if (/team|who|jatin|founder|staff/.test(lower)) return transition('team_info')
    if (/onboard|start|begin|process|how long/.test(lower)) return transition('onboarding_info')
    if (/guarantee|refund|promise|assure/.test(lower)) return transition('guarantee_info')
    if (/timeline|time|month|week|when/.test(lower)) return transition('timeline_info')
    if (/industry|industries|sector|niche/.test(lower)) return transition('industries_info')
    if (/about|who are you|what is growth escalators|ge/.test(lower)) return transition('about_ge')
    if (/seo|search engine|organic/.test(lower)) {
      addUserMessage(text)
      const msg: Message = { id: uid(), role: 'bot', text: SERVICE_MESSAGES['SEO'], chips: ["Yes, tell me more", "Book a free audit", "Show me another service"], timestamp: Date.now() }
      setBotState(prev => { const next = { ...prev, messages: [...prev.messages, msg] }; saveSession(next); return next })
      return
    }
    if (/ads|meta|google|facebook|paid/.test(lower)) {
      const msg: Message = { id: uid(), role: 'bot', text: SERVICE_MESSAGES['Performance Marketing'], chips: ["Yes, tell me more", "Book a free audit", "Show me another service"], timestamp: Date.now() }
      setBotState(prev => { const next = { ...prev, messages: [...prev.messages, msg] }; saveSession(next); return next })
      return
    }
    if (/website|web|design|landing page/.test(lower)) {
      const msg: Message = { id: uid(), role: 'bot', text: SERVICE_MESSAGES['Website Development'], chips: ["Yes, tell me more", "Book a free audit", "Show me another service"], timestamp: Date.now() }
      setBotState(prev => { const next = { ...prev, messages: [...prev.messages, msg] }; saveSession(next); return next })
      return
    }
    if (/social|instagram|linkedin|content/.test(lower)) {
      const msg: Message = { id: uid(), role: 'bot', text: SERVICE_MESSAGES['Social Media'], chips: ["Yes, tell me more", "Book a free audit", "Show me another service"], timestamp: Date.now() }
      setBotState(prev => { const next = { ...prev, messages: [...prev.messages, msg] }; saveSession(next); return next })
      return
    }
    if (/funnel|automation|whatsapp|email|crm/.test(lower)) {
      const msg: Message = { id: uid(), role: 'bot', text: SERVICE_MESSAGES['Funnel & Automation'], chips: ["Yes, tell me more", "Book a free audit", "Show me another service"], timestamp: Date.now() }
      setBotState(prev => { const next = { ...prev, messages: [...prev.messages, msg] }; saveSession(next); return next })
      return
    }
    if (/brand|logo|identity|design|branding/.test(lower)) {
      const msg: Message = { id: uid(), role: 'bot', text: SERVICE_MESSAGES['Branding & Identity'], chips: ["Yes, tell me more", "Book a free audit", "Show me another service"], timestamp: Date.now() }
      setBotState(prev => { const next = { ...prev, messages: [...prev.messages, msg] }; saveSession(next); return next })
      return
    }
    if (/personal brand|founder|linkedin|thought leader/.test(lower)) {
      const msg: Message = { id: uid(), role: 'bot', text: SERVICE_MESSAGES['Personal Branding'], chips: ["Yes, tell me more", "Book a free audit", "Show me another service"], timestamp: Date.now() }
      setBotState(prev => { const next = { ...prev, messages: [...prev.messages, msg] }; saveSession(next); return next })
      return
    }

    transition('fallback_question')
  }, [inputValue, botState, transition])

  const handleOpen = () => {
    hasInteracted.current = true
    setOpen(true)
    if (isFirstOpen.current && botState.messages.length === 0) {
      isFirstOpen.current = false
      queueBotMessage('welcome', { userName: '', businessName: '' })
    }
  }

  const showInput = (() => {
    const last = botState.messages[botState.messages.length - 1]
    return last?.showInput && last?.role === 'bot'
  })()

  const formatText = (text: string) =>
    text.split('\n').map((line, i) => (
      <span key={i}>
        {line}
        {i < text.split('\n').length - 1 && <br />}
      </span>
    ))

  return (
    <>
      {/* Confetti overlay */}
      {showConfetti && (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 99998 }}>
          {Array.from({ length: 40 }).map((_, i) => (
            <span
              key={i}
              style={{
                position: 'absolute',
                left: `${Math.random() * 100}%`,
                top: '-20px',
                fontSize: `${14 + Math.random() * 12}px`,
                animation: `confettiFall ${1.5 + Math.random() * 2}s linear ${Math.random() * 1.5}s forwards`,
              }}
            >
              {['🎉', '🎊', '🚀', '⭐', '✨', '🎯', '💫'][Math.floor(Math.random() * 7)]}
            </span>
          ))}
        </div>
      )}

      {/* Chat window */}
      {open && (
        <div
          ref={windowRef}
          style={{
            position: 'fixed',
            bottom: '88px',
            right: '24px',
            width: '380px',
            height: '560px',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            background: '#111118',
            border: '1px solid rgba(255,101,0,0.2)',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,101,0,0.08)',
            fontFamily: 'var(--font-outfit), sans-serif',
            cursor: 'auto',
          }}
          className="growthbot-window"
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 16px',
              background: 'linear-gradient(135deg, #1a1a28 0%, #111118 100%)',
              borderBottom: '1px solid rgba(255,101,0,0.15)',
              flexShrink: 0,
              cursor: 'auto',
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FF6500, #ff8c42)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 800,
                color: '#fff',
                fontFamily: 'var(--font-syne), sans-serif',
                flexShrink: 0,
              }}
            >
              GE
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#fff',
                  fontFamily: 'var(--font-syne), sans-serif',
                  lineHeight: 1.2,
                }}
              >
                Growth Bot
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px' }}>
                <div
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#22c55e',
                    animation: 'pulse-green 2s infinite',
                  }}
                />
                <span style={{ fontSize: '11px', color: '#22c55e', fontWeight: 500 }}>Online</span>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginLeft: '4px' }}>• Typically replies instantly</span>
              </div>
            </div>
            {/* WhatsApp */}
            <a
              href="https://wa.me/917733888883?text=Hi%2C%20I%20found%20you%20on%20your%20website%20and%20would%20like%20to%20know%20more%20about%20your%20services"
              target="_blank"
              rel="noopener noreferrer"
              title="Chat on WhatsApp"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(37,211,102,0.15)',
                border: '1px solid rgba(37,211,102,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                textDecoration: 'none',
                transition: 'background 0.2s',
                cursor: 'pointer',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#25d366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
            {/* Sound toggle */}
            <button
              onClick={() => setSoundEnabled(s => !s)}
              title={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0,
                color: soundEnabled ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.25)',
              }}
            >
              {soundEnabled ? (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
              ) : (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              )}
            </button>
            {/* Clear chat */}
            <button
              onClick={() => {
                try { sessionStorage.removeItem(SESSION_KEY) } catch {}
                const fresh = initialState()
                setBotState(fresh)
                setInputValue('')
                setTyping(false)
                queueBotMessage('welcome', { userName: '', businessName: '' })
              }}
              title="Clear chat & start over"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0,
                color: 'rgba(255,255,255,0.45)',
              }}
            >
              {/* Refresh / reset icon */}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="1 4 1 10 7 10" />
                <path d="M3.51 15a9 9 0 1 0 .49-4.95" />
              </svg>
            </button>
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(255,101,0,0.15)',
                border: '1px solid rgba(255,101,0,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#FF6500',
                flexShrink: 0,
              }}
            >
              <X size={15} />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={messagesContainerRef}
            className="growthbot-messages"
            style={{
              flex: 1,
              minHeight: 0,
              overflowY: 'scroll',
              padding: '16px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(255,101,0,0.3) rgba(255,255,255,0.04)',
              cursor: 'auto',
            }}
            onWheel={e => e.stopPropagation()}
            onTouchMove={e => e.stopPropagation()}
          >
            {botState.messages.map(msg => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  gap: '6px',
                  cursor: 'auto',
                }}
              >
                {msg.role === 'bot' && (
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', cursor: 'auto' }}>
                    <div
                      style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #FF6500, #ff8c42)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '8px',
                        fontWeight: 800,
                        color: '#fff',
                        fontFamily: 'var(--font-syne), sans-serif',
                        flexShrink: 0,
                      }}
                    >
                      GE
                    </div>
                    <div
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '16px 16px 16px 4px',
                        padding: '10px 14px',
                        maxWidth: '78%',
                        color: 'rgba(255,255,255,0.9)',
                        fontSize: '13.5px',
                        lineHeight: 1.55,
                        wordBreak: 'break-word',
                        cursor: 'auto',
                      }}
                    >
                      {formatText(msg.text)}
                    </div>
                  </div>
                )}
                {msg.role === 'user' && (
                  <div
                    style={{
                      background: 'linear-gradient(135deg, #FF6500, #e85a00)',
                      borderRadius: '16px 16px 4px 16px',
                      padding: '10px 14px',
                      maxWidth: '78%',
                      color: '#fff',
                      fontSize: '13.5px',
                      lineHeight: 1.55,
                      wordBreak: 'break-word',
                      cursor: 'auto',
                    }}
                  >
                    {msg.text}
                  </div>
                )}
                {/* Chips */}
                {msg.role === 'bot' && msg.chips && msg.chips.length > 0 && (
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '6px',
                      paddingLeft: '34px',
                      marginTop: '2px',
                      cursor: 'auto',
                    }}
                  >
                    {msg.chips.map(chip => (
                      <button
                        key={chip}
                        onClick={() => handleChip(chip)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '99px',
                          border: '1px solid rgba(255,101,0,0.45)',
                          background: 'rgba(255,101,0,0.08)',
                          color: '#FF6500',
                          fontSize: '12px',
                          fontWeight: 500,
                          cursor: 'pointer',
                          transition: 'all 0.18s',
                          fontFamily: 'var(--font-outfit), sans-serif',
                          whiteSpace: 'nowrap',
                        }}
                        onMouseEnter={e => {
                          ;(e.target as HTMLButtonElement).style.background = 'rgba(255,101,0,0.2)'
                          ;(e.target as HTMLButtonElement).style.borderColor = '#FF6500'
                        }}
                        onMouseLeave={e => {
                          ;(e.target as HTMLButtonElement).style.background = 'rgba(255,101,0,0.08)'
                          ;(e.target as HTMLButtonElement).style.borderColor = 'rgba(255,101,0,0.45)'
                        }}
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', cursor: 'auto' }}>
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #FF6500, #ff8c42)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '8px',
                    fontWeight: 800,
                    color: '#fff',
                    flexShrink: 0,
                  }}
                >
                  GE
                </div>
                <div
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '16px 16px 16px 4px',
                    padding: '12px 16px',
                    display: 'flex',
                    gap: '4px',
                    alignItems: 'center',
                  }}
                >
                  {[0, 1, 2].map(i => (
                    <div
                      key={i}
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: '#FF6500',
                        animation: `typingBounce 1s ease-in-out ${i * 0.15}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input bar */}
          {showInput && (
            <div
              style={{
                padding: '12px 14px',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                background: 'rgba(255,255,255,0.02)',
                flexShrink: 0,
                cursor: 'auto',
              }}
            >
              <input
                ref={inputRef}
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  color: '#fff',
                  fontSize: '13.5px',
                  outline: 'none',
                  fontFamily: 'var(--font-outfit), sans-serif',
                  transition: 'border-color 0.2s',
                  cursor: 'text',
                }}
                onFocus={e => { e.target.style.borderColor = 'rgba(255,101,0,0.5)' }}
                onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)' }}
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  background: inputValue.trim() ? 'linear-gradient(135deg, #FF6500, #e85a00)' : 'rgba(255,255,255,0.06)',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
                  color: inputValue.trim() ? '#fff' : 'rgba(255,255,255,0.25)',
                  transition: 'all 0.2s',
                  flexShrink: 0,
                }}
              >
                <Send size={15} />
              </button>
            </div>
          )}

          {/* Bottom branding */}
          <div
            style={{
              padding: '8px 14px',
              borderTop: '1px solid rgba(255,255,255,0.04)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              flexShrink: 0,
              background: 'rgba(0,0,0,0.2)',
              cursor: 'auto',
            }}
          >
            <span style={{ fontSize: '10.5px', color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-outfit), sans-serif' }}>
              Powered by
            </span>
            <span
              style={{
                fontSize: '10.5px',
                fontWeight: 700,
                color: '#FF6500',
                fontFamily: 'var(--font-syne), sans-serif',
              }}
            >
              Growth Escalators
            </span>
          </div>
        </div>
      )}

      {/* Trigger button */}
      <button
        ref={buttonRef}
        onClick={handleOpen}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #FF6500, #e85a00)',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 99999,
          boxShadow: '0 4px 24px rgba(255,101,0,0.45), 0 0 0 0 rgba(255,101,0,0.4)',
          animation: 'pulseRing 2.5s ease-out infinite',
          color: '#fff',
          transition: 'transform 0.2s',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.1)' }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)' }}
        title="Chat with Growth Bot"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
        {!open && botState.unreadCount > 0 && (
          <div
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: '#ef4444',
              border: '2px solid #111118',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px',
              fontWeight: 700,
              color: '#fff',
            }}
          >
            {botState.unreadCount > 9 ? '9+' : botState.unreadCount}
          </div>
        )}
      </button>

      {/* Global styles */}
      <style>{`
        @keyframes pulseRing {
          0% { box-shadow: 0 4px 24px rgba(255,101,0,0.45), 0 0 0 0 rgba(255,101,0,0.35); }
          70% { box-shadow: 0 4px 24px rgba(255,101,0,0.45), 0 0 0 14px rgba(255,101,0,0); }
          100% { box-shadow: 0 4px 24px rgba(255,101,0,0.45), 0 0 0 0 rgba(255,101,0,0); }
        }
        @keyframes pulse-green {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
        @keyframes confettiFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .growthbot-messages::-webkit-scrollbar { width: 4px; }
        .growthbot-messages::-webkit-scrollbar-track { background: rgba(255,255,255,0.04); border-radius: 4px; }
        .growthbot-messages::-webkit-scrollbar-thumb { background: rgba(255,101,0,0.35); border-radius: 4px; }
        .growthbot-messages::-webkit-scrollbar-thumb:hover { background: rgba(255,101,0,0.6); }
        @media (max-width: 767px) {
          .growthbot-window {
            bottom: 0 !important;
            right: 0 !important;
            left: 0 !important;
            width: calc(100% - 0px) !important;
            height: 70vh !important;
            border-radius: 20px 20px 0 0 !important;
            margin: 0 !important;
          }
        }
      `}</style>
    </>
  )
}
