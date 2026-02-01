import HeroSection from "@/components/features/hero/HeroSection";
import EventsSection from "@/components/features/hero-events/EventsSection";
import SponsorSection from "@/components/features/sponsor/SponsorSection";
import Main from "@/components/layout/Main";
import PastEditionHighlights from "@/components/features/pastHighlights/pastHighlightsSection";
import FAQSection from "@/components/features/faq/FAQSection";

export function Home() {
  return (
    <Main className="min-h-screen bg-background dark">
      <HeroSection />
      <EventsSection />
      <PastEditionHighlights />
      <SponsorSection />
      <FAQSection />
    </Main>
  )
}
