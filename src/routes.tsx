import { createBrowserRouter } from "react-router";
import { NotFound } from "./pages/NotFound";
import { Register } from "./pages/Register";
import { fetchAllEvents, fetchEventById, fetchUpdates } from "./services/eventService";
import RootLayout from "./pages/Layout";
import { Updates } from "./pages/Updates";
import PageLoader from "./pages/PageLoader";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    loader: async () => {
      const updates = await fetchUpdates();
      return { updates };
    },
    errorElement: <NotFound />,
    hydrateFallbackElement: <PageLoader />,
    children: [
      {
        index: true,
        lazy: async () => {
          const { Home } = await import("./pages/Home")
          return { Component: Home }
        }
      },
      {
        path: "/events",
        loader: async () => {
          console.log("start")
          const events = await fetchAllEvents();
          console.log(events)

          if (!events || events.length === 0) {
            throw new Response("Events not found", { status: 404 });
          }

          return events;
        },
        lazy: async () => {
          const { Events } = await import("./pages/Events");
          return { Component: Events };
        },
      },

      {
        path: "/events/:eventId",
        loader: async ({ params }) => {
          const event = await fetchEventById(params.eventId || "");
          console.log(event)

          if (!event)
            throw new Response("Event not found", { status: 404 });

          return event;
        },
        lazy: async () => {
          const { EventDetail } = await import("./pages/EventDetail")
          return { Component: EventDetail }
        }
      },
      {
        path: "/schedule",
        loader: async () => {
          console.log("start")
          const events = await fetchAllEvents();
          console.log(events)

          if (!events || events.length === 0) {
            throw new Response("Events not found", { status: 404 });
          }

          return events;
        },
        lazy: async () => {
          const { Schedule } = await import("./pages/Schedule")
          return { Component: Schedule }
        }
      },
      { path: "/register", element: <Register /> },
      {
        path: "/contact",
        lazy: async () => {
          const { Contact } = await import("./pages/Contact");
          return { Component: Contact };
        },
      },
      {
        path: "/updates",
        element: <Updates />,
        loader: async () => {
          const updates = await fetchUpdates();
          console.log(updates)
          if (!updates || updates.length === 0) {
            throw new Response("Updates not found", { status: 404 });
          }
          return updates;
        }
      },
      {
        path: '/venues',
        loader: async () => {
          const events = await fetchAllEvents();
          console.log(events)
          if (!events || events.length === 0) {
            throw new Response("Events not found", { status: 404 });
          }
          return { events };
        },
        lazy: async () => {
          const { VenuesPage } = await import("./pages/Venues")
          return { Component: VenuesPage }
        }
      },
      { path: "*", Component: NotFound }
    ]
  }])
