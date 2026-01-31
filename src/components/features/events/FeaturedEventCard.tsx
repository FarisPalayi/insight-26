import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, IndianRupee, Trophy, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { type UnifiedEvent, categoryLabels, teamSizeLabels, registrationStatusLabels, dayLabels } from '@/lib/data/unifiedEvents';
import { cn } from '@/lib/utils';

interface FeaturedEventCardProps {
  event: UnifiedEvent;
  index?: number;
}

const CATEGORY_STYLES: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  seminar: {
    bg: 'bg-event-seminar/10',
    text: 'text-event-seminar',
    border: 'border-event-seminar/30',
    glow: 'shadow-event-seminar/20',
  },
  competition: {
    bg: 'bg-event-competition/10',
    text: 'text-event-competition',
    border: 'border-event-competition/30',
    glow: 'shadow-event-competition/20',
  },
  cultural: {
    bg: 'bg-event-cultural/10',
    text: 'text-event-cultural',
    border: 'border-event-cultural/30',
    glow: 'shadow-event-cultural/20',
  },
  allday: {
    bg: 'bg-event-allday/10',
    text: 'text-event-allday',
    border: 'border-event-allday/30',
    glow: 'shadow-event-allday/20',
  },
};

const STATUS_STYLES: Record<string, string> = {
  open: 'bg-event-competition/20 text-event-competition',
  'filling-fast': 'bg-event-allday/20 text-event-allday animate-pulse',
  closed: 'bg-destructive/20 text-destructive',
};

export function FeaturedEventCard({ event, index = 0 }: FeaturedEventCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const styles = CATEGORY_STYLES[event.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card
        className={cn(
          'group overflow-hidden border-2 transition-all duration-300',
          styles.border,
          'hover:shadow-2xl hover:-translate-y-1',
          styles.glow
        )}
      >
        <div className="md:flex">
          {/* Image Section */}
          <div className="relative md:w-2/5 aspect-video md:aspect-auto overflow-hidden">
            {!imageLoaded && <Skeleton className="absolute inset-0" />}
            <img
              src={event.imageUrl}
              alt={event.name}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              className={cn(
                'w-full h-full object-cover transition-transform duration-500 group-hover:scale-105',
                !imageLoaded && 'opacity-0'
              )}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent md:bg-gradient-to-r" />

            {/* Featured Badge */}
            <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground font-bold shadow-lg">
              ⭐ Featured
            </Badge>

            {/* Category Badge */}
            <Badge
              className={cn(
                'absolute top-4 right-4 text-xs font-medium border shadow-lg',
                styles.bg,
                styles.text,
                styles.border
              )}
            >
              {categoryLabels[event.category]}
            </Badge>
          </div>

          {/* Content Section */}
          <CardContent className="md:w-3/5 p-6 md:p-8 space-y-6">
            {/* Header */}
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {event.name}
              </h2>
              <p className="text-muted-foreground text-sm md:text-base">
                {event.tagline}
              </p>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground line-clamp-2">
              {event.description}
            </p>

            {/* Event Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <DetailItem icon={Calendar} label="Day" text={dayLabels[event.schedule.day]} />
              <DetailItem icon={Clock} label="Time" text={event.schedule.displayTime} />
              <DetailItem icon={MapPin} label="Venue" text={event.venue} />
              <DetailItem icon={Users} label="Team Size" text={teamSizeLabels[event.teamSize]} />
            </div>

            {/* Prize & Entry Fee Section */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border/50">
              {event.prizePool && (
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Prize Pool</p>
                    <p className="font-bold text-lg text-primary">{event.prizePool}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Entry Fee</p>
                  <p className="font-bold text-lg text-foreground">{event.entryFee}</p>
                </div>
              </div>

              <Badge
                variant="outline"
                className={cn('ml-auto text-sm px-3 py-1', STATUS_STYLES[event.registrationStatus])}
              >
                {registrationStatusLabels[event.registrationStatus]}
              </Badge>
            </div>

            {/* CTAs */}
            <div className="flex gap-3 pt-2">
              <Button variant="outline" size="lg" className="flex-1">
                View Details
              </Button>
              <Button
                size="lg"
                className="flex-1 group/btn"
                disabled={event.registrationStatus === 'closed'}
              >
                Register Now
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
}

interface DetailItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  text: string;
}

function DetailItem({ icon: Icon, label, text }: DetailItemProps) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="w-4 h-4 shrink-0 text-primary mt-0.5" />
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground truncate">{text}</p>
      </div>
    </div>
  );
}
