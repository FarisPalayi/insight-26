import Main from "@/components/layout/Main";
import { EventsSection } from "@/components/features/events";

export function Events() {
  return (
    <div className="min-h-screen bg-background dark">
      <Main>
        <EventsSection />
      </Main>
    </div>
  )
}
