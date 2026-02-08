import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Sparkles, ArrowRight, Cpu } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Link } from 'react-router';
import type { UnifiedEvent } from '@/lib/data/unifiedEvents';

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
      className="w-full"
    >
      <Card className="py-0 group relative overflow-hidden bg-card border-border/60 hover:border-primary/50 transition-all duration-500 rounded-[var(--radius-lg)] shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:min-h-[400px]">

          {/* 1. VISUAL ANCHOR - Left Side (Desktop) */}
          <div className="relative w-full h-64 sm:h-80 lg:h-auto lg:w-[45%] overflow-hidden bg-muted">
            {!imageLoaded && <Skeleton className="absolute inset-0 bg-muted/20" />}
            <img
              src={event.imageUrl}
              alt={event.name}
              onLoad={() => setImageLoaded(true)}
              className={cn(
                "h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105",
                !imageLoaded && "opacity-0"
              )}
            />

            {/* Visual Overlays for Accessibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--color-background))] via-transparent to-black/40 lg:bg-gradient-to-r" />

            {/* Featured Badge */}
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge className="bg-primary text-primary-foreground font-bold px-3 py-1 rounded-full shadow-lg border-none flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                <span className="text-[10px] uppercase tracking-wider">Featured Event</span>
              </Badge>
              <Badge variant="outline" className="bg-black/40 backdrop-blur-md text-white border-white/20 text-[10px] uppercase tracking-wider rounded-full">
                {event.category}
              </Badge>
            </div>
          </div>

          {/* 2. CONTENT HUB - Right Side (Desktop) */}
          <CardContent className="flex-1 p-5 sm:p-6 lg:p-10 flex flex-col justify-center">

            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <Link to={`/events/${event.id}`} className="block">

                <div className="space-y-2">

                  <h2 className={cn(
                    "font-sans uppercase font-bold leading-none tracking-tight text-foreground group-hover:text-primary transition-colors duration-300",
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
              <p className="text-sm sm:text-base lg:text-lg text-foreground/70 leading-relaxed font-light line-clamp-3">
                {event.tagline || "Join the flagship competition of Insight'26 and prove your technical supremacy on the grand stage."}
              </p>
            </div>

            {/* 3. METADATA GRID - High Readability Specs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8 p-3 sm:p-4 bg-secondary/30 border border-border/40 rounded-2xl">
              <StatItem icon={Calendar} label="Day" value={event.schedule?.day || "Day 01"} />
              <StatItem icon={Clock} label="Time" value={event.schedule?.displayTime?.split(' - ')[0] || "10:00 AM"} />
              <StatItem icon={MapPin} label="Venue" value={event.venue || "CCSIT"} />
              {event.category === "seminar" ? (
                null
              ) : (
                <StatItem icon={Users} label="Team Size" value={event.teamSize || "Team of 5"} />
              )}
            </div>

            {/* 4. FINANCIALS & CTA */}
            <div className="flex flex-col sm:flex-row items-center gap-6 mt-auto pt-6 border-t border-border/40">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Prize Pool</span>
                  <span className="text-2xl font-black text-primary">₹{event.prizePool || "25,000"}</span>
                </div>
                <div className="w-[1px] h-10 bg-border/60 mx-2" />
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Entry</span>
                  <span className="text-xl font-bold text-foreground">{event.entryFee.toLowerCase() === "free" ? "Free" : `₹${event.entryFee}`}</span>
                </div>
              </div>

              <div className="flex gap-3 w-full sm:w-auto sm:ml-auto">
                <Button
                  asChild
                  className="flex-1 sm:flex-initial h-12 px-8 glow-primary bg-primary text-primary-foreground font-bold uppercase text-[11px] tracking-widest rounded-full hover:scale-105 transition-transform"
                >
                  <Link to={`/events/${event.id}`} className="flex items-center gap-2">
                    Explore
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>

          </CardContent>
        </div>

        {/* Animated Background Decor */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
      </Card>
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
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <Icon className="w-3.5 h-3.5 text-primary/70" />
        <span className="font-mono text-[9px] uppercase tracking-tighter font-bold">{label}</span>
      </div>
      <span className="text-sm font-bold text-foreground truncate">{value}</span>
    </div>
  );
}