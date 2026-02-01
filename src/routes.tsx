import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Schedule } from "./pages/Schedule";
import { Register } from "./pages/Register";
import { Events } from "./pages/Events";
import { Contact } from "./pages/Contact";
import EventDetailPage from "./pages/EventDetail";
import { fetchEventById } from "./services/eventService";
import RootLayout from "./pages/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "/events", element: <Events /> },

      {
        path: "/events/:eventId",
        element: <EventDetailPage />,
        loader: async ({ params }) => {
          const event = await fetchEventById(params.eventId || "");
          console.log(event)

          if (!event)
            throw new Response("Event not found", { status: 404 });

          return event;
        }
      },
      { path: "/schedule", element: <Schedule />, },
      { path: "/register", element: <Register /> },
      { path: "/contact", element: <Contact /> },
      { path: "*", Component: NotFound }
    ]
  }])
