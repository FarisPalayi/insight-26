import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export const HeroBadge = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full glass-surface mb-6 sm:mb-10 group cursor-default"
    >
      <motion.span
        className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary/20"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" />
      </motion.span>
      <span className="text-xs sm:text-sm font-medium text-foreground/80 tracking-wide uppercase">
        The Ultimate Tech Fest Experience
      </span>
    </motion.div>
  )
}
