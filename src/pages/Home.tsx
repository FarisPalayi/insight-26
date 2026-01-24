import Header from "@/components/layout/Header";
import HeroSection from "@/components/features/hero/HeroSection";
import Footer from "@/components/layout/Footer";
import EventsSection from "@/components/features/events/EventsSection";

export function Home() {
  return (
    <div className="min-h-screen bg-background dark">
      <Header />
      <HeroSection />
      <EventsSection />
      <Footer />
    </div>
  )
}
