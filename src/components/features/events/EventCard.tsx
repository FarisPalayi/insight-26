import { useState } from 'react';
import { Calendar, Clock, MapPin, Users, IndianRupee, Trophy, ChevronRight, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { type UnifiedEvent, categoryLabels, teamSizeLabels, registrationStatusLabels, dayLabels } from '@/lib/data/unifiedEvents';
import { cn } from '@/lib/utils';

interface EventCardProps {
  event: UnifiedEvent;
  onDetailsClick?: (event: UnifiedEvent) => void;
  onRegisterClick?: (event: UnifiedEvent) => void;
}

const CATEGORY_STYLES: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
  seminar: {
    bg: 'bg-event-seminar/10',
    text: 'text-event-seminar',
    border: 'border-event-seminar/30',
    gradient: 'from-event-seminar/20',
  },
  competition: {
    bg: 'bg-event-competition/10',
    text: 'text-event-competition',
    border: 'border-event-competition/30',
    gradient: 'from-event-competition/20',
  },
  cultural: {
    bg: 'bg-event-cultural/10',
    text: 'text-event-cultural',
    border: 'border-event-cultural/30',
    gradient: 'from-event-cultural/20',
  },
  allday: {
    bg: 'bg-event-allday/10',
    text: 'text-event-allday',
    border: 'border-event-allday/30',
    gradient: 'from-event-allday/20',
  },
};

const STATUS_CONFIG: Record<string, { style: string; label: string; actionText: string; priority: 'high' | 'medium' | 'low' }> = {
  open: {
    style: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30',
    label: registrationStatusLabels.open,
    actionText: 'Register Now',
    priority: 'medium',
  },
  'filling-fast': {
    style: 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/40',
    label: registrationStatusLabels['filling-fast'],
    actionText: 'Register Now',
    priority: 'high',
  },
  closed: {
    style: 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/30',
    label: registrationStatusLabels.closed,
    actionText: 'Closed',
    priority: 'low',
  },
};

