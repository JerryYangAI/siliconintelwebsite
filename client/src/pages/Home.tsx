import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CompanyLogos from '@/components/CompanyLogos';
import Services from '@/components/Services';
import UseCases from '@/components/UseCases';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen" data-testid="page-home">
      <Header />
      <Hero />
      <CompanyLogos />
      <Services />
      <UseCases />
      <Features />
      <Pricing />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
