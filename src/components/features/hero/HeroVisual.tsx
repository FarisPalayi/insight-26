import { useRef } from "react";

export const HeroVisual = () => {
  const visualRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={visualRef}
      className="absolute inset-0 overflow-hidden z-0"
    >
      {/* Background video layer */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        style={{ opacity: 0.38 }}
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
          <source src="/videos/hero_video.webm" type="video/webm" />
          <source src="/videos/hero_video_optimized.mp4" type="video/mp4" />
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
