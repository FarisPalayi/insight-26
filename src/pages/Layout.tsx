import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Outlet, ScrollRestoration, useNavigation } from "react-router";
import { EventsPageSkeleton } from "@/components/features/events/skeletons/EventPageSkeleton";

import { useGSAP, ScrollSmoother } from "@/lib/gsap";

export default function RootLayout() {
  useGSAP(() => {
    ScrollSmoother.create({
      smooth: 2,
      effects: true,
      normalizeScroll: true,
      smoothTouch: 0.1,
    })
  })

  const navigation = useNavigation();
  const isPending = navigation.state === "loading";
  const nextPath = navigation.location?.pathname;
  const showEventsSkeleton =
    isPending && (nextPath === "/events" || nextPath === "/events/");


  return (
    <div className="min-h-screen bg-background dark" id="smooth-wrapper">
      <div id="smooth-content">

        {/* to ensure that page starts from the top of a page */}
        <ScrollRestoration />
        <Header />
        {showEventsSkeleton && <EventsPageSkeleton />}
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
