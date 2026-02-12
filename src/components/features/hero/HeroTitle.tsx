import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useIsMobile } from "@/hooks/useIsMobile";

export const HeroTitle = () => {
  const titleRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();

  useGSAP(
    () => {
      if (isMobile) return;
      const insight = titleRef.current!.querySelector(
        ".title-insight"
      ) as HTMLElement;
      const year = titleRef.current!.querySelector(
        ".title-year"
      ) as HTMLElement;
      const underline = titleRef.current!.querySelector(
        ".title-underline"
      ) as HTMLElement;

      /* -----------------------------
         MODERN ENTRANCE: SHARPEN & SETTLE
      ------------------------------*/
      const tl = gsap.timeline({ delay: 0.18 });

      tl.from(insight, {
        opacity: 0,
        y: 18,
        duration: 0.7,
        ease: "power2.out",
      })
        .from(
          year,
          {
            opacity: 0,
            y: 14,
            duration: 0.55,
            ease: "power2.out",
          },
          "-=0.35"
        )
        .from(
          underline,
          {
            scaleX: 0.85,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.3"
        );

      /* -----------------------------
         SCROLL-BASED COMPRESSION 
      ------------------------------*/
      gsap.to(titleRef.current, {
        scale: 0.94,
        y: -24,
        ease: "none",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 45%",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: titleRef }
  );

  return (
    <div
      ref={titleRef}
      className="mb-6 sm:mb-8 select-none"
    >
      <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none">
        <span className="title-insight inline-block text-gradient">
          INSIGHT
        </span>
        <span className="inline-block ml-2">
          <span className="title-year inline-block text-foreground">
            ’26
          </span>
        </span>
      </h1>

      <div
        className="title-underline hidden sm:block h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4 sm:mt-6 max-w-xs sm:max-w-md origin-center"
        style={{
          boxShadow: "0 0 22px hsl(var(--primary) / 0.35)",
        }}
      />
    </div>
  );
};
