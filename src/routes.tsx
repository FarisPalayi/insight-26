import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Event } from "./pages/Event";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "events/",
    Component: Event,
  },
  {
    path: "*",
    Component: NotFound,
  }
]);
