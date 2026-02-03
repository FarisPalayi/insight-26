import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  EventCard,
  FeaturedEventCard
} from '@/components/features/events';
import { EventCategoryFilter } from '@/components/features/EventCategoryFilter';
import {
  type EventCategory,
  getActiveCategories,
  categoryLabels,
  type UnifiedEvent,
} from '@/lib/data/unifiedEvents';

interface EventsSectionProps {
  events: UnifiedEvent[];
}

export function EventsSection({ events }: EventsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Get featured and regular events
  const { featuredEvents, regularEvents } = useMemo(() => {
    const featured = events.filter(e => e.isFeatured);
    const regular = events.filter(e => !e.isFeatured);
    return { featuredEvents: featured, regularEvents: regular };
  }, [events]);

  // Filter events based on category and search
  const filteredEvents = useMemo(() => {
    let filtered = regularEvents;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(e => e.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(e =>
        e.name.toLowerCase().includes(query) ||
        e.venue.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [regularEvents, selectedCategory, searchQuery]);

  // Group events by category for display
  const eventGroups = useMemo(() => {
    if (selectedCategory !== 'all') {
      const categoryLabel = categoryLabels[selectedCategory];
      return [{
        id: selectedCategory,
        title: categoryLabel + 's',
        events: filteredEvents
      }];
    }

    const categories = getActiveCategories();
    return categories
      .map(category => {
        const categoryEvents = filteredEvents.filter(e => e.category === category);
        return {
          id: category,
          title: categoryLabels[category] + 's',
          events: categoryEvents
        };
      })
      .filter(g => g.events.length > 0);
  }, [selectedCategory, filteredEvents]);

  // Filter featured events by category
  const displayedFeaturedEvents = useMemo(() => {
    return selectedCategory === 'all'
      ? featuredEvents
      : featuredEvents.filter(e => e.category === selectedCategory);
  }, [featuredEvents, selectedCategory]);

  return (
    <div className="min-h-screen bg-background container mx-auto">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
      </div>

      {/* Header Section */}
      <header className="relative pt-12 pb-8 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
              <span className="text-gradient">Explore</span>{' '}
              <span className="text-foreground">Events</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover competitions, seminars, and cultural events. Find your passion and register today.
            </p>
          </motion.div>

          {/* Search & Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Search */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search events, venues..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="text-foreground pl-12 h-12 bg-card/60 border-border/50 rounded-xl focus:border-primary/50 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Category Filter */}
            <EventCategoryFilter
              mode="single"
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </motion.div>
        </div>
      </header>

      <Separator className="bg-border/30" />

      {/* Main Content */}
      <main className="relative py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Featured Events Section */}
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
                  <p className="text-muted-foreground mt-1">Don't miss these highlight events</p>
                </div>
              </motion.div>

              <div className="space-y-6">
                <AnimatePresence>
                  {displayedFeaturedEvents.map((event, index) => (
                    <FeaturedEventCard key={event.id} event={event} index={index} />
                  ))}
                </AnimatePresence>
              </div>
            </section>
          )}

          {/* All Events by Category */}
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
                      {group.events.length} event{group.events.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  {selectedCategory === 'all' && group.events.length > 4 && (
                    <Button variant="ghost" className="text-primary hover:text-primary/80">
                      View All <ArrowRight className="w-4 h-4 ml-2" />
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

          {/* Empty State */}
          {filteredEvents.length === 0 && displayedFeaturedEvents.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No events found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
