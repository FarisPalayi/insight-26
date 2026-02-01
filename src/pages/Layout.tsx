import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Outlet, ScrollRestoration } from "react-router";

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-background dark">
      {/* to ensure that page starts from the top of a page */}
      <ScrollRestoration />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
