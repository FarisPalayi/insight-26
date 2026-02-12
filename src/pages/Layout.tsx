import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Outlet,
  ScrollRestoration,
  useNavigation,
} from "react-router";
import { EventsPageSkeleton } from "@/components/features/events/skeletons/EventPageSkeleton";

import { fetchUpdates } from "@/services/eventService";
import type { Update } from "@/types";

export default function RootLayout() {
  /* Route transition handling */
  const navigation = useNavigation();
  const isPending = navigation.state === "loading";
  const nextPath = navigation.location?.pathname;

  const showEventsSkeleton =
    isPending && (nextPath === "/events" || nextPath === "/events/");

  /* Global updates (non-blocking) */
  const [updates, setUpdates] = useState<Update[]>([]);

  useEffect(() => {
    let cancelled = false;

    fetchUpdates()
      .then((data) => {
        if (!cancelled) {
          setUpdates(data);
        }
      })
      .catch((err) => {
        // Fail silently — updates are non-critical
        console.error("Failed to fetch updates:", err);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background dark" id="smooth-wrapper">
      <div id="smooth-content">
        {/* Ensure page starts from top */}
        <ScrollRestoration />

        {/* Header needs updates for bell indicator */}
        <Header updates={updates} />

        {/* Route content */}
        {showEventsSkeleton ? <EventsPageSkeleton /> : <Outlet />}

        <Footer />
      </div>
    </div>
  );
}