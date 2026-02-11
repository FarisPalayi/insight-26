import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useIsMobile } from "@/hooks/useIsMobile";

export const HeroVisual = () => {
  const visualRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();

  useGSAP(
    () => {
      if (isMobile) return;

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
      {/* Background video layer */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        style={{ opacity: 0.40 }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/hero-tech-bg.webp"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero_video_540p.mp4" media="(max-width: 1024px)" type="video/mp4" />
          <source src="/videos/hero_video_720p.mp4" type="video/mp4" />
        </video>
      </div>

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
            "radial-gradient(ellipse at center, transparent 0%, hsl(240 15% 3% / 0.75) 100%)",
        }}
      />
    </div>
  );
};
