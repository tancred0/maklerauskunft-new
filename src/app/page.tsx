import Footer from "@/components/layout/Footer";
import { HeroSection, FeaturesSection, CompareSection, TestimonialsSection, WhyBrokerSection, PartnerQualitiesSection, FaqSection } from "@/components/home";

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Compare Section */}
      <CompareSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Why Broker Section */}
      <WhyBrokerSection />

      {/* Partner Qualities Section */}
      <PartnerQualitiesSection />

      {/* FAQ Section */}
      <FaqSection />

      <Footer />
    </>
  );
}
