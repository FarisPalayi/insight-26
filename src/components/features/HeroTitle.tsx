import { motion } from "framer-motion"

export const HeroTitle = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="mb-6 sm:mb-8"
    >
      <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none">
        <motion.span
          className="text-gradient inline-block"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          INSIGHT
        </motion.span>
        <motion.span
          className="text-foreground inline-block ml-1 sm:ml-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          '26
        </motion.span>
      </h1>

      {/* Glowing underline */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        className="h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4 sm:mt-6 max-w-xs sm:max-w-md"
        style={{ boxShadow: '0 0 30px hsl(var(--primary) / 0.5)' }}
      />
    </motion.div >
  )
}
