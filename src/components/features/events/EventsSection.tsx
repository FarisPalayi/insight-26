import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchX, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { EventCard } from "@/components/features/events";
import {
  type EventCategory,
  getActiveCategories,
  categoryLabels,
  type UnifiedEvent,
} from "@/lib/data/unifiedEvents";
import { EventsSectionHeader } from "@/components/features/events/EventsSectionHeader";
import { FeaturedEventsCarousel } from "./FeaturedEventCarousal";

interface EventsSectionProps {
  events: UnifiedEvent[];
}

export function EventsSection({ events }: EventsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Fix 1: Proper Debounce Implementation
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const isSearching = debouncedSearch.trim().length > 0;

  // Fix 2: Consolidated Filtering Logic
  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      const matchesCategory = selectedCategory === "all" || e.category === selectedCategory;
      const matchesSearch = !debouncedSearch.trim() ||
        e.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        e.venue.toLowerCase().includes(debouncedSearch.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [events, selectedCategory, debouncedSearch]);

  const displayedFeaturedEvents = useMemo(() => {
    const featured = events.filter((e) => e.isFeatured);
    return selectedCategory === "all"
      ? featured
      : featured.filter((e) => e.category === selectedCategory);
  }, [events, selectedCategory]);

  const eventGroups = useMemo(() => {
    if (selectedCategory !== "all") {
      return [{
        id: selectedCategory,
        title: categoryLabels[selectedCategory] + "s",
        events: filteredEvents,
      }];
    }
    return getActiveCategories()
      .map((category) => ({
        id: category,
        title: categoryLabels[category] + "s",
        events: filteredEvents.filter((e) => e.category === category),
      }))
      .filter((g) => g.events.length > 0);
  }, [selectedCategory, filteredEvents]);

  return (
    <div className="min-h-screen bg-background container mx-auto relative">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <EventsSectionHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <Separator className="bg-border/30" />

      <main className="relative py-12 px-4">
        <div className="container mx-auto max-w-7xl">

          {/* FEATURED: Removed entirely from DOM when searching for clean layout */}
          <AnimatePresence>
            {!isSearching && displayedFeaturedEvents.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-16"
              >
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-display font-bold">Featured Events</h2>
                    <p className="text-muted-foreground mt-1">Don't miss these events</p>
                  </div>
                </div>
                <FeaturedEventsCarousel events={displayedFeaturedEvents} />
              </motion.section>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {filteredEvents.length === 0 ? (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <SearchX className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold">No events found</h3>
                <p className="text-muted-foreground mt-2">Try adjusting your filters or search terms.</p>
                <Button variant="outline" className="mt-6" onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}>
                  Reset all filters
                </Button>
              </motion.div>
            ) : isSearching ? (
              /* SEARCH VIEW: Flattened results */
              <motion.div
                key="search-results-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex items-center justify-between mb-8">
                  <p className="text-muted-foreground">
                    Found {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'} for "{debouncedSearch}"
                  </p>
                  <Button variant="ghost" size="sm" onClick={() => setSearchQuery("")}>
                    <X className="w-4 h-4 mr-2" /> Clear
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </motion.div>
            ) : (
              /* DISCOVERY VIEW: Categorized */
              <motion.div
                key="grouped-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {eventGroups.map((group) => (
                  <section key={group.id} className="mb-16 last:mb-0">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl md:text-2xl font-bold">{group.title}</h3>
                      {selectedCategory === "all" && group.events.length > 4 && (
                        <Button variant="ghost" className="text-primary">
                          View All <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {group.events.slice(0, 4).map((event) => (
                        <EventCard key={event.id} event={event} />
                      ))}
                    </div>
                  </section>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}