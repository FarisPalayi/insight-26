import { useState, useMemo, useCallback } from 'react';
import { useLoaderData } from 'react-router';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  GoogleMapsEmbed,
  VenueList,
  VenueBottomSheet,
  VenueCard,
} from '@/components/features/venues';
import { venueData, getActiveVenues } from '@/lib/data/venueData';
import { type UnifiedEvent } from '@/lib/data/unifiedEvents';

export function VenuesPage() {
  const { events } = useLoaderData() as { events: UnifiedEvent[] };
  const [selectedVenueId, setSelectedVenueId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Get all active venues (venues with events)
  const activeVenues = useMemo(() => {
    const venueIds = events.map((e) => e.venue);
    return getActiveVenues(venueIds);
  }, [events]);

  // Count events per venue (lighter than storing full event arrays)
  const eventCountByVenue = useMemo(() => {
    const counts = new Map<string, number>();
    venueData.forEach((venue) => counts.set(venue.id, 0));
    events.forEach((event) => {
      counts.set(event.venue, (counts.get(event.venue) || 0) + 1);
    });
    return counts;
  }, [events]);

  // Get events for selected venue (only when needed)
  const selectedVenueEvents = useMemo(() => {
    if (!selectedVenueId) return [];
    return events.filter((event) => event.venue === selectedVenueId);
  }, [selectedVenueId, events]);

  // Filter venues based on search
  const filteredVenues = useMemo(() => {
    if (!searchQuery.trim()) return activeVenues;

    const query = searchQuery.toLowerCase();
    return activeVenues.filter(
      (venue) =>
        venue.name.toLowerCase().includes(query) ||
        venue.directions.toLowerCase().includes(query) ||
        venue.shortName.toLowerCase().includes(query)
    );
  }, [activeVenues, searchQuery]);

  // Get selected venue data
  const selectedVenue = useMemo(
    () => (selectedVenueId ? venueData.find((v) => v.id === selectedVenueId) || null : null),
    [selectedVenueId]
  );

  // Handlers
  const handleCloseVenueSheet = useCallback(() => {
    setSelectedVenueId(null);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  // ============================================
  // REUSABLE COMPONENTS
  // ============================================

  const VenueListHeader = () => (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">All Venues</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {filteredVenues.length} of {activeVenues.length}{' '}
          {activeVenues.length === 1 ? 'venue' : 'venues'}
        </p>
      </div>

      {/* Search Bar */}
      {activeVenues.length > 0 && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            type="text"
            placeholder="Search venues..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-9"
          />
        </div>
      )}
    </div>
  );

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <h2 className="text-center mt-10 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl mb-4">
        <span className="text-gradient">Event</span>{' '}
        <span className="text-foreground">Venues</span>
      </h2>

      {/* Mobile Layout - Stacked */}
      <main className="lg:hidden">
        <div className="container py-6 space-y-6 px-4 mx-auto">
          {/* Map Section */}
          <section className="w-full" aria-label="Interactive venue map">
            <GoogleMapsEmbed
              selectedVenue={selectedVenue}
              venues={filteredVenues}
              onVenueSelect={setSelectedVenueId}
            />
          </section>

          <Separator />

          {/* Venues List Section */}
          <section aria-label="Venue list">
            <div className="mb-4">
              <VenueListHeader />
            </div>

            <VenueList
              venues={filteredVenues}
              selectedVenueId={selectedVenueId}
              eventsByVenue={eventCountByVenue}
              onVenueSelect={setSelectedVenueId}
            />
          </section>
        </div>

        {/* Mobile Bottom Sheet */}
        <VenueBottomSheet
          venue={selectedVenue}
          events={selectedVenueEvents}
          onClose={handleCloseVenueSheet}
        />
      </main>

      {/* Desktop Layout - Side by Side */}
      <main className="hidden lg:block h-[calc(100vh-3.5rem)]">
        <div className="grid grid-cols-2 h-full">
          {/* Left: Map */}
          <section className="relative" aria-label="Interactive venue map">
            <div className="sticky top-14 h-[calc(100vh-3.5rem)] p-6">
              <GoogleMapsEmbed
                selectedVenue={selectedVenue}
                venues={filteredVenues}
                onVenueSelect={setSelectedVenueId}
              />
            </div>
          </section>

          {/* Right: Venues List */}
          <section aria-label="Venue list">
            <ScrollArea className="h-[calc(100vh-3.5rem)]">
              <div className="p-6 space-y-6">
                <VenueListHeader />

                {/* Venues List - Single Column on Desktop */}
                <div className="space-y-3">
                  {filteredVenues.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">No venues found</p>
                    </div>
                  ) : (
                    filteredVenues.map((venue) => (
                      <VenueCard
                        key={venue.id}
                        venue={venue}
                        eventCount={eventCountByVenue.get(venue.id) || 0}
                        isSelected={venue.id === selectedVenueId}
                        onClick={() => setSelectedVenueId(venue.id)}
                      />
                    ))
                  )}
                </div>
              </div>
            </ScrollArea>
          </section>
        </div>
      </main>
    </div>
  );
}