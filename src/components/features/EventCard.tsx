import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
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
      initial={{ opacity: 0, y: 30, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative h-full"
    >
      {/* Hover glow */}

      {/* Card */}
      <div className="relative h-full rounded-2xl border border-border/50 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-lg overflow-hidden transition-all duration-500">
        {/* Background accent */}
        <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl ${accentColor} opacity-10 rounded-full blur-3xl transform translate-x-10 -translate-y-10 group-hover:opacity-20 transition-opacity duration-500`} />

        {/* Content */}
        <div className="relative z-10 p-6 md:p-8 h-full flex flex-col">
          {/* Icon & Category header */}
          <div className="flex items-start justify-between mb-6">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className={`w-14 h-14 rounded-xl bg-gradient-to-br ${accentColor} flex items-center justify-center shadow-lg`}
            >
              <div className="text-white">{icon}</div>
            </motion.div>

            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider bg-muted/50 px-3 py-1.5 rounded-full">
              {category}
            </span>
          </div>

          {/* Event Name */}
          <h4 className="text-2xl md:text-3xl font-bold text-foreground mb-3 group-hover:text-gradient transition-all duration-300">
            {name}
          </h4>

          {/* Tagline */}
          <p className="text-muted-foreground leading-relaxed mb-8 flex-1">
            {tagline}
          </p>

          {/* CTA */}
          <Link to={urlPath} className="flex items-center justify-between pt-4 border-t border-border/50">
            <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
              Learn more
            </span>
            <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
            </div>
          </Link>
        </div>
      </div>
    </motion.div >
  );
};
