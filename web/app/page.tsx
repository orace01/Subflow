import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { TrustBar } from "@/components/landing/TrustBar";
import { ValueProps } from "@/components/landing/ValueProps";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Features } from "@/components/landing/Features";
import { PricingSection } from "@/components/landing/PricingSection";
import { ClosingCta } from "@/components/landing/ClosingCta";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <Navbar />
      <Hero />
      <TrustBar />
      <ValueProps />
      <HowItWorks />
      <Features />
      <PricingSection />
      <ClosingCta />
      <Footer />
    </div>
  );
}
