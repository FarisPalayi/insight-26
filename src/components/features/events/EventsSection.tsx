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

export function EventsSection({ events = [] }: EventsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const isSearching = debouncedSearch.trim().length > 0;

  // 1. Unified Filter Logic (Handles "All Day" and Null Safeties)
  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      const categoryMatch = selectedCategory === "all" || e.category === selectedCategory;
      
      const query = debouncedSearch.toLowerCase().trim();
      const searchMatch = !query || 
        e.name.toLowerCase().includes(query) || 
        (e.venue?.toLowerCase() ?? "").includes(query) ||
        (e.description?.toLowerCase() ?? "").includes(query);

      return categoryMatch && searchMatch;
    });
  }, [events, selectedCategory, debouncedSearch]);

  const featuredEvents = useMemo(() => {
    const featured = events.filter((e) => e.isFeatured);
    return selectedCategory === "all" 
      ? featured 
      : featured.filter(e => e.category === selectedCategory);
  }, [events, selectedCategory]);

  const eventGroups = useMemo(() => {
    if (selectedCategory !== "all") {
      return [{ id: selectedCategory, title: categoryLabels[selectedCategory] + "s", events: filteredEvents }];
    }
    return getActiveCategories(events)
      .map(cat => ({
        id: cat,
        title: categoryLabels[cat] + "s",
        events: filteredEvents.filter(e => e.category === cat)
      }))
      .filter(g => g.events.length > 0);
  }, [selectedCategory, filteredEvents, events]);

  return (
    <div className="min-h-screen bg-background container mx-auto pb-20">
      <EventsSectionHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      
      <Separator className="bg-border/30" />

      <main className="relative py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          
          {/* Featured Section - Only show when NOT searching */}
          <AnimatePresence>
            {!isSearching && featuredEvents.length > 0 && (
              <motion.section 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-16 overflow-hidden"
              >
                <h2 className="text-2xl font-bold mb-6">Featured Events</h2>
                <FeaturedEventsCarousel events={featuredEvents} />
              </motion.section>
            )}
          </AnimatePresence>

          {/* Search Feedback Header */}
          {isSearching && (
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-sm sm:text-lg text-muted-foreground">
                Showing {filteredEvents.length} results for "{debouncedSearch}"
              </h2>
              <Button variant="ghost" size="sm" onClick={() => setSearchQuery("")}>
                <X className="mr-2 h-4 w-4" /> Clear Search
              </Button>
            </div>
          )}

          <AnimatePresence mode="wait">
            {filteredEvents.length === 0 ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <SearchX className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No events found</h3>
                <Button variant="link" onClick={() => {setSearchQuery(""); setSelectedCategory("all")}}>
                  Reset filters
                </Button>
              </motion.div>
            ) : (
              <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {isSearching ? (
                  /* Results List View */
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredEvents.map((event, i) => (
                      <EventCard key={`search-${event.id}`} event={event} index={i}/>
                    ))}
                  </div>
                ) : (
                  /* Discovery Grouped View */
                  eventGroups.map(group => (
                    <section key={group.id} className="mb-12">
                      <div className="flex justify-between items-end mb-6">
                        <h3 className="text-2xl font-bold uppercase tracking-tight">{group.title}</h3>
                        <Button variant="ghost" size="sm" className="text-primary group">
                          Explore <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {group.events.map((event, i) => (
                          <EventCard key={`group-${group.id}-${event.id}`} event={event} index={i} />
                        ))}
                      </div>
                    </section>
                  ))
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}