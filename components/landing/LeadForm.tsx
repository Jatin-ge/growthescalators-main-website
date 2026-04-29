'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './LeadForm.module.css'

type Props = {
  /** Email address used in the mailto fallback link if /api/lead errors. */
  recipient?: string
  /** Subject line prefix for the mailto fallback. Also used as the lead `source` label. */
  subjectPrefix?: string
  /** Headline above the form. */
  headline?: string
  /** Subheadline below the headline. */
  subhead?: string
  /** Section tag pill text. */
  tag?: string
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function LeadForm({
  recipient = 'Info@growthescalators.com',
  subjectPrefix = 'New Doctor Lead',
  headline = 'Tell us about your practice',
  subhead = "Fill this in and we'll get back within 24 hours with a no-obligation strategy session.",
  tag = "LET'S TALK",
}: Props) {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg(null)

    const form = e.currentTarget
    const data = new FormData(form)
    const fields: Record<string, string> = { source: subjectPrefix }
    data.forEach((v, k) => { fields[k] = String(v) })

    // Minimum visible-loader time so fast networks don't flash the button.
    const minWait = new Promise((r) => setTimeout(r, 200))

    try {
      const [res] = await Promise.all([
        fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(fields),
        }),
        minWait,
      ])
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string }
        throw new Error(body.error || `Server returned ${res.status}`)
      }
      setStatus('success')
      form.reset()
    } catch (err) {
      setStatus('error')
      setErrorMsg((err as Error).message || 'Something went wrong')
    }
  }

  /** Build a mailto: URL as a fallback when the API call fails. */
  function buildMailtoFallback(): string {
    const subject = `${subjectPrefix} (form fallback)`
    const body = `The contact form on growthescalators.com had an error.\n\nPlease respond to this email and we'll follow up directly.`
    return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const submitting = status === 'submitting'

  return (
    <section id="lead-form" className={styles.section} aria-label="Lead form">
      <div className={styles.aurora} aria-hidden>
        <div className={styles.orb1} />
        <div className={styles.orb2} />
      </div>

      <div className={`${styles.inner} container-x`}>
        <div className={styles.layout}>
          <div className={styles.intro}>
            <span className="section-tag">{tag}</span>
            <h2 className={styles.headline}>{headline}</h2>
            <p className={styles.subhead}>{subhead}</p>
            <ul className={styles.bullets}>
              <li>✓ No commitment — strategy session is free</li>
              <li>✓ Reply within 24 hours, weekdays</li>
              <li>✓ One practice per specialization per city</li>
            </ul>
          </div>

          {status === 'success' ? (
            <motion.div
              className={`${styles.form} ${styles.successPanel} glass`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              role="status"
              aria-live="polite"
            >
              <div className={styles.successCheck} aria-hidden>✓</div>
              <h3 className={styles.successTitle}>Thanks — we got it.</h3>
              <p className={styles.successBody}>
                We&rsquo;ll review your details and reply within 24 hours (weekdays). If you&rsquo;d
                like to fast-track, you can also reach us at{' '}
                <a href={`mailto:${recipient}`}>{recipient}</a> or on WhatsApp at +91 77338 88883.
              </p>
            </motion.div>
          ) : (
          <motion.form
            className={`${styles.form} glass`}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className={styles.row}>
              <label className={styles.field}>
                <span>Your name</span>
                <input name="name" type="text" required autoComplete="name" placeholder="Dr. Priya Sharma" />
              </label>
              <label className={styles.field}>
                <span>Phone</span>
                <input name="phone" type="tel" required autoComplete="tel" placeholder="+91 98xxxxxxxx" />
              </label>
            </div>

            <label className={styles.field}>
              <span>Email</span>
              <input name="email" type="email" required autoComplete="email" placeholder="you@clinic.com" />
            </label>

            <div className={styles.row}>
              <label className={styles.field}>
                <span>Clinic / practice name</span>
                <input name="clinic" type="text" placeholder="Sharma Wellness Clinic" />
              </label>
              <label className={styles.field}>
                <span>Specialization</span>
                <input name="specialization" type="text" placeholder="Dermatology" />
              </label>
            </div>

            <div className={styles.row}>
              <label className={styles.field}>
                <span>City</span>
                <input name="city" type="text" placeholder="Jaipur" />
              </label>
              <label className={styles.field}>
                <span>Current monthly marketing spend</span>
                <select name="budget" defaultValue="">
                  <option value="" disabled>Select range</option>
                  <option value="None">None / just starting</option>
                  <option value="Under ₹25k">Under ₹25k</option>
                  <option value="₹25k–₹50k">₹25k–₹50k</option>
                  <option value="₹50k–₹1L">₹50k–₹1L</option>
                  <option value="₹1L–₹3L">₹1L–₹3L</option>
                  <option value="₹3L+">₹3L+</option>
                </select>
              </label>
            </div>

            <label className={styles.field}>
              <span>What do you want help with? (optional)</span>
              <textarea name="message" rows={3} placeholder="More patients for cosmetic dentistry, build personal brand on Instagram, etc." />
            </label>

            <button
              type="submit"
              className={`btn-primary ${styles.submit}`}
              disabled={submitting}
            >
              {submitting ? 'Sending…' : 'Send my enquiry'}
            </button>

            {status === 'error' && (
              <p className={styles.errorPanel} role="alert">
                Couldn&rsquo;t send your enquiry{errorMsg ? ` (${errorMsg})` : ''}.{' '}
                <a href={buildMailtoFallback()}>Email us directly instead</a> and we&rsquo;ll
                reply right away.
              </p>
            )}

            <p className={styles.footnote}>
              We&rsquo;ll only use your details to reply to this enquiry. We never share
              them with third parties.
            </p>
          </motion.form>
          )}
        </div>
      </div>
    </section>
  )
}
