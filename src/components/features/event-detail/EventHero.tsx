import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { type UnifiedEvent } from '@/lib/data/unifiedEvents';
import { Link } from 'react-router';

interface EventHeroProps {
  event: UnifiedEvent;
}


export function EventHero({ event }: EventHeroProps) {
  return (
    <section className="relative rounded-[2rem] overflow-hidden border border-white/5 bg-neutral-900/40">
      <div className="grid lg:grid-cols-2 min-h-[500px]">
        {/* Content */}
        <div className="p-8 lg:p-16 flex flex-col justify-center space-y-8 relative z-20">
          <div className="space-y-4">
            <Badge variant="outline" className="border-primary/50 text-primary px-3 py-1 uppercase tracking-tighter">
              {event.category}
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-none uppercase italic italic-font">
              {event.name}
            </h1>
            <p className="text-xl text-primary/80 font-mono tracking-tight underline underline-offset-8">
              {event.tagline}
            </p>
          </div>

          <p className="text-muted-foreground leading-relaxed max-w-md text-lg italic">
            "{event.description}"
          </p>

          <div className="flex gap-4">
            {event.registrationLink && (
              <Button size="lg" className="rounded-full px-10 h-14 bg-primary text-primary-foreground font-black uppercase tracking-widest hover:scale-105 transition-transform">
                <Link to={`${event.registrationLink}`}>
                  Claim Your Spot
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Visual Media */}
        <div className="relative group overflow-hidden">
          <img
            src={event.imageUrl}
            className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110 hidden lg:block"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent lg:block hidden " />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent lg:hidden block" />

          {/* Floating Jackpot Badge */}
          {event.prizes?.jackpotPrize && (
            <div className="absolute top-8 right-8 rotate-12">
              <div className="bg-yellow-400 text-black px-6 py-4 rounded-2xl shadow-[0_0_50px_rgba(250,204,21,0.4)]">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Jackpot</p>
                <p className="text-3xl font-black italic tracking-tighter">{event.prizes.jackpotPrize}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
