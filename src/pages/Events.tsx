import Main from "@/components/layout/Main";
import { EventsSection } from "@/components/features/events";
import type { UnifiedEvent } from "@/lib/data/unifiedEvents";
import { useLoaderData } from "react-router";

export function Events() {
  const events = useLoaderData() as UnifiedEvent[];

  return (
    <div className="min-h-screen bg-background dark">
      <Main>
        <EventsSection events={events} />
      </Main>
    </div>
  )
}
