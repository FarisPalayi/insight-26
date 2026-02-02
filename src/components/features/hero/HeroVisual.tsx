import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const HeroVisual = () => {
  const containerRef = useRef(null);

  // Track scroll within the hero section specifically
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Much stronger parallax movement
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* Parallax Background Image with stronger effect */}
      <motion.div
        className="absolute inset-0 w-full h-[120%]" // Taller to allow movement
        style={{
          y,
          scale,
          transformOrigin: "center center"
        }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: 'url("/hero-tech-bg.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.3,
            filter: 'brightness(0.8)',
          }}
        />
      </motion.div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 0%, hsl(160 100% 45% / 0.12), transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 50%, hsl(280 100% 60% / 0.08), transparent 50%),
            linear-gradient(180deg, transparent 0%, hsl(240 15% 3%) 100%)
          `
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, hsl(240 15% 3% / 0.7) 100%)'
        }}
      />
    </div>
  );
};
