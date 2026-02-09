import { motion } from "framer-motion";
import { Trophy, IndianRupee, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import type { UnifiedEvent } from '@/lib/data/unifiedEvents';

interface EventCardProps {
  event: UnifiedEvent;
  index: number;
  accentColor?: string;
}

export function EventCard({ event, index, accentColor = "from-purple-500 to-pink-500" }: EventCardProps) {
  const hasFancyName = !!event.fancyName;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="group relative h-full"
    >
      {/* Dynamic Hover Glow */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${accentColor} rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-500`} />

      <div className="relative h-full flex flex-col rounded-3xl glass-surface border border-white/5 bg-[#0D0D0D]/50 backdrop-blur-sm group-hover:border-white/10 transition-all duration-300 overflow-hidden">

        {/* Poster Image Section */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={event.imageUrl}
            alt={event.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Glass Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#0D0D0D]/90" />

          {/* Floating Metadata */}
          <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
            {/* Category Badge */}
            <div className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-white">
                {event.category}
              </span>
            </div>

            {/* Prize Pool */}
            {event.prizePool && (
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r ${accentColor} backdrop-blur-md shadow-lg`}>
                <Trophy className="w-3.5 h-3.5 text-white" />
                <span className="text-[11px] font-bold text-white">
                  ₹{event.prizePool}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col p-5 md:p-6">

          <Link to={`/events/${event.id}`}>
            {/* Title Section */}
            <div className="space-y-2 mb-4">
              <h3 className="text-xl md:text-2xl font-bold tracking-tight leading-tight group-hover:text-primary transition-colors">
                {event.fancyName || event.name}
              </h3>

              {hasFancyName && (
                <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground/60">
                  {event.name}
                </p>
              )}

              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                {event.tagline || "Redefining the boundaries of technology and innovation."}
              </p>
            </div>
          </Link>


          {/* Metadata Grid */}
          <div className="flex-grow">

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="flex flex-col gap-1 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground/50">
                  Entry Fee
                </span>
                <div className="flex items-center gap-1.5">
                  <IndianRupee className="w-4 h-4 text-primary/80" />
                  <span className="text-sm font-bold text-foreground">
                    {event.entryFee}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground/50">
                  Team Size
                </span>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-primary/80" />
                  <span className="text-sm font-bold text-foreground">
                    {event.teamSize || 'Solo'}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Actions Footer */}
          <div className="pt-4 border-t border-white/5 space-y-3">
            <Button
              asChild
              className="w-full h-11 bg-white/5 hover:bg-white/10 text-foreground font-semibold text-sm rounded-full transition-all active:scale-[0.98] border border-white/10"
            >
              <Link to={`${event.registrationLink}`} className="flex items-center justify-center gap-2">
                Register Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Link
              to={`/events/${event.id}`}
              className="flex items-center justify-center gap-2 text-[11px] font-mono uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors py-2"
            >
              View Details
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Background Decorative Gradient */}
        <div className={`absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl ${accentColor} opacity-[0.03] blur-3xl pointer-events-none group-hover:opacity-[0.06] transition-opacity`} />
      </div>
    </motion.div>
  );
}