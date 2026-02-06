import Main from "@/components/layout/Main";
import ScheduleSection from "@/components/features/schedule";
import { useLoaderData } from "react-router";
import { type UnifiedEvent } from "@/lib/data/unifiedEvents";

export function Schedule() {
  const events = useLoaderData() as UnifiedEvent[];

  return (
    <Main className="min-h-screen bg-background dark">
      <ScheduleSection events={events} />
    </Main>
  )
}
