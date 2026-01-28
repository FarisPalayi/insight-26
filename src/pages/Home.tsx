import Header from "@/components/layout/Header";
import HeroSection from "@/components/features/hero/HeroSection";
import Footer from "@/components/layout/Footer";
import EventsSection from "@/components/features/events/EventsSection";
import SponsorSection from "@/components/features/sponsor/SponsorSection";
import Main from "@/components/layout/Main";
import PastEditionHighlights from "@/components/features/pastHighlights/pastHighlightsSection";
import FAQSection from "@/components/features/faq/FAQSection";
import EventSchedule from "@/Schedule";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother } from "gsap/all";

export function Home() {
  useGSAP(() => {
    ScrollSmoother.create({
      smooth: 2,
      effects: true,
      normalizeScroll: true,
    })
  })

  return (
    <div className="min-h-screen bg-background dark" id="smooth-wrapper">
      <div id="smooth-content">
        <Header />
        <Main className="">
          <HeroSection />
          <EventsSection />
          <PastEditionHighlights />
          <EventSchedule />
          <SponsorSection />
          <FAQSection />
        </Main>
        <Footer />
      </div>
    </div>
  )
}
