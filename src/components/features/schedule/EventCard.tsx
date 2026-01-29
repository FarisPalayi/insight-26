import { motion } from 'framer-motion';
import { Clock, MapPin, Timer } from 'lucide-react';
import { type ScheduleEvent, categories } from '@/lib/data/schedule';
import { cn } from '@/lib/utils';

interface EventCardProps {
  event: ScheduleEvent;
  index: number;
  onClick?: () => void;
}

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
};

export function EventCard({ event, index, onClick }: EventCardProps) {
  const style = categoryStyles[event.category] || categoryStyles.competition;
  const categoryInfo = categories.find((c) => c.id === event.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.02, y: -4 }}
      onClick={onClick}
      className={cn(
        'group relative cursor-pointer rounded-xl border p-5 transition-all duration-300',
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
      />

      {/* Header */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors truncate">
            {event.name}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span
              className={cn(
                'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
                style.bg,
                style.text,
                'border',
                style.border
              )}
            >
              {categoryInfo?.name}
            </span>
            {event.isMultiPeriod && (
              <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 border border-accent/30 px-3 py-1 text-xs font-medium text-accent">
                <Timer className="h-3 w-3" />
                Multi-session
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Time and Venue */}
      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-3 text-muted-foreground">
          <div className={cn('flex items-center justify-center w-8 h-8 rounded-lg', style.bg)}>
            <Clock className={cn('h-4 w-4', style.text)} />
          </div>
          <span className="font-medium text-foreground">{event.time}</span>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <div className={cn('flex items-center justify-center w-8 h-8 rounded-lg', style.bg)}>
            <MapPin className={cn('h-4 w-4', style.text)} />
          </div>
          <span>{event.venue}</span>
        </div>
      </div>

    </motion.div>
  );
}
