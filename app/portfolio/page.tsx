import CursorGlow from '@/components/portfolio/CursorGlow';
import ScrollProgress from '@/components/portfolio/ScrollProgress';
import BackToTop from '@/components/portfolio/BackToTop';
import Navbar from '@/components/portfolio/Navbar';
import Hero from '@/components/portfolio/Hero';
import StatsTicker from '@/components/portfolio/StatsTicker';
import AboutIntro from '@/components/portfolio/AboutIntro';
import ServicesGrid from '@/components/portfolio/ServicesGrid';
import CaseStudies from '@/components/portfolio/CaseStudies';
import ResultsProof from '@/components/portfolio/ResultsProof';
import OurProcess from '@/components/portfolio/OurProcess';
import ClientLogos from '@/components/portfolio/ClientLogos';
import Testimonials from '@/components/portfolio/Testimonials';
import WhyUs from '@/components/portfolio/WhyUs';
import CTABanner from '@/components/portfolio/CTABanner';
import FAQ from '@/components/portfolio/FAQ';
import Footer from '@/components/portfolio/Footer';

export const metadata = {
  title: 'Portfolio — Growth Escalators',
  description:
    "100+ brands scaled. ₹Crores in ad spend managed. Jaipur's #1 AI-first performance marketing agency.",
  alternates: { canonical: '/portfolio' },
  openGraph: {
    title: 'Portfolio — Growth Escalators',
    description: "100+ brands scaled. ₹Crores in ad spend managed.",
    url: '/portfolio',
    type: 'website',
  },
};

export default function PortfolioPage() {
  return (
    <>
      <CursorGlow />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <StatsTicker />
        <AboutIntro />
        <ServicesGrid />
        <CaseStudies />
        <ResultsProof />
        <OurProcess />
        <ClientLogos />
        <Testimonials />
        <WhyUs />
        <CTABanner />
        <FAQ />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
