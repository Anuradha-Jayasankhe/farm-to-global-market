import HeroSection from '@/components/landing/HeroSection';
import FeaturesShowcase from '@/components/landing/FeaturesShowcase';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StructuredData from '@/components/shared/StructuredData';

export default function Home() {
  return (
    <>
      <StructuredData />
      <Navbar />
      <main className="pt-16">
        <HeroSection />
        <div id="features">
          <FeaturesShowcase />
        </div>
      </main>
      <Footer />
    </>
  );
}

