import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, IndianRupee, Trophy, Info, Sparkles, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { type UnifiedEvent, categoryLabels, teamSizeLabels, dayLabels } from '@/lib/data/unifiedEvents';
import { cn } from '@/lib/utils';
import { Link } from 'react-router';

interface FeaturedEventCardProps {
  event: UnifiedEvent;
  index?: number;
  onDetailsClick?: (event: UnifiedEvent) => void;
  onRegisterClick?: (event: UnifiedEvent) => void;
}

const CATEGORY_STYLES: Record<string, { bg: string; text: string; border: string; glow: string; gradient: string }> = {
  seminar: {
    bg: 'bg-event-seminar/10',
    text: 'text-event-seminar',
    border: 'border-event-seminar/30',
    glow: 'hover:shadow-event-seminar/20',
    gradient: 'from-event-seminar/30',
  },
  competition: {
    bg: 'bg-event-competition/10',
    text: 'text-event-competition',
    border: 'border-event-competition/30',
    glow: 'hover:shadow-event-competition/20',
    gradient: 'from-event-competition/30',
  },
  cultural: {
    bg: 'bg-event-cultural/10',
    text: 'text-event-cultural',
    border: 'border-event-cultural/30',
    glow: 'hover:shadow-event-cultural/20',
    gradient: 'from-event-cultural/30',
  },
  allday: {
    bg: 'bg-event-allday/10',
    text: 'text-event-allday',
    border: 'border-event-allday/30',
    glow: 'hover:shadow-event-allday/20',
    gradient: 'from-event-allday/30',
  },
};

