import Header from "@/components/layout/Header";
import HeroSection from "@/components/features/HeroSection";

export function Home() {
  return (
    <div className="min-h-screen bg-background dark">
      <Header />
      <HeroSection />
    </div>
  )
}
