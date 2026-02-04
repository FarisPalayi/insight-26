import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export const HeroBadge = () => {
  const badgeRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const badge = badgeRef.current!;

      // 1. Capture the badge's natural position
      const initialY = badge.getBoundingClientRect().top + window.scrollY;

      // 2. Force GSAP to treat this as the baseline
      gsap.set(badge, { y: 0 });

      // 3. Scroll animation RELATIVE to layout position
      gsap.to(badge, {
        y: -14,
        scale: 0.94,
        opacity: 0.65,
        ease: "none",
        scrollTrigger: {
          trigger: badge,
          start: () => `top+=${initialY * 0.15} top`,
          end: () => `top+=${initialY * 0.35} top`,
          scrub: true,
        },
      });
    },
    { scope: badgeRef }
  );

  return (
    <div
      ref={badgeRef}
      className="inline-flex items-center gap-3 px-3 py-1.5 border border-white/10 rounded-sm bg-white/5 backdrop-blur-md mb-10"
    >
      <span className="text-[10px] font-mono text-primary font-bold tracking-[0.2em]">
        EDITION.23
      </span>

      <div className="w-[1px] h-3 bg-white/20" />

      <span className="text-[10px] uppercase tracking-[0.15em] text-white/60 font-medium">
        Legacy of Excellence
      </span>
    </div>
  );
};
