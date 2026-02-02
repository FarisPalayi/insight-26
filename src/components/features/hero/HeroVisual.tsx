import { motion, useScroll, useTransform } from "framer-motion";

export const HeroVisual = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Parallax Background Image */}
      <motion.div
        className="absolute inset-0 w-full h-full scale-110" // scale-110 prevents edge gaps
        style={{ y }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: 'url("/hero-tech-bg.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.3,
            filter: 'blur(0px) brightness(0.8)',
          }}
        />
      </motion.div>

      {/* Animated glow overlay - very performant */}
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 0%, hsl(160 100% 45% / 0.2), transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 50%, hsl(280 100% 60% / 0.15), transparent 50%)
          `
        }}
      />

      {/* Static overlays */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, hsl(240 15% 3%) 100%)'
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, hsl(240 15% 3% / 0.7) 100%)'
        }}
      />
    </div>
  );
};
