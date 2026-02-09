import { motion } from "framer-motion"
import { Calendar, MapPin } from "lucide-react"
import { LogoLink } from "../../ui/LogoLink"

export const FooterBrand = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="lg:col-span-1"
    >
      <div className="flex items-center gap-2 ">
        <LogoLink className="sm:-translate-y-4 -translate-x-2" />
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-80">
        The premier tech festival of CCSIT, Calicut University.
        Two days of innovation, competition, and technology.
      </p>
      {/* Event Info Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
          <Calendar className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-medium text-foreground">Feb 17, 2026</span>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
          <MapPin className="w-3.5 h-3.5 text-accent" />
          <span className="text-xs font-medium text-foreground">CCSIT Campus</span>
        </div>
      </div>
    </motion.div>
  )
}
