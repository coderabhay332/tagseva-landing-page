import HeroHeader from "@/components/HeroHeader";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import UserJourneySection from "@/components/UserJourneySection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Header - Full-bleed with sticky navigation */}
      <HeroHeader />
      
      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Features Section */}
        <section id="features" className="py-20 lg:py-24">
          <FeaturesSection />
        </section>
        
        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 lg:py-24">
          <HowItWorksSection />
        </section>
        
        {/* User Journey Section */}
        <section id="business" className="py-20 lg:py-24">
          <UserJourneySection />
        </section>
      </div>
      
      {/* Footer - Full-width */}
      <Footer />
    </main>
  );
}