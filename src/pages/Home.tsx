import Header from "@/components/layout/Header";
import HeroSection from "@/components/features/HeroSection";
import Footer from "@/components/layout/Footer";

export function Home() {
  return (
    <div className="min-h-screen bg-background dark">
      <Header />
      <HeroSection />
      <Footer />
    </div>
  )
}
