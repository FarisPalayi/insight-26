import HeroSection from "@/components/features/hero/HeroSection";
import EventsSection from "@/components/features/hero-events/EventsSection";
import SponsorSection from "@/components/features/sponsor/SponsorSection";
import Main from "@/components/layout/Main";
import PastEditionHighlights from "@/components/features/pastHighlights/pastHighlightsSection";
import FAQSection from "@/components/features/faq/FAQSection";
import InsightAbout from "@/components/features/insight-about/InsightAbout";
import { TimelineOverview } from "@/components/features/schedule-overview/TimelineOverview";
import { useGSAP, ScrollSmoother } from "@/lib/gsap";
import { useIsMobile } from "@/hooks/useIsMobile";


export function Home() {
  /*  GSAP smooth scroll  */
  const isMobile = useIsMobile();

  useGSAP(() => {
    if (!isMobile) {
      ScrollSmoother.create({
        smooth: 1,
        effects: true,
        normalizeScroll: true,
      });
    }
  });

  return (
    <Main className="min-h-screen bg-background dark">
      <HeroSection />
      <InsightAbout />
      <EventsSection />
      <TimelineOverview />
      <PastEditionHighlights />
      <SponsorSection />
      <FAQSection />
    </Main>
  )
}
