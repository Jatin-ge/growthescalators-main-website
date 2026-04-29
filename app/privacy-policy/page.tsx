import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: "How Growth Escalators collects, uses, and protects your personal information.",
  alternates: { canonical: '/privacy-policy' },
  robots: { index: true, follow: false },
}

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)] pt-32 pb-24 px-6 md:px-16 lg:px-32">
      <div className="max-w-3xl mx-auto">
        <p className="text-[var(--orange)] text-[10px] tracking-[0.4em] uppercase mb-4 font-outfit">Legal</p>
        <h1 className="font-syne font-extrabold text-4xl md:text-5xl text-[var(--text-primary)] mb-6 leading-tight">Privacy Policy</h1>
        <p className="text-[var(--text-muted)] font-outfit font-light mb-16 text-base">We are committed to protecting your privacy.</p>
        <div className="space-y-12 font-outfit font-light text-[var(--text-muted)] leading-relaxed text-base">
          <section>
            <h2 className="font-syne font-bold text-xl text-[var(--text-primary)] mb-3">Information Collected</h2>
            <p>We may collect information you provide, including your name, address, telephone number, and email address, as well as data about your use of this website. Additional information may be collected if required to process your request, as indicated on the website.</p>
          </section>
          <section>
            <h2 className="font-syne font-bold text-xl text-[var(--text-primary)] mb-3">Information Use</h2>
            <p>We use the information collected primarily to process the purpose for which you visited the website and to enhance your experience. All reasonable precautions are taken to prevent unauthorised access to this information.</p>
          </section>
          <section>
            <h2 className="font-syne font-bold text-xl text-[var(--text-primary)] mb-3">Cookies</h2>
            <p>Our website uses cookies to enhance your browsing experience by storing small amounts of information on your device. You can disable cookies in your browser settings; however, this may affect some functionalities of the website.</p>
          </section>
          <section>
            <h2 className="font-syne font-bold text-xl text-[var(--text-primary)] mb-3">Disclosing Information</h2>
            <p>We do not share your personal information with third parties unless you give us permission. We may use your information to contact you and share updates related to GrowthEscalators. You can opt out of our communications at any time.</p>
          </section>
          <section>
            <h2 className="font-syne font-bold text-xl text-[var(--text-primary)] mb-3">Changes to this Policy</h2>
            <p>We may update this Privacy Policy periodically, and all changes will be posted on this page. We encourage you to review this page regularly.</p>
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
