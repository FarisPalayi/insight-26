import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "*",
    Component: NotFound,
  }
]);
