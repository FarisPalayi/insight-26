import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

interface EventCardProps {
  name: string;
  category: string;
  tagline: string;
  icon: React.ReactNode;
  accentColor: string;
  index?: number;
  urlPath: string;
}

export const EventCard = ({ name, category, tagline, icon, accentColor, urlPath, index = 0 }: EventCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="group relative h-full"
    >
      {/* Outer glow effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-br ${accentColor} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`} />

      {/* Card */}
      <Link to={urlPath} className="block h-full">
        <div className="relative h-full rounded-2xl border border-border/40 glass-surface overflow-hidden transition-all duration-500 group-hover:border-border/80 group-hover:shadow-2xl">

          {/* Animated background gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${accentColor} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

          {/* Subtle corner accent */}
          <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${accentColor} opacity-8 rounded-full blur-2xl`} />

          {/* Content */}
          <div className="relative z-10 p-6 sm:p-7 md:p-8 h-full flex flex-col">

            {/* Header: Icon + Category */}
            <div className="flex items-center justify-between mb-6">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${accentColor} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
              >
                <div className="text-white scale-90 sm:scale-100">{icon}</div>
              </motion.div>

              <span className="text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-widest px-3 py-1.5 rounded-full bg-muted/30 border border-border/30">
                {category}
              </span>
            </div>

            {/* Event Name */}
            <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 sm:mb-4 group-hover:text-gradient transition-all duration-300 leading-tight">
              {name}
            </h4>

            {/* Tagline */}
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 sm:mb-8 flex-1">
              {tagline}
            </p>

            {/* CTA Footer */}
            <div className="flex items-center justify-between pt-4 sm:pt-5 border-t border-border/30 group-hover:border-border/60 transition-colors duration-300">
              <span className="text-xs sm:text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors duration-300">
                Learn more
              </span>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-muted/40 flex items-center justify-center group-hover:bg-primary/20 border border-border/20 group-hover:border-primary/30 transition-all duration-300"
              >
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-300" />
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
