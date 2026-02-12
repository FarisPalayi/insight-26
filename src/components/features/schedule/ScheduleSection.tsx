import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Sunrise, Sun, Moon, Zap, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { UnifiedEvent } from '@/lib/data/unifiedEvents';
import { timePeriods } from '@/lib/data/unifiedEvents';
import { ScheduleEventCard } from './EventCard';
import { EventCategoryFilter } from '@/components/features/EventCategoryFilter';
import { useScheduleState } from '@/hooks/useScheduleState';

// ============================================
// TYPES
// ============================================

interface TimePeriod {
  id: 'morning' | 'afternoon' | 'evening' | 'allday';
  label: string;
  timeLabel: string;
  start: string;
  end: string;
  icon: React.ComponentType<{ className?: string }>;
  isAllDay?: boolean;
}

// ============================================
// CONSTANTS
// ============================================

const periods: TimePeriod[] = [
  {
    id: 'morning',
    label: 'Morning',
    timeLabel: timePeriods.morning.label,
    start: timePeriods.morning.start,
    end: timePeriods.morning.end,
    icon: Sunrise
  },
  {
    id: 'afternoon',
    label: 'Afternoon',
    timeLabel: timePeriods.afternoon.label,
    start: timePeriods.afternoon.start,
    end: timePeriods.afternoon.end,
    icon: Sun
  },
  {
    id: 'evening',
    label: 'Evening',
    timeLabel: timePeriods.evening.label,
    start: timePeriods.evening.start,
    end: timePeriods.evening.end,
    icon: Moon
  },
  {
    id: 'allday',
    label: 'All Day',
    timeLabel: 'Running throughout the day',
    start: '00:00',
    end: '23:59',
    icon: Zap,
    isAllDay: true,
  },
];

// ============================================
// SUB-COMPONENTS
// ============================================

/**
 * Error state component
 */
function ErrorState({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="w-20 h-20 rounded-2xl bg-destructive/10 border border-destructive/30 flex items-center justify-center mb-6">
        <AlertCircle className="h-10 w-10 text-destructive" />
      </div>
      <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-2">
        Something went wrong
      </h3>
      <p className="text-muted-foreground max-w-sm">
        {message || 'Unable to load events. Please try again later.'}
      </p>
    </motion.div>
  );
}

/**
 * Empty state component
 */
function EmptyState({ selectedDay }: { selectedDay: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/30 border border-border flex items-center justify-center mb-6 shadow-inner">
        <Calendar className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-2">
        No events found
      </h3>
      <p className="text-muted-foreground max-w-sm">
        Adjust your filters to see more events for Day {selectedDay}.
      </p>
    </motion.div>
  );
}

/**
 * Time period section component
 */
function TimePeriodSection({
  period,
  events,
  index,
}: {
  period: TimePeriod;
  events: UnifiedEvent[];
  index: number;
}) {
  // Don't render if no events
  if (!events || events.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.08 }}
        className="mb-6 flex items-center gap-4"
      >
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-card to-card/80 border border-border shadow-md">
          <period.icon className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground">
            {period.label}
          </h3>
          <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
            {period.timeLabel}
          </p>
        </div>
        <div className="hidden md:block flex-1 h-px bg-gradient-to-r from-border via-border/50 to-transparent" />
      </motion.div>

      <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event, eventIndex) => (
          <ScheduleEventCard
            key={event?.id || `event-${eventIndex}`}
            event={event}
            index={eventIndex}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Day tab content component
 */
function DayTabContent({
  day,
  eventsByPeriod,
  hasEvents,
}: {
  day: string;
  eventsByPeriod: {
    morning: UnifiedEvent[];
    afternoon: UnifiedEvent[];
    evening: UnifiedEvent[];
    allday: UnifiedEvent[];
  };
  hasEvents: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-12"
    >
      {hasEvents ? (
        <>
          {periods.map((period, i) => {
            const periodEvents = eventsByPeriod[period.id];

            return (
              <TimePeriodSection
                key={period.id}
                period={period}
                events={periodEvents}
                index={i}
              />
            );
          })}
        </>
      ) : (
        <EmptyState selectedDay={day} />
      )}
    </motion.div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

interface ScheduleSectionProps {
  events?: UnifiedEvent[] | null;
}

export function ScheduleSection({ events }: ScheduleSectionProps) {
  console.log('ScheduleSection: Received events prop', events);
  // Use custom hook for state management
  const {
    selectedDay,
    selectedCategories,
    handleDayChange,
    handleToggleCategory,
    eventsByPeriod,
    hasEvents,
  } = useScheduleState(events);

  // Validate events prop
  if (events === undefined || events === null) {
    console.error('ScheduleSection: events prop is undefined or null');
    return <ErrorState message="No events data available" />;
  }

  if (!Array.isArray(events)) {
    console.error('ScheduleSection: events prop is not an array', typeof events);
    return <ErrorState message="Invalid events data format" />;
  }

  return (
    <section className="relative min-h-screen overflow-hidden py-16 md:py-24">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute -right-40 bottom-40 h-96 w-96 rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-12 text-center"
        >
          <h2 className="mt-10 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl mb-4">
            <span className="text-gradient">Event</span>{' '}
            <span className="text-foreground">Schedule</span>
          </h2>
        </motion.div>

        {/* Sticky Tabs & Filters Container */}
        <div className="sticky top-0 z-40 -mx-4 md:-mx-6 px-4 md:px-6 pb-6 pt-4">
          <Tabs
            value={selectedDay}
            onValueChange={handleDayChange}
            className="w-full"
          >
            {/* Day Tabs */}
            <div className="flex justify-center mb-6">
              <TabsList className="h-auto p-0 bg-transparent border-b border-border/50 rounded-none w-full max-w-md">
                {['1', '2'].map((day) => (
                  <TabsTrigger
                    key={day}
                    value={day}
                    className={cn(
                      "relative flex-1 rounded-none border-transparent px-8 py-5",
                      "font-display text-base md:text-lg font-semibold transition-all duration-300",
                      "data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground data-[state=inactive]:hover:border-border",
                      "data-[state=active]:text-primary data-[state=active]:border-primary data-[state=active]:shadow-none",
                      "border-none cursor-pointer"
                    )}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Day {day}
                    </span>

                    {/* Animated underline */}
                    {selectedDay === day && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Category Filters */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex justify-center"
            >
              <EventCategoryFilter
                mode="multi"
                selectedCategories={selectedCategories}
                onToggleCategory={handleToggleCategory}
              />
            </motion.div>

            {/* Tab Content */}
            <div className="mt-8">
              <AnimatePresence mode="wait">
                {['1', '2'].map((day) => (
                  <TabsContent
                    key={day}
                    value={day}
                    className="focus-visible:outline-none data-[state=inactive]:hidden"
                  >
                    <DayTabContent
                      day={day}
                      eventsByPeriod={eventsByPeriod}
                      hasEvents={hasEvents}
                    />
                  </TabsContent>
                ))}
              </AnimatePresence>
            </div>
          </Tabs>
        </div>

        {/* Legend - Below sticky section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-6 text-sm border-t border-border/40 pt-8"
        >
          <span className="text-muted-foreground font-medium uppercase tracking-wider text-xs">
            Categories:
          </span>
          {[
            { color: 'bg-event-seminar', label: 'Seminar/Talk' },
            { color: 'bg-event-competition', label: 'Competition' },
            { color: 'bg-event-cultural', label: 'Cultural' },
            { color: 'bg-event-allday', label: 'All Day' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div className={cn("h-2.5 w-2.5 rounded-full shadow-sm", item.color)} />
              <span className="text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}