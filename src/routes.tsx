import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Schedule } from "./pages/Schedule";
import { Register } from "./pages/Register";
import { Events } from "./pages/Events";
import { Contact } from "./pages/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/events",
    element: <Events />
  },
  {
    path: "/schedule",
    element: <Schedule />,
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/contact",
    element: <Contact />
  },
  {
    path: "*",
    Component: NotFound,
  }
]);
