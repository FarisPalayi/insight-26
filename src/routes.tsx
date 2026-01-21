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
    Component: Event,
  }
]);
