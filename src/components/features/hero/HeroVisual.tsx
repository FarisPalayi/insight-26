import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export const HeroVisual = () => {
  const visualRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const bg = bgRef.current!;
      const glow = glowRef.current!;

      // Initial states (important: no animation yet)
      gsap.set(bg, { scale: 1.08, y: 0 });
      gsap.set(glow, { y: 0 });

      // Scroll-driven camera drift
      gsap.to(bg, {
        y: -60,
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: visualRef.current,
          start: "top top+=80",   // dead zone
          end: "bottom top",
          scrub: true,
        },
      });

      // Glow drifts slower for depth
      gsap.to(glow, {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: visualRef.current,
          start: "top top+=80",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: visualRef }
  );

  return (
    <div
      ref={visualRef}
      className="absolute inset-0 overflow-hidden z-0"
    >
      {/* Background image layer */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage: 'url("/hero-tech-bg.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.28,
        }}
      />

      {/* Atmospheric glow */}
      <div
        ref={glowRef}
        className="absolute inset-0 will-change-transform"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 0%, hsl(160 100% 45% / 0.18), transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 50%, hsl(280 100% 60% / 0.12), transparent 55%)
          `,
        }}
      />

      {/* Darkening overlays (static = premium) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, hsl(240 15% 3%) 100%)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, hsl(240 15% 3% / 0.75) 100%)",
        }}
      />
    </div>
  );
};
