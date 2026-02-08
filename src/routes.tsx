import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Register } from "./pages/Register";
import { Events } from "./pages/Events";
import { EventDetail } from "./pages/EventDetail";
import { fetchAllEvents, fetchEventById, fetchUpdates } from "./services/eventService";
import RootLayout from "./pages/Layout";
import { Schedule } from "./pages/Schedule";
import { Updates } from "./pages/Updates";
import { VenuesPage } from "./pages/Venues";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    loader: async () => {
      const updates = await fetchUpdates();
      return { updates };
    },
    errorElement: <NotFound />,
    hydrateFallbackElement: <div>Loading...</div>,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/events",
        element: <Events />,
        loader: async () => {
          console.log("start")
          const events = await fetchAllEvents();
          console.log(events)

          if (!events || events.length === 0) {
            throw new Response("Events not found", { status: 404 });
          }

          return events;
        }
      },

      {
        path: "/events/:eventId",
        element: <EventDetail />,
        loader: async ({ params }) => {
          const event = await fetchEventById(params.eventId || "");
          console.log(event)

          if (!event)
            throw new Response("Event not found", { status: 404 });

          return event;
        }
      },
      {
        path: "/schedule",
        element: <Schedule />,
        loader: async () => {
          console.log("start")
          const events = await fetchAllEvents();
          console.log(events)

          if (!events || events.length === 0) {
            throw new Response("Events not found", { status: 404 });
          }

          return events;
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
        element: <VenuesPage />,
        loader: async () => {
          const events = await fetchAllEvents();
          console.log(events)
          if (!events || events.length === 0) {
            throw new Response("Events not found", { status: 404 });
          }
          return { events };
        }
      },
      { path: "*", Component: NotFound }
    ]
  }])
