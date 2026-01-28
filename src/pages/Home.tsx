import Header from "@/components/layout/Header";
import HeroSection from "@/components/features/hero/HeroSection";
import Footer from "@/components/layout/Footer";
import EventsSection from "@/components/features/events/EventsSection";
import SponsorSection from "@/components/features/sponsor/SponsorSection";
import Main from "@/components/layout/Main";
import PastEditionHighlights from "@/components/features/pastHighlights/pastHighlightsSection";
import FAQSection from "@/components/features/faq/FAQSection";

export function Home() {
  return (
    <div className="min-h-screen bg-background dark">
      <Header />
      <Main className="">
        <HeroSection />
        <EventsSection />
        <PastEditionHighlights />
        <SponsorSection />
        <FAQSection />
      </Main>
      <Footer />
    </div>
  )
}
