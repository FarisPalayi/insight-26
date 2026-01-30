import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Main from "@/components/layout/Main";
import { EventsSection } from "@/components/features/events";

export function Events() {
  return (
    <div className="min-h-screen bg-background dark">
      <Header />
      <Main>
        <EventsSection />
      </Main>
      <Footer />
    </div>
  )
}
