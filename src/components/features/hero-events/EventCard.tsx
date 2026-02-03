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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative h-full"
    >
      <Link to={urlPath} className="block h-full">
        <div className="relative h-full glass-surface border border-white/5 rounded-xl overflow-hidden transition-all duration-500 hover:border-white/20">

          {/* Subtle Accent Glow - Top Right */}
          <div
            className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-10 blur-3xl transition-opacity duration-500 group-hover:opacity-20"
            style={{ backgroundColor: accentColor }}
          />

          <div className="relative z-10 p-7 flex flex-col h-full">

            {/* Header: Icon with adaptive glow */}
            <div className="mb-8">
              <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:border-white/30 group-hover:bg-white/10 relative">
                <div className="text-white/70 group-hover:text-white transition-colors">
                  {icon}
                </div>
                {/* Internal Glow on Hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 blur-lg transition-opacity"
                  style={{ backgroundColor: accentColor }}
                />
              </div>
            </div>

            {/* Content: Title & Tagline */}
            <div className="flex-1">
              <h4 className="text-2xl font-bold tracking-tight text-white mb-3 group-hover:text-primary transition-colors">
                {name}
              </h4>
              <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
                {tagline}
              </p>
            </div>

            {/* Footer: Metadata & CTA */}
            <div className="mt-8 pt-5 border-t border-white/5 flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                  Category
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-white/90">
                  {category}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                View <ArrowRight size={14} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
