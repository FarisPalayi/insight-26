import { motion } from "framer-motion"

export const HeroSubtitle = () => {
  return (
    <motion.p
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-xs sm:max-w-xl md:max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed text-balance px-2"
    >
      Join hundreds of students across universities for two days of
      <span className="text-foreground font-medium"> innovation</span>,
      <span className="text-foreground font-medium"> collaboration</span>, and
      <span className="text-foreground font-medium"> cutting-edge technology</span>.
    </motion.p>

  )
}
