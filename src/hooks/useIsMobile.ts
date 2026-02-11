import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 640;

export function useIsMobile() {
  const getIsMobile = () =>
    typeof window !== "undefined" &&
    window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches;

  const [isMobile, setIsMobile] = useState(getIsMobile);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const onChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}