'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import MagneticButton from '@/components/ui/MagneticButton'
import { MapPin, Mail, Phone, Clock } from 'lucide-react'

const SERVICES_LIST = [
  'Performance Marketing',
  'Funnel Marketing & Automation',
  'Website Development',
  'Personal Branding',
  'Social Media Marketing',
  'Branding & Identity',
  'SEO',
]

const BUDGET_OPTIONS = [
  'Under ₹50K/month',
  '₹50K – ₹2L/month',
  '₹2L – ₹10L/month',
  '₹10L+/month',
]

export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', budget: '', message: '',
  })
  const successRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!heroRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-left > *', { y: 28, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out', delay: 0.2,
      })
      gsap.fromTo('.contact-form', { y: 28, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.35,
      })
    }, heroRef.current)
    return () => ctx.revert()
  }, [])

  const toggleService = (s: string) => {
    setSelectedServices((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    // Particle burst animation on success
    if (successRef.current) {
      const particles: HTMLDivElement[] = []
      for (let i = 0; i < 18; i++) {
        const p = document.createElement('div')
        p.style.cssText = `position:absolute;width:6px;height:6px;border-radius:50%;background:#FF6500;pointer-events:none;left:50%;top:50%;`
        successRef.current.appendChild(p)
        particles.push(p)
      }
      particles.forEach((p, i) => {
        const angle = (i / particles.length) * Math.PI * 2
        const dist = 60 + Math.random() * 60
        gsap.to(p, {
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist,
          opacity: 0,
          scale: 0,
          duration: 0.9 + Math.random() * 0.4,
          ease: 'power2.out',
          onComplete: () => p.remove(),
        })
      })
    }
  }

  return (
    <>
      <Navbar />
      <main>
        <section
          ref={heroRef}
          className="pt-36 pb-24 px-6 md:px-12 lg:px-24 min-h-screen"
          style={{ background: 'var(--bg-primary)' }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

              {/* Left column */}
              <div className="contact-left">
                <span className="font-outfit text-[10px] tracking-[0.4em] uppercase block mb-5" style={{ color: 'var(--orange)' }}>
                  Get In Touch
                </span>
                <h1 className="font-syne font-extrabold leading-none mb-6" style={{ fontSize: 'clamp(36px, 5.5vw, 72px)', color: 'var(--text-primary)' }}>
                  Let&apos;s Build Something<br />
                  <span style={{ color: 'var(--orange)' }}>That Grows.</span>
                </h1>
                <p className="font-outfit font-light text-lg mb-10" style={{ color: 'var(--text-muted)', lineHeight: 1.75 }}>
                  Whether you have a brief or just a problem — let&apos;s talk. We&apos;ll tell you exactly how to fix it.
                </p>

                {/* Contact details */}
                <div className="space-y-5 mb-10">
                  {[
                    { Icon: Mail, label: 'Email', value: 'Info@growthescalators.com', href: 'mailto:Info@growthescalators.com' },
                    { Icon: Phone, label: 'Phone', value: '+91 77338 88883', href: 'tel:+917733888883' },
                    { Icon: MapPin, label: 'Location', value: 'Jaipur, Rajasthan, India', href: undefined },
                    { Icon: Clock, label: 'Office Hours', value: 'Mon–Sat, 10am–7pm IST. Avg response: 4 hours.', href: undefined },
                  ].map(({ Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="w-9 h-9 flex items-center justify-center shrink-0 mt-0.5" style={{ background: 'rgba(255,101,0,0.1)', color: 'var(--orange)' }}>
                        <Icon size={15} />
                      </div>
                      <div>
                        <div className="font-outfit text-[10px] uppercase tracking-widest mb-0.5" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>{label}</div>
                        {href ? (
                          <a href={href} className="font-outfit text-sm hover:opacity-70 transition-opacity" style={{ color: 'var(--text-primary)' }}>{value}</a>
                        ) : (
                          <p className="font-outfit text-sm" style={{ color: 'var(--text-primary)' }}>{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social proof block */}
                <div className="ge-card p-6 mb-6">
                  <div className="font-outfit text-[10px] uppercase tracking-widest mb-3" style={{ color: 'var(--orange)' }}>Why Choose Us</div>
                  <p className="font-outfit font-light text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
                    Join 100+ brands that chose Growth Escalators. Average client ROI: <strong style={{ color: 'var(--text-primary)' }}>4.2x in year one.</strong>
                  </p>
                  <blockquote className="font-outfit italic text-sm leading-relaxed border-l-2 pl-4" style={{ color: 'var(--text-muted)', borderColor: 'var(--orange)' }}>
                    &ldquo;Growth Escalators completely transformed our Facebook Ad Management. Our ROAS went from 1.4x to 4.8x in just 45 days.&rdquo;
                    <span className="block mt-2 not-italic font-semibold" style={{ color: 'var(--text-primary)', fontStyle: 'normal' }}>— Muaaz Shaikh, Business Owner</span>
                  </blockquote>
                </div>

                {/* WhatsApp CTA */}
                <a
                  href="https://wa.me/917733888883?text=Hi%20Growth%20Escalators!%20I%27d%20like%20to%20discuss%20my%20brand%27s%20growth%20strategy."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 font-outfit font-medium px-6 py-3 transition-all duration-300 hover:opacity-90"
                  style={{ background: '#25D366', color: '#fff' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Prefer WhatsApp? Message us directly
                </a>
              </div>

              {/* Right column — form */}
              <div className="contact-form">
                {submitted ? (
                  <div
                    ref={successRef}
                    className="relative ge-card p-12 flex flex-col items-center justify-center text-center"
                    style={{ minHeight: 400 }}
                  >
                    <div className="text-5xl mb-6">🔥</div>
                    <h3 className="font-syne font-bold text-2xl mb-3" style={{ color: 'var(--text-primary)' }}>
                      Received. Let&apos;s Grow.
                    </h3>
                    <p className="font-outfit font-light" style={{ color: 'var(--text-muted)' }}>
                      We&apos;ll be in touch within <strong style={{ color: 'var(--orange)' }}>4 hours</strong>. Check your email — we move fast.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="ge-card p-8 space-y-5">
                    <h2 className="font-syne font-bold text-xl mb-2" style={{ color: 'var(--text-primary)' }}>
                      Tell Us About Your Brand
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-outfit text-[10px] uppercase tracking-widest block mb-2" style={{ color: 'var(--text-muted)' }}>Full Name *</label>
                        <input
                          required
                          className="form-input"
                          placeholder="Rajesh Kumar"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="font-outfit text-[10px] uppercase tracking-widest block mb-2" style={{ color: 'var(--text-muted)' }}>Email *</label>
                        <input
                          required
                          type="email"
                          className="form-input"
                          placeholder="hello@yourbrand.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-outfit text-[10px] uppercase tracking-widest block mb-2" style={{ color: 'var(--text-muted)' }}>Phone (Optional)</label>
                        <input
                          className="form-input"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="font-outfit text-[10px] uppercase tracking-widest block mb-2" style={{ color: 'var(--text-muted)' }}>Company / Brand *</label>
                        <input
                          required
                          className="form-input"
                          placeholder="Your Brand Name"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-outfit text-[10px] uppercase tracking-widest block mb-2" style={{ color: 'var(--text-muted)' }}>Monthly Marketing Budget *</label>
                      <select
                        required
                        className="form-input"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      >
                        <option value="">Select your budget range</option>
                        {BUDGET_OPTIONS.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="font-outfit text-[10px] uppercase tracking-widest block mb-3" style={{ color: 'var(--text-muted)' }}>Services You&apos;re Interested In</label>
                      <div className="flex flex-wrap gap-2">
                        {SERVICES_LIST.map((s) => {
                          const active = selectedServices.includes(s)
                          return (
                            <button
                              key={s}
                              type="button"
                              onClick={() => toggleService(s)}
                              className="font-outfit text-xs px-3 py-2 transition-all duration-200"
                              style={{
                                background: active ? 'var(--orange)' : 'var(--bg-secondary)',
                                color: active ? '#06060A' : 'var(--text-muted)',
                                border: `1px solid ${active ? 'var(--orange)' : 'var(--border-subtle)'}`,
                              }}
                            >
                              {s}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="font-outfit text-[10px] uppercase tracking-widest block mb-2" style={{ color: 'var(--text-muted)' }}>Tell Us Your Biggest Challenge</label>
                      <textarea
                        rows={4}
                        className="form-input resize-none"
                        placeholder="What's the #1 growth problem you need solved right now?"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>

                    <MagneticButton
                      className="w-full font-outfit font-semibold py-4 text-base transition-colors duration-300 mt-2"
                      style={{ background: 'var(--orange)', color: '#06060A' } as React.CSSProperties}
                    >
                      Send It Over →
                    </MagneticButton>

                    <p className="font-outfit text-xs text-center" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>
                      We respond within 4 hours Mon–Sat.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
