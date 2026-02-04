import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Outlet, ScrollRestoration, useNavigation } from "react-router";
import { EventsPageSkeleton } from "@/components/features/events/skeletons/EventPageSkeleton";

export default function RootLayout() {
  const navigation = useNavigation();
  const isPending = navigation.state === "loading";
  const nextPath = navigation.location?.pathname;
  const showEventsSkeleton =
    isPending && (nextPath === "/events" || nextPath === "/events/");


  return (
    <div className="min-h-screen bg-background dark">
      {/* to ensure that page starts from the top of a page */}
      <ScrollRestoration />
      <Header />
      {showEventsSkeleton && <EventsPageSkeleton />}
      <Outlet />
      <Footer />
    </div>
  );
}
