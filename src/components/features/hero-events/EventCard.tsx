import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { type HeroEvent } from "@/lib/data/unifiedEvents";
import type React from "react";

interface EventCardProps extends React.HTMLAttributes<HTMLDivElement> {
  event: HeroEvent;
  icon: React.ReactNode;
  accentColor: string;
  index: number;
}

export const EventCard = ({ event, icon, accentColor, index, ...props }: EventCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative h-full"
    >
      {/* Dynamic Hover Glow based on Category Accent */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${accentColor} rounded-3xl blur opacity-0 group-hover:opacity-15 transition duration-500`} />

      <div {...props} className="relative h-full flex flex-col p-6 md:p-8 rounded-3xl glass-surface border border-white/5 bg-[#0D0D0D]/50 backdrop-blur-sm group-hover:border-white/10 transition-colors overflow-hidden">

        {/* Background Decorative Gradient */}
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${accentColor} opacity-[0.03] blur-2xl group-hover:opacity-[0.08] transition-opacity`} />

        {/* Icon Header */}
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${accentColor} flex items-center justify-center mb-6 shadow-lg shadow-black/20`}>
          <div className="text-white drop-shadow-md">
            {icon}
          </div>
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-primary/60">
            {event.category}
          </span>
          <span className="w-1 h-1 rounded-full bg-white/10" />
          <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground">
            Day {event.schedule.day}
          </span>
        </div>

        {/* Content */}
        <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight group-hover:text-primary transition-colors">
          {event.name}
        </h3>

        <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-grow line-clamp-3">
          {event.description}
        </p>

        {/* Footer Action */}
        <div className="pt-6 border-t border-white/5 flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-[10px] font-mono uppercase text-muted-foreground/50">Entry Fee</p>
            <p className="text-xs font-bold text-foreground">{event.entryFee}</p>
          </div>

          <Button asChild variant="ghost" className="h-10 px-4 rounded-full hover:bg-white/5 group/btn">
            <Link to={`/events/${event.id}`} className="flex items-center gap-2 text-sm font-semibold">
              Explore
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
