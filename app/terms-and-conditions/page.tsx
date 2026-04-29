import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: "Terms and conditions governing use of growthescalators.com and Growth Escalators services.",
  alternates: { canonical: '/terms-and-conditions' },
  robots: { index: true, follow: false },
}

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)] pt-32 pb-24 px-6 md:px-16 lg:px-32">
      <div className="max-w-3xl mx-auto">
        <p className="text-[var(--orange)] text-[10px] tracking-[0.4em] uppercase mb-4 font-outfit">Legal</p>
        <h1 className="font-syne font-extrabold text-4xl md:text-5xl text-[var(--text-primary)] mb-6 leading-tight">Terms & Conditions</h1>
        <p className="text-[var(--text-muted)] font-outfit font-light mb-16 text-base">Last updated: 2024. Please read these terms carefully.</p>
        <div className="space-y-12 font-outfit font-light text-[var(--text-muted)] leading-relaxed text-base">
          <section>
            <h2 className="font-syne font-bold text-xl text-[var(--text-primary)] mb-3">Acknowledgment</h2>
            <p>These Terms govern your use of the Service and the agreement between You and GrowthEscalators. By accessing or using the Service, You agree to be bound by these Terms. You must be at least 18 years of age to use this Service.</p>
          </section>
          <section>
            <h2 className="font-syne font-bold text-xl text-[var(--text-primary)] mb-3">Links to Other Websites</h2>
            <p>Our Service may contain links to third-party websites not owned or controlled by GrowthEscalators. We assume no responsibility for the content, privacy policies, or practices of any third-party websites.</p>
          </section>
          <section>
            <h2 className="font-syne font-bold text-xl text-[var(--text-primary)] mb-3">Termination</h2>
            <p>We may terminate or suspend your access to the Service immediately, without prior notice, for any reason, including if you breach these Terms.</p>
          </section>
          <section>
            <h2 className="font-syne font-bold text-xl text-[var(--text-primary)] mb-3">Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, GrowthEscalators shall not be liable for any indirect, incidental, or consequential damages resulting from your use or inability to use the Service.</p>
          </section>
          <section>
            <h2 className="font-syne font-bold text-xl text-[var(--text-primary)] mb-3">Governing Law</h2>
            <p>These Terms are governed by the laws of Rajasthan, India, without regard to conflict of law principles.</p>
          </section>
          <section>
            <h2 className="font-syne font-bold text-xl text-[var(--text-primary)] mb-3">Changes to These Terms</h2>
            <p>GrowthEscalators reserves the right to update or modify these Terms at any time. Your continued use of the Service after any changes constitutes acceptance of the new Terms.</p>
          </section>
          <section>
            <h2 className="font-syne font-bold text-xl text-[var(--text-primary)] mb-3">Contact Us</h2>
            <p>If you have any questions, please contact us at: <a href="mailto:Info@growthescalators.com" className="text-[var(--orange)] hover:underline">Info@growthescalators.com</a></p>
          </section>
        </div>
      </div>
    </main>
  )
}
