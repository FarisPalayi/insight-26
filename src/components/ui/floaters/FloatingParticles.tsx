import { motion } from "framer-motion";
import { useHighEndDevice } from "@/hooks/useDeviceCapability";

export const FloatingParticles = () => {
  const isHighEnd = useHighEndDevice();

  const particleCount = isHighEnd ? 6 : 3;

  return (
    <>
      {[...Array(particleCount)].map((_, i) => (
        <motion.div
          key={i}
          className="floating-layer particle bg-primary"
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
