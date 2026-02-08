import { ChevronRight, Trophy, IndianRupee, Users, ArrowUpRight, Cpu } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import type { UnifiedEvent } from '@/lib/data/unifiedEvents';

export function EventCard({ event }: { event: UnifiedEvent }) {
  const hasFancyName = !!event.fancyName;

  return (
    <Card className="py-0 group relative h-full flex flex-col bg-card border-border/60 overflow-hidden transition-all duration-300 hover:border-primary rounded-[var(--radius-lg)] shadow-md">

      {/* 1. VISUAL HEADER - High Contrast Overlays */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={event.imageUrl}
          alt={event.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Stronger gradient for accessibility (ensures top badges are readable) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--color-background))] via-transparent to-transparent" />

        {/* Prize Badge - High Visibility Primary Color */}
        {event.prizePool && (
          <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-primary rounded-full shadow-xl">
            <Trophy className="w-3.5 h-3.5 text-primary-foreground" />
            <span className="font-sans text-[12px] font-bold text-primary-foreground">
              ₹{event.prizePool}
            </span>
          </div>
        )}

        {/* Category Label - High Contrast Secondary */}
        <div className="absolute top-4 left-4">
          <Badge className="bg-white text-black text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full border-none">
            {event.category}
          </Badge>
        </div>
      </div>

      {/* 2. CONTENT SECTION - Legibility First */}
      <div className="flex flex-1 flex-col p-6">

        <div className="space-y-3 mb-6">
          <div className="space-y-1">
            {/* Primary Heading - Pure White for maximum contrast */}
            <h3 className="font-sans font-bold text-2xl lg:text-3xl text-foreground leading-tight tracking-tight">
              {event.fancyName || event.name}
            </h3>

            {hasFancyName && (
              <div className="flex items-center gap-2 text-primary font-mono text-[11px] uppercase tracking-wider font-semibold">
                <Cpu className="w-3.5 h-3.5" />
                <span>{event.name}</span>
              </div>
            )}
          </div>

          {/* Tagline - Increased contrast to 80% white */}
          <p className="text-[14px] text-foreground/80 leading-relaxed line-clamp-2">
            {event.tagline || "Redefining the boundaries of technology and innovation."}
          </p>
        </div>

        {/* 3. METADATA SECTION - Solid Background for Readability */}
        {event.category !== "seminar" ? (
          <div className="grid grid-cols-2 gap-px bg-border/40 rounded-xl overflow-hidden mb-6 border border-border/40">
            <div className="bg-secondary/40 p-4 flex flex-col gap-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Entry Fee</span>
              <div className="flex items-center gap-1.5 text-foreground">
                <IndianRupee className="w-4 h-4 text-primary" />
                <span className="text-base font-bold">{event.entryFee}</span>
              </div>
            </div>
            <div className="bg-secondary/40 p-4 flex flex-col gap-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Team Size</span>
              <div className="flex items-center gap-1.5 text-foreground">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-base font-bold">{event.teamSize || 'Solo'}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className='grid grid-cols-1 gap-px bg-border/40 rounded-xl overflow-hidden mb-6 border border-border/40 items-center'>
            <div className="bg-secondary/40 p-4 flex flex-col gap-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Entry Fee</span>
              <div className="flex items-center gap-1.5 text-foreground">
                <IndianRupee className="w-4 h-4 text-primary" />
                <span className="text-base font-bold">{event.entryFee}</span>
              </div>
            </div>
          </div>
        )}

        {/* 4. ACTIONS - High Affordance */}
        <div className="mt-auto space-y-4">
          <Button
            asChild
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase text-[12px] tracking-widest shadow-lg shadow-primary/20 rounded-full transition-all active:scale-[0.97]"
          >
            <Link to="/register" className="flex items-center justify-center gap-2">
              Register for Event
              <ChevronRight className="w-4 h-4" />
            </Link>
          </Button>

          <Link
            to={`/events/${event.id}`}
            className="flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-widest text-foreground hover:text-primary transition-colors py-2 underline underline-offset-4 decoration-primary/30"
          >
            Detailed Guidelines
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </Card>
  );
}
