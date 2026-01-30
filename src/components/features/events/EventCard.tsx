import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Trophy, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { type EventData, eventCategories, registrationStatusLabels } from '@/lib/data/events';

interface EventCardProps {
  event: EventData;
  featured?: boolean;
  index?: number;
}

// Category styling using semantic tokens
const categoryStyles: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  seminar: {
    bg: 'bg-event-seminar))]/10',
    text: 'text-event-seminar))]',
    border: 'border-event-seminar))]/30',
    glow: 'shadow-[0_0_30px_event-seminar)/0.3)]',
  },
  competition: {
    bg: 'bg-event-competition))]/10',
    text: 'text-event-competition))]',
    border: 'border-event-competition))]/30',
    glow: 'shadow-[0_0_30px_event-competition)/0.3)]',
  },
  cultural: {
    bg: 'bg-event-cultural))]/10',
    text: 'text-event-cultural))]',
    border: 'border-event-cultural))]/30',
    glow: 'shadow-[0_0_30px_event-cultural)/0.3)]',
  },
  allday: {
    bg: 'bg-event-allday))]/10',
    text: 'text-event-allday))]',
    border: 'border-event-allday))]/30',
    glow: 'shadow-[0_0_30px_event-allday)/0.3)]',
  },
};

export function EventCard({ event, featured = false, index = 0 }: EventCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const styles = categoryStyles[event.category];
  const categoryMeta = eventCategories.find(c => c.id === event.category);
  const statusMeta = registrationStatusLabels[event.registrationStatus];

  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <Card className={cn(
          'overflow-hidden bg-card/80 border-border/50 backdrop-blur-sm',
          'hover:border-primary/30 transition-all duration-500',
          styles.glow
        )}>
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-muted animate-pulse" />
              )}
              <img
                src={event.image}
                alt={event.name}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                className={cn(
                  'w-full h-full object-cover transition-all duration-700',
                  'group-hover:scale-105',
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                )}
              />

              {/* Category Badge Overlay */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <Badge className={cn(styles.bg, styles.text, styles.border, 'border backdrop-blur-sm')}>
                  {categoryMeta?.name}
                </Badge>
                {event.isPopular && (
                  <Badge className="bg-[hsl(var(--event-allday))]/20 text-[hsl(var(--event-allday))] border-[hsl(var(--event-allday))]/30 border backdrop-blur-sm">
                    <Zap className="w-3 h-3 mr-1" /> Popular
                  </Badge>
                )}
              </div>

              {/* Prize Pool Overlay */}
              {event.prizePool && (
                <div className="absolute bottom-4 left-4">
                  <div className="glass-surface px-4 py-2 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-[hsl(var(--event-allday))]" />
                      <span className="text-lg font-bold text-foreground">{event.prizePool}</span>
                      <span className="text-sm text-muted-foreground">Prize Pool</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Content Section */}
            <CardContent className="p-6 md:p-8 flex flex-col justify-between">
              <div className="space-y-4">
                {/* Status & Team Size */}
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge className={cn(statusMeta.color, 'border')}>
                    {statusMeta.label}
                  </Badge>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Users className="w-4 h-4" /> {event.teamSizeDisplay}
                  </span>
                </div>

                {/* Title & Tagline */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
                    {event.name}
                  </h3>
                  <p className="text-muted-foreground text-lg">{event.tagline}</p>
                </div>

                {/* Event Details */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="glass-surface rounded-lg p-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Date & Time</span>
                    </div>
                    <p className="font-semibold text-foreground">{event.date}</p>
                    <p className="text-sm text-muted-foreground">{event.time}</p>
                  </div>
                  <div className="glass-surface rounded-lg p-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">Venue</span>
                    </div>
                    <p className="font-semibold text-foreground">{event.venueShort}</p>
                    <p className="text-sm text-muted-foreground">{event.venue}</p>
                  </div>
                </div>

                {/* Entry Fee - Prominent */}
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="text-sm text-muted-foreground">Entry Fee</span>
                    <p className={cn(
                      'text-3xl font-bold font-mono',
                      event.entryFee === 'Free' ? 'text-[hsl(var(--event-competition))]' : 'text-foreground'
                    )}>
                      {event.entryFee}
                    </p>
                  </div>
                  {event.spotsLeft !== undefined && event.totalSpots && (
                    <div className="text-right">
                      <span className="text-sm text-muted-foreground">Spots Left</span>
                      <p className="text-lg font-semibold text-[hsl(var(--event-allday))]">
                        {event.spotsLeft}/{event.totalSpots}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex gap-3 mt-6">
                <Button variant="outline" className="flex-1 h-12 border-border hover:border-primary/50">
                  View Details
                </Button>
                <Button className="flex-1 h-12 btn-glow bg-primary text-primary-foreground hover:bg-primary/90">
                  Quick Register
                </Button>
              </div>
            </CardContent>
          </div>
        </Card>
      </motion.div>
    );
  }

  // Regular Card
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="h-full"
    >
      <Card className={cn(
        'overflow-hidden bg-card/60 border-border/50 backdrop-blur-sm h-full',
        'hover:border-primary/30 hover:bg-card/80 transition-all duration-300',
        'group cursor-pointer'
      )}>
        {/* Image Section */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-muted animate-pulse" />
          )}
          <img
            src={event.image}
            alt={event.name}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            className={cn(
              'w-full h-full object-cover transition-transform duration-500',
              'group-hover:scale-105',
              imageLoaded ? 'opacity-100' : 'opacity-0'
            )}
          />

          {/* Category Badge */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            <Badge className={cn(styles.bg, styles.text, styles.border, 'border backdrop-blur-sm text-xs')}>
              {categoryMeta?.name}
            </Badge>
            {event.isNew && (
              <Badge className="bg-primary/20 text-primary border-primary/30 border backdrop-blur-sm text-xs">
                New
              </Badge>
            )}
          </div>

          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            <Badge className={cn(statusMeta.color, 'border backdrop-blur-sm text-xs')}>
              {statusMeta.label}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-5 flex flex-col h-[calc(100%-40%)]">
          <div className="flex-1 space-y-3">
            {/* Title & Tagline */}
            <div>
              <h3 className="font-display font-bold text-lg text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                {event.name}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-1 mt-1">{event.tagline}</p>
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {event.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {event.time}
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {event.venueShort}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5" /> {event.teamSizeDisplay}
              </span>
            </div>
          </div>

          {/* Entry Fee & Prizes */}
          <div className="flex items-end justify-between mt-4 pt-4 border-t border-border/50">
            <div>
              <span className="text-xs text-muted-foreground block">Entry Fee</span>
              <span className={cn(
                'text-xl font-bold font-mono',
                event.entryFee === 'Free' ? 'text-[hsl(var(--event-competition))]' : 'text-foreground'
              )}>
                {event.entryFee}
              </span>
            </div>
            {event.prizePool && (
              <div className="flex items-center gap-1 text-[hsl(var(--event-allday))]">
                <Trophy className="w-4 h-4" />
                <span className="font-semibold text-sm">{event.prizePool}</span>
              </div>
            )}
          </div>

          {/* CTAs */}
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm" className="flex-1 border-border hover:border-primary/50">
              Details
            </Button>
            <Button size="sm" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
              Register
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
