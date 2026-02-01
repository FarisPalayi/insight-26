import { motion } from "framer-motion"

export const HeroBadge = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg glass-surface mb-6 sm:mb-10 cursor-default relative"
    >

      <span className="relative text-[10px] sm:text-xs font-mono text-primary font-semibold tracking-wider">
        23RD EDITION
      </span>
      <span className="text-muted-foreground text-xs sm:text-sm">•</span>
      <span className="relative text-[10px] sm:text-xs text-foreground/70 tracking-wide">
        Legacy of Excellence
      </span>
    </motion.div>)
}
