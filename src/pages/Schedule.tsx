import Main from "@/components/layout/Main";
import ScheduleSection from "@/components/features/schedule";

export function Schedule() {
  return (
    <div className="min-h-screen bg-background dark">
      <Main className="">
        <ScheduleSection />
      </Main>
    </div>
  )
}
