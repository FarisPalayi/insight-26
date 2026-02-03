import { motion } from "framer-motion"

export const HeroBadge = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="inline-flex items-center gap-3 px-3 py-1.5 border border-white/10 rounded-sm bg-white/5 backdrop-blur-md mb-10"
  >
    <span className="text-[10px] font-mono text-primary font-bold tracking-[0.2em]">
      EDITION.23
    </span>
    <div className="w-[1px] h-3 bg-white/20" />
    <span className="text-[10px] uppercase tracking-[0.15em] text-white/60 font-medium">
      Legacy of Excellence
    </span>
  </motion.div>
);
