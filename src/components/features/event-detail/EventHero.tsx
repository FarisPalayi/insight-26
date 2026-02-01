import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, ArrowRight, Star, Zap, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { type UnifiedEvent, categoryLabels } from '@/lib/data/unifiedEvents';
import { cn } from '@/lib/utils';

interface EventHeroProps {
  event: UnifiedEvent;
}

const CATEGORY_STYLES: Record<string, string> = {
  seminar: 'bg-event-seminar',
  competition: 'bg-event-competition',
  cultural: 'bg-event-cultural',
  allday: 'bg-event-allday',
};

export function EventHero({ event }: EventHeroProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="py-8 lg:py-12">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left Side - Title, Tagline, CTA */}
        <motion.div
          className="space-y-6 order-2 lg:order-1"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Category & Featured Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <Badge className={cn('text-xs font-semibold text-background', CATEGORY_STYLES[event.category])}>
              {categoryLabels[event.category]}
            </Badge>
            {event.isFeatured && (
              <Badge className="bg-primary/20 text-primary gap-1">
                <Star className="w-3 h-3 fill-current" />
                Featured Event
              </Badge>
            )}
            {event.spotRegistration && (
              <Badge className="bg-event-competition/20 text-event-competition gap-1 border border-event-competition/30">
                <MapPin className="w-3 h-3" />
                Spot Registration
              </Badge>
            )}
          </div>

          {/* Event Title */}
          <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight">
            {event.name}
          </h1>

          {/* High-Stakes Tagline */}
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
            {event.tagline}
          </p>

          {/* Description */}
          <p className="text-sm md:text-base text-muted-foreground/80 leading-relaxed max-w-lg">
            {event.description}
          </p>

          {/* Primary CTA */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button
              size="lg"
              className={cn(
                'h-14 px-8 text-base font-semibold gap-2 rounded-xl transition-all',
              )}
            >
              Claim Your Spot
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>

        {/* Right Side - Image with Glass Overlay */}
        <motion.div
          className="relative order-1 lg:order-2"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            {!imageLoaded && <Skeleton className="absolute inset-0" />}
            <img
              src={event.imageUrl}
              alt={event.name}
              loading="eager"
              onLoad={() => setImageLoaded(true)}
              className={cn(
                'w-full h-full object-cover transition-opacity duration-300',
                !imageLoaded && 'opacity-0'
              )}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

            {/* Jackpot Badge - Top Right */}
            {event.prizes?.jackpotPrize && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute top-4 right-4"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl blur-lg opacity-60 animate-pulse" />
                  <div className="relative glass-surface-strong border border-amber-500/50 rounded-xl px-4 py-3 bg-gradient-to-br from-amber-500/20 to-orange-500/10">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-background" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider font-bold text-amber-400">Jackpot</p>
                        <p className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">
                          {event.prizes?.jackpotPrize}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Prize Pool Glass Overlay */}
            {event.prizePool && (
              <div className="absolute bottom-4 left-4 right-4 glass-surface rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-event-allday/20 flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-event-allday" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Prize Pool</p>
                      <p className="text-2xl font-bold text-event-allday">{event.prizePool}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Decorative Glow */}
          <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-3xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
}
