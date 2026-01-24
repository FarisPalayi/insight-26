import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

export const FloatingParticles = () => {
  const isMobile = useIsMobile();

  const particleCount = isMobile ? 3 : 6;

  return (
    <>
      {[...Array(particleCount)].map((_, i) => (
        <motion.div
          key={i}
          className="particle bg-primary"
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
            willChange: 'transform, opacity',
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
};
