import { motion } from 'framer-motion';
import { Clock, MapPin, Timer, AlertTriangle } from 'lucide-react';
import { getVenueName, type UnifiedEvent } from '@/lib/data/unifiedEvents';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router';

// ============================================
// TYPES
// ============================================

interface EventCardProps {
  event: UnifiedEvent | null | undefined;
  index?: number;
  onClick?: () => void;
}

// ============================================
// CONSTANTS
// ============================================

// Category styles using event-* tokens for distinct, scannable colors
const categoryStyles: Record<string, { bg: string; border: string; text: string; glow: string; indicator: string }> = {
  seminar: {
    bg: 'bg-event-seminar/10',
    border: 'border-event-seminar/30',
    text: 'text-event-seminar',
    glow: 'hover:shadow-[0_0_30px_hsl(200_100%_55%/0.2)]',
    indicator: 'bg-event-seminar',
  },
  competition: {
    bg: 'bg-event-competition/10',
    border: 'border-event-competition/30',
    text: 'text-event-competition',
    glow: 'hover:shadow-[0_0_30px_hsl(160_100%_45%/0.2)]',
    indicator: 'bg-event-competition',
  },
  cultural: {
    bg: 'bg-event-cultural/10',
    border: 'border-event-cultural/30',
    text: 'text-event-cultural',
    glow: 'hover:shadow-[0_0_30px_hsl(280_100%_60%/0.2)]',
    indicator: 'bg-event-cultural',
  },
  allday: {
    bg: 'bg-event-allday/10',
    border: 'border-event-allday/30',
    text: 'text-event-allday',
    glow: 'hover:shadow-[0_0_30px_hsl(35_100%_55%/0.2)]',
    indicator: 'bg-event-allday',
  },
  inauguration: {
    bg: 'bg-primary/10',
    border: 'border-primary/30',
    text: 'text-primary',
    glow: 'hover:shadow-[0_0_30px_hsl(var(--primary)/0.2)]',
    indicator: 'bg-primary',
  },
  // Fallback style
  default: {
    bg: 'bg-muted/10',
    border: 'border-muted/30',
    text: 'text-muted-foreground',
    glow: 'hover:shadow-[0_0_30px_hsl(var(--muted)/0.2)]',
    indicator: 'bg-muted',
  },
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Safely gets category style with fallback
 */
function getCategoryStyle(category: string | undefined | null) {
  if (!category || typeof category !== 'string') {
    console.warn('EventCard: Invalid category, using default style');
    return categoryStyles.default;
  }

  return categoryStyles[category] || categoryStyles.default;
}

/**
 * Safely gets event name with fallback
 */
function getEventName(event: UnifiedEvent | null | undefined): string {
  if (!event) return 'Untitled Event';
  return event.name || event.fancyName || 'Untitled Event';
}

/**
 * Safely gets event display time with fallback
 */
function getEventTime(event: UnifiedEvent | null | undefined): string {
  if (!event || !event.schedule) return 'Time TBA';
  return event.schedule.displayTime || 'Time TBA';
}

/**
 * Safely gets event ID for routing
 */
function getEventId(event: UnifiedEvent | null | undefined): string {
  if (!event || !event.id) {
    console.warn('EventCard: Event missing ID, using fallback');
    return 'unknown';
  }
  return event.id;
}

// ============================================
// ERROR STATE COMPONENT
// ============================================

function EventCardError() {
  return (
    <Card className="group relative rounded-xl border p-5 bg-card/60 backdrop-blur-sm border-destructive/30">
      <CardContent className="p-2 pl-3">
        <div className="flex items-center gap-3 text-destructive">
          <AlertTriangle className="h-5 w-5" />
          <span className="text-sm">Unable to load event</span>
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export function ScheduleEventCard({ event, index = 0, onClick }: EventCardProps) {
  // Validate event object
  if (!event) {
    console.error('ScheduleEventCard: Received null or undefined event');
    return <EventCardError />;
  }

  // Validate required fields
  if (!event.id) {
    console.error('ScheduleEventCard: Event missing required ID field', event);
  }

  if (!event.name && !event.fancyName) {
    console.warn('ScheduleEventCard: Event missing name', event);
  }

  // Get safe values
  const eventId = getEventId(event);
  const eventName = getEventName(event);
  const eventVenue = getVenueName(event.venue);
  const eventTime = getEventTime(event);
  const style = getCategoryStyle(event.category);

  // Safely check for multi-period flag
  const isMultiPeriod = Boolean(event.isMultiPeriod);

  // Animation delay with validation
  const animationDelay = typeof index === 'number' && index >= 0 ? index * 0.05 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: animationDelay }}
      whileHover={{ scale: 1.02, y: -4 }}
      onClick={onClick}
    >
      <Link
        to={`/events/${eventId}`}
        className="block"
        aria-label={`View details for ${eventName}`}
      >
        <Card
          className={cn(
            'group relative rounded-xl border p-5 transition-all duration-300',
            'bg-card/60 backdrop-blur-sm overflow-hidden',
            style.border,
            style.glow,
          )}
        >
          {/* Category indicator line */}
          <div
            className={cn(
              'absolute left-0 top-0 h-full w-1 transition-all duration-300',
              style.indicator,
              'group-hover:w-1.5'
            )}
            aria-hidden="true"
          />

          <CardContent className="p-2 pl-3">
            {/* Header */}
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                  {eventName}
                </h3>
                {isMultiPeriod && (
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <Badge
                      variant="outline"
                      className="inline-flex items-center gap-1 rounded-full bg-accent/10 border border-accent/30 px-3 py-1 text-xs font-medium text-accent"
                    >
                      <Timer className="h-3 w-3" />
                      Multi-session
                    </Badge>
                  </div>
                )}
              </div>
            </div>

            {/* Time and Venue */}
            <div className="space-y-3 text-sm">
              {/* Time */}
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className={cn('flex items-center justify-center w-8 h-8 rounded-lg', style.bg)}>
                  <Clock className={cn('h-4 w-4', style.text)} />
                </div>
                <span className="font-medium text-foreground">{eventTime}</span>
              </div>

              {/* Venue */}
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className={cn('flex items-center justify-center w-8 h-8 rounded-lg', style.bg)}>
                  <MapPin className={cn('h-4 w-4', style.text)} />
                </div>
                <span>{eventVenue}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

