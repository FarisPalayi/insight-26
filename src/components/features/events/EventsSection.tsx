import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  EventCard,
  FeaturedEventCard,
} from "@/components/features/events";
import {
  type EventCategory,
  getActiveCategories,
  categoryLabels,
  type UnifiedEvent,
} from "@/lib/data/unifiedEvents";
import { EventsSectionHeader } from "@/components/features/events/EventsSectionHeader";

interface EventsSectionProps {
  events: UnifiedEvent[];
}

export function EventsSection({ events }: EventsSectionProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<EventCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { featuredEvents, regularEvents } = useMemo(() => {
    const featured = events.filter((e) => e.isFeatured);
    const regular = events.filter((e) => !e.isFeatured);
    return { featuredEvents: featured, regularEvents: regular };
  }, [events]);

  const filteredEvents = useMemo(() => {
    let filtered = regularEvents;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (e) => e.category === selectedCategory
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (e) =>
          e.name.toLowerCase().includes(query) ||
          e.venue.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [regularEvents, selectedCategory, searchQuery]);

  const eventGroups = useMemo(() => {
    if (selectedCategory !== "all") {
      return [
        {
          id: selectedCategory,
          title: categoryLabels[selectedCategory] + "s",
          events: filteredEvents,
        },
      ];
    }

    return getActiveCategories()
      .map((category) => ({
        id: category,
        title: categoryLabels[category] + "s",
        events: filteredEvents.filter(
          (e) => e.category === category
        ),
      }))
      .filter((g) => g.events.length > 0);
  }, [selectedCategory, filteredEvents]);

  const displayedFeaturedEvents = useMemo(() => {
    return selectedCategory === "all"
      ? featuredEvents
      : featuredEvents.filter(
        (e) => e.category === selectedCategory
      );
  }, [featuredEvents, selectedCategory]);

  return (
    <div className="min-h-screen bg-background container mx-auto">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
      </div>

      {/* Header */}
      <EventsSectionHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <Separator className="bg-border/30" />

      {/* Main Content */}
      <main className="relative py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Featured Events */}
          {displayedFeaturedEvents.length > 0 && (
            <section className="mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-between mb-8"
              >
                <div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                    Featured Events
                  </h2>
                  <p className="text-muted-foreground mt-1">
                    Don't miss these highlight events
                  </p>
                </div>
              </motion.div>

              <div className="space-y-6">
                <AnimatePresence>
                  {displayedFeaturedEvents.map((event, index) => (
                    <FeaturedEventCard
                      key={event.id}
                      event={event}
                      index={index}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </section>
          )}

          {/* Event Groups */}
          <AnimatePresence>
            {eventGroups.map((group) => (
              <motion.section
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="mb-16"
              >
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                      {group.title}
                    </h2>
                    <p className="text-muted-foreground mt-1">
                      {group.events.length} event
                      {group.events.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                  {selectedCategory === "all" &&
                    group.events.length > 4 && (
                      <Button
                        variant="ghost"
                        className="text-primary hover:text-primary/80"
                      >
                        View All
                      </Button>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {group.events.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </motion.section>
            ))}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
