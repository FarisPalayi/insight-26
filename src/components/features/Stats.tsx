import { motion } from "framer-motion"
import { useEffect, useState } from "react";

const AnimatedCounter = ({ value, duration = 2 }: { value: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value.replace(/\D/g, ''));
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    let start = 0;
    const end = numericValue;
    const increment = end / (duration * 60);
    let animationFrame: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;

      // Only update ~60 times per second
      if (deltaTime >= 16.67) {
        start += increment;

        if (start >= end) {
          setCount(end);
          return; // Stop animation
        } else {
          setCount(Math.floor(start));
        }

        lastTime = currentTime;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [numericValue, duration]);

  return <span>{count}{suffix}</span>;
};


export const StatsCards = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-12 mt-16 sm:mt-24 max-w-2xl mx-auto"
    >
      {[
        { value: "15+", label: "Events" },
        { value: "200+", label: "Participants" },
        { value: "25+", label: "Universities" },
      ].map((stat, index) => (
        <motion.div
          key={index}
          className="stat-card text-center p-3 sm:p-6 rounded-xl sm:rounded-2xl glass-surface cursor-default"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ type: "spring", stiffness: 400 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          custom={index}
        >
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient mb-1 sm:mb-2">
            <AnimatedCounter value={stat.value} duration={2 + index * 0.5} />
          </div>
          <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-wider">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </motion.div>

  )
}
