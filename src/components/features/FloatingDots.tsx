import { motion } from "framer-motion"

// hidden on mobile
export const FloatingDots = () => {
  return (
    <>
      <motion.div
        animate={{ y: [-20, 20, -20], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-[6%] w-3 h-3 bg-primary rounded-full hidden md:block"
        style={{ boxShadow: '0 0 20px hsl(var(--primary))' }}
      />
      <motion.div
        animate={{ y: [20, -20, 20], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/4 right-[10%] w-2 h-2 bg-accent rounded-full hidden md:block"
        style={{ boxShadow: '0 0 15px hsl(var(--accent))' }}
      />
      <motion.div
        animate={{ y: [-15, 15, -15], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/3 right-[6%] w-4 h-4 bg-primary/80 rounded-full hidden md:block"
        style={{ boxShadow: '0 0 25px hsl(var(--primary))' }}
      />
    </>
  )
}
