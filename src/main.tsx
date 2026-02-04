import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { router } from "./routes";
import "./styles/globals.css";
import { Toaster } from "sonner";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// ScrollSmoother requires ScrollTrigger
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText, TextPlugin);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster theme="dark" />
    <RouterProvider router={router} />
  </StrictMode>
);
