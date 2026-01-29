import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Sparkles } from 'lucide-react';
import { scheduleData, type EventCategory, type ScheduleEvent, eventFallsInPeriod } from '@/lib/data/schedule';
import { EventCard } from './EventCard';
import { AllDayBanner } from './AllDayBanner';
import { CategoryFilter } from './CategoryFilter';
import { DayTabs } from './DayTabs';

interface TimePeriod {
  id: string;
  label: string;
  timeLabel: string;
  start: string;
  end: string;
  icon: string;
}

const periods: TimePeriod[] = [
  { id: 'morning', label: 'Morning', timeLabel: '9:00 AM - 12:00 PM', start: '09:00', end: '12:00', icon: '🌅' },
  { id: 'afternoon', label: 'Afternoon', timeLabel: '12:00 PM - 5:00 PM', start: '12:00', end: '17:00', icon: '☀️' },
  { id: 'evening', label: 'Evening', timeLabel: '5:00 PM onwards', start: '17:00', end: '23:59', icon: '🌙' },
];

export function ScheduleSection() {
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<EventCategory[]>([]);

  const currentDayData = scheduleData.find((d) => d.day === selectedDay);

  const filteredEvents = useMemo(() => {
    if (!currentDayData) return [];
    if (selectedCategories.length === 0) return currentDayData.events;
    return currentDayData.events.filter((event) =>
      selectedCategories.includes(event.category)
    );
  }, [currentDayData, selectedCategories]);

  const filteredAllDayEvents = useMemo(() => {
    if (!currentDayData) return [];
    if (selectedCategories.length === 0) return currentDayData.allDayEvents;
    return currentDayData.allDayEvents.filter((event) =>
      selectedCategories.includes(event.category)
    );
  }, [currentDayData, selectedCategories]);

  const handleToggleCategory = (category: EventCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Group events by time period - events can appear in multiple periods if they span across them
  const eventsByPeriod = useMemo(() => {
    const grouped: Record<string, ScheduleEvent[]> = {};

    periods.forEach((period) => {
      grouped[period.id] = filteredEvents.filter((event) =>
        eventFallsInPeriod(event, period.start, period.end)
      );
    });

    return grouped;
  }, [filteredEvents]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-background py-16 md:py-24">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 grid-pattern opacity-50" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

        {/* Gradient orbs */}
        <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute -right-40 bottom-40 h-96 w-96 rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16 text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Insight'26</span>
          </div>
          <h2 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl mb-4">
            <span className="text-gradient">Event</span>{' '}
            <span className="text-foreground">Schedule</span>
          </h2>
        </motion.div>

        {/* Day Tabs */}
        <DayTabs selectedDay={selectedDay} onSelectDay={setSelectedDay} />

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CategoryFilter
            selectedCategories={selectedCategories}
            onToggleCategory={handleToggleCategory}
          />
        </motion.div>

        {/* All Day Events Banner */}
        <AllDayBanner events={filteredAllDayEvents} />

        {/* Events by Time Period */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDay}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-10"
          >
            {periods.map((period, periodIndex) => {
              const periodEvents = eventsByPeriod[period.id] || [];
              if (periodEvents.length === 0) return null;

              return (
                <div key={period.id} className="relative">
                  {/* Period Header */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: periodIndex * 0.1 }}
                    className="mb-6 flex items-center gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-card border border-border shadow-lg">
                        <span className="text-xl">{period.icon}</span>
                      </div>
                      <div>
                        <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground">
                          {period.label}
                        </h3>
                      </div>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-border via-border/50 to-transparent" />
                  </motion.div>

                  {/* Events Grid */}
                  <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {periodEvents.map((event, index) => (
                      <EventCard
                        key={`${period.id}-${event.id}`}
                        event={event}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Empty State */}
            {filteredEvents.length === 0 && filteredAllDayEvents.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-muted/50 border border-border mb-6">
                  <Calendar className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  No events found
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Try adjusting your filters to see more events
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-6 text-sm"
        >
          <span className="text-muted-foreground">Categories:</span>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-event-seminar" />
            <span className="text-muted-foreground">Seminar/Talk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-event-competition" />
            <span className="text-muted-foreground">Competition</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-event-cultural" />
            <span className="text-muted-foreground">Cultural</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-event-allday" />
            <span className="text-muted-foreground">All Day</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
