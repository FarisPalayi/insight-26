import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";

type MagneticOptions = {
  strength?: number;
  radius?: number;
};

export const useMagneticButton = (
  options: MagneticOptions = {}
) => {
  const { strength = 0.28, radius = 140 } = options;

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, "x", {
      duration: 0.6,
      ease: "power3.out",
    });

    const yTo = gsap.quickTo(el, "y", {
      duration: 0.6,
      ease: "power3.out",
    });

    const handleMouseMove = (e: MouseEvent) => {
      const bounds = el.getBoundingClientRect();

      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;

      const distance = Math.hypot(dx, dy);
      if (distance > radius) return;

      const force = 1 - distance / radius;

      xTo(dx * force * strength);
      yTo(dy * force * strength);
    };

    const reset = () => {
      xTo(0);
      yTo(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", reset);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", reset);
    };
  }, [strength, radius]);

  return { ref };
};