export function FeaturedEventCard({ event, index = 0, onDetailsClick }: FeaturedEventCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const styles = CATEGORY_STYLES[event.category];

  const handleDetailsClick = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    onDetailsClick?.(event);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      <Card
        className={cn(
          'group overflow-hidden border-2 transition-all duration-500',
          styles.border,
          'hover:shadow-2xl hover:-translate-y-2',
          styles.glow,
          'focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2',
          'py-0'
        )}
        role="article"
        aria-label={`Featured event: ${event.name}`}
      >
        {/* Mobile: Vertical Layout | Desktop: Horizontal Layout */}
        <div className="flex flex-col lg:flex-row">
          {/* Image Section - Responsive sizing */}
          <div className="relative w-full lg:w-2/5 xl:w-1/2 aspect-[16/10] lg:aspect-auto overflow-hidden bg-muted shrink-0">
            {!imageLoaded && !imageError && <Skeleton className="absolute inset-0" />}

            {!imageError ? (
              <img
                src={event.imageUrl}
                alt={`${event.name} featured event banner`}
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
                <Trophy className="w-20 h-20 text-muted-foreground/20" />
              </div>
            )}

            {/* Gradient Overlay - Adapts to layout direction */}
            <div className={cn(
              "absolute inset-0 transition-opacity duration-500",
              "bg-gradient-to-t lg:bg-gradient-to-r",
              "from-background/95 via-background/50 to-transparent",
              styles.gradient
            )} />

            {/* Badges - Responsive positioning */}
            <div className="absolute top-3 left-3 right-3 lg:top-4 lg:left-4 lg:right-4 flex items-start justify-between gap-2 flex-wrap">
              <Badge className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-bold shadow-xl backdrop-blur-sm px-3 py-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-xs lg:text-sm">Featured</span>
              </Badge>

              <Badge
                className={cn(
                  'text-xs lg:text-sm font-semibold border backdrop-blur-md shadow-lg',
                  styles.bg,
                  styles.text,
                  styles.border
                )}
              >
                {categoryLabels[event.category]}
              </Badge>
            </div>
          </div>

          {/* Content Section - Flexible padding */}
          <CardContent className="flex-1 p-5 sm:p-6 lg:p-8 flex flex-col">
            {/* Header */}
            <div className="space-y-2 mb-4 lg:mb-6">
              <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-display font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                {event.name}
              </h2>
              {event.tagline && (
                <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
                  {event.tagline}
                </p>
              )}
            </div>

            {/* Description - Hidden on small mobile, visible on larger screens */}
            {event.description && (
              <p className="hidden sm:block text-sm lg:text-base text-muted-foreground line-clamp-2 lg:line-clamp-3 leading-relaxed mb-4 lg:mb-6">
                {event.description}
              </p>
            )}

            {/* Event Details Grid - Responsive columns */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-5 lg:mb-6">
              <DetailItem
                icon={Calendar}
                label="Day"
                text={dayLabels[event.schedule.day]}
                primary
              />
              <DetailItem
                icon={Clock}
                label="Time"
                text={event.schedule.displayTime.split(' - ')[0]}
              />
              <DetailItem
                icon={MapPin}
                label="Venue"
                text={event.venue}
              />
              <DetailItem
                icon={Users}
                label="Team"
                text={teamSizeLabels[event.teamSize]}
              />
            </div>

            {/* Spacer to push footer to bottom */}
            <div className="flex-1" />

            {/* Prize Pool & Entry Fee Section */}
            <div className="flex flex-wrap items-center gap-4 lg:gap-6 py-4 lg:py-5 border-t-2 border-border/50 mb-4 lg:mb-5">
              {event.prizePool && (
                <div className="flex items-center gap-2.5 lg:gap-3">
                  <div className="p-2.5 lg:p-3 rounded-xl bg-primary/10">
                    <Trophy className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground leading-none mb-1">Prize Pool</p>
                    <p className="font-bold text-base lg:text-xl text-primary leading-tight">
                      {event.prizePool.replace('Prize Pool: ', '')}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2.5 lg:gap-3">
                <div className={cn("p-2.5 lg:p-3 rounded-xl", styles.bg)}>
                  <IndianRupee className={cn("w-5 h-5 lg:w-6 lg:h-6", styles.text)} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground leading-none mb-1">Entry Fee</p>
                  <p className="font-bold text-base lg:text-xl text-foreground leading-tight">
                    {event.entryFee}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons - Responsive layout */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                size="lg"
                className="w-full group/btn h-11 lg:h-12 text-sm lg:text-base font-semibold"
                onClick={handleDetailsClick}
                aria-label={`View details for ${event.name}`}
                asChild
              >
                <Link to={`/events/${event.id}`}>
                  <Info className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                  <span className="hidden sm:inline">View Details</span>
                  <span className="sm:hidden">Details</span>
                </Link>
              </Button>

              <Button
                size="lg"
                className={cn(
                  "w-full font-bold h-11 lg:h-12 text-sm lg:text-base group/btn relative overflow-hidden",
                )}
                aria-label={`Register for ${event.name}`}
                asChild
              >
                <Link to="/register">
                  <span className="relative flex items-center justify-center gap-2">
                    Register Now
                    <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 transition-transform group-hover/btn:translate-x-1" />
                  </span>
                </Link>
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
  primary?: boolean;
}

function DetailItem({ icon: Icon, label, text, primary }: DetailItemProps) {
  return (
    <div className="flex flex-col gap-1.5 group/detail">
      <div className="flex items-center gap-2">
        <div className={cn(
          "p-1.5 lg:p-2 rounded-lg transition-colors shrink-0",
          primary
            ? "bg-primary/15 group-hover/detail:bg-primary/20"
            : "bg-muted group-hover/detail:bg-muted/80"
        )}>
          <Icon className={cn(
            "w-4 h-4",
            primary ? "text-primary" : "text-muted-foreground"
          )} />
        </div>
        <p className="text-xs text-muted-foreground leading-none">{label}</p>
      </div>
      <p className={cn(
        "text-sm lg:text-base font-semibold truncate pl-0.5",
        primary ? "text-foreground" : "text-muted-foreground"
      )}>
        {text}
      </p>
    </div>
  );
}
