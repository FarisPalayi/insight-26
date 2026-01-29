import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Main from "@/components/layout/Main";
import ScheduleSection from "@/components/features/schedule";

export function Schedule() {
  return (
    <div className="min-h-screen bg-background dark">
      <Header />
      <Main className="">
        <ScheduleSection />
      </Main>
      <Footer />
    </div>
  )
}
