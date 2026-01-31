import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Main from "@/components/layout/Main";
import ContactSection from "@/components/features/contact/ContactSection";

export function Contact() {
  return (
    <div className="min-h-screen bg-background dark">
      <Header />
      <Main>
        <ContactSection />
      </Main>
      <Footer />
    </div>
  )
}
