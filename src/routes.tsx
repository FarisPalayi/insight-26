import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Event } from "./pages/Event";

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
    Component: () => (<h1>404 Not Found!</h1>),
  }
]);
