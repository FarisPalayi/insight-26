import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Event } from "./pages/Event";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "events/:eventId",
    loader: async ({ params }) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const res = await fetch("/events.json")
      const events = await res.json()
      const event = events.find(event => event.id === params.eventId);
      return event
    },
    Component: Event,
  }
]);
