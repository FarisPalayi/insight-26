import { useIsMobile } from "@/hooks/useIsMobile";
import { motion } from "framer-motion"

// hidden on mobile
export const FloatingShapes = () => {
  const isMobile = useIsMobile();

  if (isMobile) return null;

  return (
    <>
      <motion.div
        animate={{
          y: [-15, 15, -15],
          rotate: [0, 10, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="floating-layer absolute top-24 right-[12%] w-16 h-16 md:w-24 md:h-24 border-2 border-primary/20 rounded-2xl hidden md:block"
        style={{ background: 'linear-gradient(135deg, hsl(var(--primary) / 0.05), transparent)' }}
      />
      <motion.div
        animate={{
          y: [15, -15, 15],
          rotate: [0, -10, 0],
          scale: [1, 1.08, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="floating-layer absolute bottom-32 left-[8%] w-14 h-14 md:w-20 md:h-20 border-2 border-accent/20 rounded-xl hidden md:block"
        style={{ background: 'linear-gradient(135deg, hsl(var(--accent) / 0.05), transparent)' }}
      />
    </>
  )
}
