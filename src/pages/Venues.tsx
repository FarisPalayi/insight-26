// src/pages/VenuesPage.tsx
import { useState, useMemo } from 'react';
import { useLoaderData } from 'react-router';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
    GoogleMapsEmbed,
    VenueList,
    VenueBottomSheet,
} from '@/components/features/venues';
import { venueData, getActiveVenues } from '@/lib/data/venueData';
import type { UnifiedEvent } from '@/lib/data/unifiedEvents';
import Main from '@/components/layout/Main';


export function VenuesPage() {
    const { events } = useLoaderData() as { events: UnifiedEvent[] };

    const [selectedVenueId, setSelectedVenueId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Get all active venues (venues with events)
    const activeVenues = useMemo(() => {
        const venueIds = events.map((e) => e.venue);
        return getActiveVenues(venueIds);
    }, [events]);

    // Group events by venue
    const eventsByVenue = useMemo(() => {
        const grouped = new Map<string, UnifiedEvent[]>();

        // Initialize all venues
        venueData.forEach((venue) => {
            grouped.set(venue.id, []);
        });

        // Group events
        events.forEach((event) => {
            const venueEvents = grouped.get(event.venue);
            if (venueEvents) {
                venueEvents.push(event);
            }
        });

        return grouped;
    }, [events]);

    console.log('Active Venues:', activeVenues);

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

    // Get selected venue
    const selectedVenue = useMemo(
        () => venueData.find((v) => v.id === selectedVenueId) || null,
        [selectedVenueId]
    );

    // Get events for selected venue
    const selectedVenueEvents = useMemo(
        () => (selectedVenueId ? eventsByVenue.get(selectedVenueId) || [] : []),
        [selectedVenueId, eventsByVenue]
    );

    // ============================================
    // RENDER
    // ============================================

    return (
        <div className="min-h-screen bg-background pt-26 px-5">
            {/* Header */}
            <h2 className="text-center mt-10 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl mb-4">
                <span className="text-gradient">Event</span>{' '}
                <span className="text-foreground">Schedule</span>
            </h2>

            <Main className="container py-6 space-y-6">
                {/* Map Section */}
                <section className="w-full" aria-label="Interactive venue map">
                    <div className="h-[400px] lg:h-[500px]">
                        <GoogleMapsEmbed
                            selectedVenue={selectedVenue}
                            venues={filteredVenues}
                            onVenueSelect={setSelectedVenueId}
                        />
                    </div>
                </section>

                {/* Venues List Section */}
                <section aria-label="Venue list">
                    {/* Header & Search */}
                    <div className="mb-4 space-y-3 ">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold">All Venues</h2>
                            <p className="text-sm text-muted-foreground">
                                {filteredVenues.length} of {activeVenues.length} shown
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Search venues..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9"
                            />
                        </div>
                    </div>

                    {/* Venues Grid */}
                    <VenueList
                        venues={filteredVenues}
                        selectedVenueId={selectedVenueId}
                        eventsByVenue={eventsByVenue}
                        onVenueSelect={setSelectedVenueId}
                    />
                </section>
            </Main>

            {/* Mobile Bottom Sheet */}
            <VenueBottomSheet
                venue={selectedVenue}
                events={selectedVenueEvents}
                onClose={() => setSelectedVenueId(null)}
            />
        </div>
    );
}
