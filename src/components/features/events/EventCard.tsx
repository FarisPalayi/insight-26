import { useState } from 'react';
import { Calendar, Clock, MapPin, Users, IndianRupee, Trophy } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { type UnifiedEvent, categoryLabels, teamSizeLabels, registrationStatusLabels, dayLabels } from '@/lib/data/unifiedEvents';
import { cn } from '@/lib/utils';

interface EventCardProps {
  event: UnifiedEvent;
  index?: number;
}

const CATEGORY_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  seminar: {
    bg: 'bg-event-seminar/10',
    text: 'text-event-seminar',
    border: 'border-event-seminar/30',
  },
  competition: {
    bg: 'bg-event-competition/10',
    text: 'text-event-competition',
    border: 'border-event-competition/30',
  },
  cultural: {
    bg: 'bg-event-cultural/10',
    text: 'text-event-cultural',
    border: 'border-event-cultural/30',
  },
  allday: {
    bg: 'bg-event-allday/10',
    text: 'text-event-allday',
    border: 'border-event-allday/30',
  },
};

const STATUS_STYLES: Record<string, string> = {
  open: 'bg-event-competition/20 text-event-competition',
  'filling-fast': 'bg-event-allday/20 text-event-allday animate-pulse',
  closed: 'bg-destructive/20 text-destructive',
};

export function EventCard({ event }: EventCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const styles = CATEGORY_STYLES[event.category];

  return (
    <Card
      className={cn(
        'group overflow-hidden border transition-all duration-300',
        styles.border,
        'hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1'
      )}
    >
      {/* Image Section */}
      <div className="relative aspect-video overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

        {/* Category Badge */}
        <Badge
          className={cn(
            'absolute top-3 left-3 text-xs font-medium border',
            styles.bg,
            styles.text,
            styles.border
          )}
        >
          {categoryLabels[event.category]}
        </Badge>

        {/* Prize Pool Badge */}
        {event.prizePool && (
          <Badge className="absolute top-3 right-3 bg-primary/90 text-primary-foreground text-xs font-bold gap-1">
            <Trophy className="w-3 h-3" />
            {event.prizePool}
          </Badge>
        )}
      </div>

      <CardContent className="p-4 space-y-4">
        {/* Title & Tagline */}
        <div>
          <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {event.name}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
            {event.tagline}
          </p>
        </div>

        {/* Event Details Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <DetailItem icon={Calendar} text={dayLabels[event.schedule.day]} />
          <DetailItem icon={Clock} text={event.schedule.displayTime.split(' - ')[0]} />
          <DetailItem icon={MapPin} text={event.venue} />
          <DetailItem icon={Users} text={teamSizeLabels[event.teamSize]} />
        </div>

        {/* Entry Fee & Status */}
        <div className="flex items-center justify-between gap-2 pt-3 border-t border-border/50">
          <div className="flex items-center gap-1">
            <IndianRupee className="w-4 h-4 text-primary" />
            <span className="font-bold text-foreground">{event.entryFee}</span>
          </div>
          <Badge variant="outline" className={cn('text-xs', STATUS_STYLES[event.registrationStatus])}>
            {registrationStatusLabels[event.registrationStatus]}
          </Badge>
        </div>

        {/* CTAs */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 text-xs h-9">
            Details
          </Button>
          <Button
            size="sm"
            className="flex-1 text-xs h-9"
            disabled={event.registrationStatus === 'closed'}
          >
            Register
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

interface DetailItemProps {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
}

function DetailItem({ icon: Icon, text }: DetailItemProps) {
  return (
    <div className="flex items-center gap-1.5 text-muted-foreground">
      <Icon className="w-3.5 h-3.5 shrink-0" />
      <span className="truncate">{text}</span>
    </div>
  );
}

