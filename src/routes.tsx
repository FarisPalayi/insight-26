import { createBrowserRouter, type LoaderFunctionArgs } from "react-router";
import { Home } from "./pages/Home";
import { Event } from "./pages/Event";
import { type EventData } from "./types";

export const loadEvents = async ({ params }: LoaderFunctionArgs): Promise<EventData | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const res = await fetch("/events.json")
  const events: EventData[] = await res.json()
  const event = events.find((event) => event.id === params.eventId);
  return event
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "events/:eventId",
    loader: loadEvents,
    Component: Event,
  }
]);
