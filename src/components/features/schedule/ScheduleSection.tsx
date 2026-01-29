"use client";

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { scheduleData, type EventCategory, type ScheduleEvent, eventFallsInPeriod } from '@/lib/data/schedule';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventCard } from './EventCard';
import { AllDayBanner } from './AllDayBanner';
import { CategoryFilter } from './CategoryFilter';

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
  const [selectedDay, setSelectedDay] = useState("1");
  const [selectedCategories, setSelectedCategories] = useState<EventCategory[]>([]);

  const currentDayData = useMemo(() =>
    scheduleData.find((d) => d.day === parseInt(selectedDay)),
    [selectedDay]
  );

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

  const eventsByPeriod = useMemo(() => {
    const grouped: Record<string, ScheduleEvent[]> = {};
    const usedEventIds = new Set<string>();

    periods.forEach((period) => {
      grouped[period.id] = filteredEvents.filter((event) => {
        // Skip if already assigned to an earlier period
        if (usedEventIds.has(event.id)) return false;

        // Check if event starts in this period
        const eventStartsInPeriod = eventFallsInPeriod(event, period.start, period.end);

        if (eventStartsInPeriod) {
          usedEventIds.add(event.id);
          return true;
        }
        return false;
      });
    });
    return grouped;
  }, [filteredEvents]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-background py-16 md:py-24">
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
        <div className="sticky top-0 z-40 -mx-4 md:-mx-6 px-4 md:px-6 pb-6 pt-4 bg-background/80 backdrop-blur-xl border-b border-border/40 shadow-sm">
          <Tabs
            value={selectedDay}
            onValueChange={setSelectedDay}
            className="w-full"
          >
            {/* Line Variant Tabs */}
            <div className="flex justify-center mb-6">
              <TabsList className="h-auto p-0 bg-transparent border-b border-border/50 rounded-none w-full max-w-md">
                {[1, 2].map((day) => (
                  <TabsTrigger
                    key={day}
                    value={day.toString()}
                    className={cn(
                      "relative flex-1 rounded-none border-b-2 border-transparent px-8 py-4",
                      "font-display text-base md:text-lg font-semibold transition-all duration-300",
                      "data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground data-[state=inactive]:hover:border-border",
                      "data-[state=active]:text-primary data-[state=active]:border-primary data-[state=active]:shadow-none",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    )}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Day {day}
                    </span>

                    {/* Animated underline */}
                    {selectedDay === day.toString() && (
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
              <CategoryFilter
                selectedCategories={selectedCategories}
                onToggleCategory={handleToggleCategory}
              />
            </motion.div>

            {/* All Day Events Banner (sticky with tabs) */}
            {filteredAllDayEvents.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mt-6"
              >
                <AllDayBanner events={filteredAllDayEvents} />
              </motion.div>
            )}

            {/* Tab Content */}
            <div className="mt-8">
              <AnimatePresence mode="wait">
                {[1, 2].map((day) => (
                  <TabsContent
                    key={day}
                    value={day.toString()}
                    className="focus-visible:outline-none data-[state=inactive]:hidden"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-12"
                    >
                      {periods.map((period, periodIndex) => {
                        const periodEvents = eventsByPeriod[period.id] || [];
                        if (periodEvents.length === 0) return null;

                        return (
                          <div key={period.id} className="relative">
                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: periodIndex * 0.08 }}
                              className="mb-6 flex items-center gap-4"
                            >
                              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-card to-card/80 border border-border shadow-md">
                                <span className="text-2xl">{period.icon}</span>
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
                              {periodEvents.map((event, index) => (
                                <EventCard
                                  key={`${selectedDay}-${period.id}-${event.id}`}
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
                      )}
                    </motion.div>
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