export function EventCard({ event, onDetailsClick, onRegisterClick }: EventCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const styles = CATEGORY_STYLES[event.category];
  const statusConfig = STATUS_CONFIG[event.registrationStatus];
  const isRegistrationClosed = event.registrationStatus === 'closed';
  const isUrgent = event.registrationStatus === 'filling-fast';

  const handleDetailsClick = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    onDetailsClick?.(event);
  };

  const handleRegisterClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isRegistrationClosed) {
      onRegisterClick?.(event);
    }
  };

  return (
    <Card
      className={cn(
        'group h-full overflow-hidden border transition-all duration-300',
        styles.border,
        'hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1',
        'focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2',
        'flex flex-col pt-0'
      )}
      role="article"
      aria-label={`${event.name} - ${categoryLabels[event.category]} event`}
    >
      {/* Image Section */}
      <div className="relative aspect-video overflow-hidden bg-muted shrink-0">
        {!imageLoaded && !imageError && <Skeleton className="absolute inset-0" />}

        {!imageError ? (
          <img
            src={event.imageUrl}
            alt={`${event.name} event banner`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={cn(
              'w-full h-full object-cover transition-all duration-700',
              'group-hover:scale-110 group-hover:brightness-110',
              !imageLoaded && 'opacity-0'
            )}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <Trophy className="w-16 h-16 text-muted-foreground/20" />
          </div>
        )}

        {/* Gradient Overlay */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t to-transparent via-background/5",
          styles.gradient
        )} />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
          <Badge
            className={cn(
              'text-xs font-semibold border backdrop-blur-md shadow-lg',
              styles.bg,
              styles.text,
              styles.border
            )}
          >
            {categoryLabels[event.category]}
          </Badge>

          {event.prizePool && (
            <Badge className="bg-primary/95 text-primary-foreground text-xs font-bold gap-1.5 backdrop-blur-md shadow-lg px-2.5 py-1">
              <Trophy className="w-3.5 h-3.5" />
              <span>{event.prizePool.replace('Prize Pool: ', '')}</span>
            </Badge>
          )}
        </div>

        {/* Status Badge - Strategic positioning based on urgency */}
        {isUrgent && (
          <div className="absolute bottom-3 left-3 right-3">
            <Badge
              className={cn(
                'w-full justify-center text-xs font-bold backdrop-blur-md border shadow-lg py-1.5',
                statusConfig.style,
                'animate-pulse'
              )}
            >
              ⚡ {statusConfig.label}
            </Badge>
          </div>
        )}
      </div>

      {/* Content Section - Grows to fill available space */}
      <CardContent className="p-4 lg:p-5 flex flex-col flex-1">
        {/* Title & Tagline */}
        <div className="space-y-1.5 mb-4">
          <h3 className="font-bold text-lg lg:text-xl text-foreground line-clamp-2 leading-tight group-hover:text-primary transition-colors">
            {event.name}
          </h3>
          {event.tagline && (
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {event.tagline}
            </p>
          )}
        </div>

        {/* Event Details Grid - Responsive columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <DetailItem
            icon={Calendar}
            text={dayLabels[event.schedule.day]}
            primary
          />
          <DetailItem
            icon={Clock}
            text={event.schedule.displayTime}
          />
          <DetailItem
            icon={MapPin}
            text={event.venue}
          />
          <DetailItem
            icon={Users}
            text={teamSizeLabels[event.teamSize]}
          />
        </div>

        {/* Spacer to push footer to bottom */}
        <div className="flex-1" />

        {/* Footer Section - Always at bottom */}
        <div className="space-y-3 pt-4 border-t border-border/50">
          {/* Entry Fee & Status Row */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className={cn("p-2 rounded-lg", styles.bg)}>
                <IndianRupee className={cn("w-4 h-4", styles.text)} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground leading-none">Entry Fee</span>
                <span className="font-bold text-lg text-foreground leading-tight mt-0.5">
                  {event.entryFee}
                </span>
              </div>
            </div>

            {!isUrgent && (
              <Badge
                variant="outline"
                className={cn(
                  'text-xs font-medium border shrink-0',
                  statusConfig.style
                )}
              >
                {statusConfig.label}
              </Badge>
            )}
          </div>

          {/* Action Buttons - Responsive layout */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="lg"
              className="w-full group/btn h-11"
              onClick={handleDetailsClick}
              aria-label={`View details for ${event.name}`}
            >
              <Info className="w-4 h-4 mr-2 lg:mr-1.5" />
              <span className="hidden sm:inline">View Details</span>
              <span className="sm:hidden">Details</span>
              <ChevronRight className="w-4 h-4 ml-auto opacity-0 -translate-x-2 transition-all group-hover/btn:opacity-100 group-hover/btn:translate-x-0" />
            </Button>

            <Button
              size="lg"
              className={cn(
                "w-full font-semibold h-11 relative overflow-hidden",
                isRegistrationClosed && "opacity-60 cursor-not-allowed",
                isUrgent && "bg-gradient-to-r from-primary to-primary/80 animate-shimmer"
              )}
              disabled={isRegistrationClosed}
              onClick={handleRegisterClick}
              aria-label={isRegistrationClosed ? 'Registration closed' : `Register for ${event.name}`}
            >
              {isUrgent && !isRegistrationClosed && (
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              )}
              <span className="relative flex items-center justify-center gap-1.5">
                {statusConfig.actionText}
                {!isRegistrationClosed && <ChevronRight className="w-4 h-4" />}
              </span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface DetailItemProps {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  primary?: boolean;
}

function DetailItem({ icon: Icon, text, primary }: DetailItemProps) {
  return (
    <div className="flex items-center gap-2.5 group/detail">
      <div className={cn(
        "p-2 rounded-lg transition-colors shrink-0",
        primary
          ? "bg-primary/10 group-hover/detail:bg-primary/15"
          : "bg-muted group-hover/detail:bg-muted/80"
      )}>
        <Icon className={cn(
          "w-4 h-4",
          primary ? "text-primary" : "text-muted-foreground"
        )} />
      </div>
      <span className={cn(
        "text-sm font-medium truncate",
        primary ? "text-foreground" : "text-muted-foreground"
      )}>
        {text}
      </span>
    </div>
  );
}
