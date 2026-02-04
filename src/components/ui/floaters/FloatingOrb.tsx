import { motion } from "framer-motion";

export const FloatingOrb = ({
  className,
  delay = 0,
  size = "w-96 h-96"
}: {
  className?: string;
  delay?: number;
  size?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{
      opacity: [0.3, 0.5, 0.3],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
    className={`floating-layer absolute ${size} rounded-full ${className}`}
    style={{
      // to hint GPU acceleration
      willChange: 'transform, opacity',
      filter: 'blur(120px)',
    }}
  />
);
