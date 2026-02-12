import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, ArrowRight, Cpu } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router';
import { type UnifiedEvent } from '@/lib/data/unifiedEvents';

interface FeaturedEventCardProps {
  event: UnifiedEvent;
  index?: number;
}

export function FeaturedEventCard({ event, index = 0 }: FeaturedEventCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const hasFancyName = !!event.fancyName;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="w-full group"
    >
      {/* Premium Outer Glow */}
      <div className="absolute -inset-[2px] bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-[28px] blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-700" />

      <div className="relative py-0 glass-surface-strong border-white/10 group-hover:border-white/20 transition-all duration-500 rounded-[26px] shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:h-[420px]">

          {/* VISUAL ANCHOR - Image Section */}
          <div className="relative w-full lg:w-[45%] overflow-hidden bg-black/40">

            {/* Fixed aspect ratio container */}
            <div className="relative w-full aspect-[16/10] lg:h-full">

              {!imageLoaded && (
                <Skeleton className="absolute inset-0 bg-white/5" />
              )}

              <img
                src={event.imageUrl}
                alt={event.name}
                loading="lazy"
                decoding="async"
                onLoad={() => setImageLoaded(true)}
                className={cn(
                  "absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105",
                  !imageLoaded && "opacity-0"
                )}
              />

              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/40 to-transparent lg:bg-gradient-to-r lg:from-[#050505] lg:via-black/50 lg:to-transparent" />

              {/* Grid overlay */}
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none">
                <div className="grid-lines" />
              </div>

              {/* Badge */}
              <div className="absolute top-4 left-4 flex gap-2">
                <div className="px-3 py-1.5 bg-black/40 backdrop-blur-xl border border-white/20 text-white text-[10px] font-mono uppercase tracking-wider rounded-full font-bold">
                  {event.category}
                </div>
              </div>
            </div>
          </div>

          {/* CONTENT HUB */}
          <div className="flex-1 p-5 sm:p-6 lg:p-10 flex flex-col justify-center">

            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <Link to={`/events/${event.id}`} className="block group/link">

                <div className="space-y-2">
                  <h2 className={cn(
                    "font-sans uppercase font-bold leading-none tracking-tight transition-all duration-300",
                    "bg-gradient-to-br from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent",
                    "group-hover/link:from-primary group-hover/link:via-foreground group-hover/link:to-accent",
                    hasFancyName ? "text-3xl sm:text-4xl lg:text-5xl uppercase italic" : "text-2xl sm:text-3xl lg:text-4xl"
                  )}>
                    {event.fancyName || event.name}
                  </h2>

                  {hasFancyName && (
                    <div className="flex items-center gap-2 text-primary/80 font-mono text-xs uppercase tracking-[0.2em] font-bold">
                      <Cpu className="w-4 h-4" />
                      <span>{event.name}</span>
                    </div>
                  )}
                </div>
              </Link>

              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed font-light line-clamp-3">
                {event.tagline || "Join the flagship competition of Insight'26 and prove your technical supremacy on the grand stage."}
              </p>
            </div>

            {/* METADATA GRID - Premium Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
              <StatItem icon={Clock} label="Time" value={event.schedule?.displayTime?.split(' - ')[0]} />
              {event.teamSize && (
                <StatItem icon={Users} label="Team Size" value={event.teamSize} />
              )}
            </div>

            {/* FINANCIALS & CTA */}
            <div className="flex flex-col sm:flex-row items-center gap-6 mt-auto pt-6 border-t border-white/5">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                {event.prizePool && (
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 font-bold">Prize Pool</span>
                    <span className="text-2xl font-black text-primary glow-text">₹{event.prizePool}</span>
                  </div>
                )}
                <div className="w-[1px] h-10 bg-white/10 mx-2" />
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 font-bold">Entry</span>
                  <span className="text-xl font-bold text-foreground">{event.entryFee.toLowerCase() === "free" ? "Free" : `₹${event.entryFee}`}</span>
                </div>
              </div>

              <div className="flex gap-3 w-full sm:w-auto sm:ml-auto">
                <Button
                  asChild
                  className="flex-1 sm:flex-initial h-12 px-8 btn-glow bg-primary text-primary-foreground font-bold uppercase text-[11px] tracking-widest rounded-full hover:scale-105 transition-transform shadow-lg shadow-primary/20 group/btn"
                >
                  <Link to={`/events/${event.id}`} className="flex items-center gap-2">
                    Explore
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>

          </div>
        </div>

        {/* Animated Background Decor */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent blur-3xl rounded-full pointer-events-none" />
      </div>
    </motion.div>
  );
}

interface StatItemProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
}

function StatItem({ icon: Icon, label, value }: StatItemProps) {
  return (
    <div className="group/stat relative">
      {/* Subtle Hover Glow */}
      <div className="absolute -inset-[1px] bg-gradient-to-br from-primary/0 to-accent/0 group-hover/stat:from-primary/20 group-hover/stat:to-accent/10 rounded-xl blur opacity-0 group-hover/stat:opacity-100 transition-opacity duration-500" />

      <div className="relative flex flex-col gap-1 p-3 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5 group-hover/stat:border-white/10 backdrop-blur-sm transition-all duration-300">
        <div className="flex items-center gap-1.5">
          <div className="p-1.5 rounded-lg bg-primary/10 group-hover/stat:bg-primary/20 transition-colors">
            <Icon className="w-3.5 h-3.5 text-primary" />
          </div>
          <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground/50 font-bold">{label}</span>
        </div>
        <span className="text-sm font-bold text-foreground truncate pl-1">{value}</span>
      </div>
    </div>
  );
}