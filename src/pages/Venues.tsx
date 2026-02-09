import { useState, useMemo } from 'react';
import { useLoaderData } from 'react-router';
import { Search, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    GoogleMapsEmbed,
    VenueList,
    VenueBottomSheet,
} from '@/components/features/venues';
import {
    venueData,
    getActiveVenues,
} from '@/lib/data/venueData';
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
                        {/* Header & Search */}
                        <div className="mb-4 space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold tracking-tight">
                                        All Venues
                                    </h2>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        {filteredVenues.length} of {activeVenues.length}{' '}
                                        {activeVenues.length === 1 ? 'venue' : 'venues'}
                                    </p>
                                </div>
                            </div>

                            {/* Search Bar */}
                            {activeVenues.length > 0 && (
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
                            )}
                        </div>

                        {/* Venues Grid */}
                        <VenueList
                            venues={filteredVenues}
                            selectedVenueId={selectedVenueId}
                            eventsByVenue={eventsByVenue}
                            onVenueSelect={setSelectedVenueId}
                        />
                    </section>
                </div>

                {/* Mobile Bottom Sheet */}
                <VenueBottomSheet
                    venue={selectedVenue}
                    events={selectedVenueEvents}
                    onClose={() => setSelectedVenueId(null)}
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
                                {/* Header & Search */}
                                <div className="space-y-4">
                                    <div>
                                        <h2 className="text-2xl font-bold tracking-tight">
                                            All Venues
                                        </h2>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {filteredVenues.length} of {activeVenues.length}{' '}
                                            {activeVenues.length === 1 ? 'venue' : 'venues'}
                                        </p>
                                    </div>

                                    {/* Search Bar */}
                                    {activeVenues.length > 0 && (
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
                                    )}
                                </div>

                                {/* Venues List - Single Column on Desktop */}
                                <div className="space-y-3">
                                    {filteredVenues.length === 0 ? (
                                        <div className="text-center py-12">
                                            <p className="text-muted-foreground">No venues found</p>
                                        </div>
                                    ) : (
                                        filteredVenues.map((venue) => {
                                            const venueEvents = eventsByVenue.get(venue.id) || [];
                                            return (
                                                <div key={venue.id}>
                                                    {/* Using inline card instead of VenueCard for better desktop UX */}
                                                    <button
                                                        onClick={() => setSelectedVenueId(venue.id)}
                                                        className={`
                                                            w-full text-left rounded-xl overflow-hidden transition-all duration-200
                                                            flex gap-3 p-4 items-center
                                                            border hover:shadow-md active:scale-[0.98]
                                                            ${venue.id === selectedVenueId
                                                                ? 'ring-2 ring-primary border-primary shadow-md bg-primary/5'
                                                                : 'bg-card border-border hover:border-primary/30'
                                                            }
                                                       `}
                                                    >
                                                        {/* Thumbnail */}
                                                        <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-muted">
                                                            {venue.imageUrl ? (
                                                                <img
                                                                    src={venue.imageUrl}
                                                                    alt={venue.name}
                                                                    className="w-full h-full object-cover"
                                                                    onError={(e) => {
                                                                        e.currentTarget.style.display = 'none';
                                                                    }}
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center">
                                                                    <MapPin className="w-5 h-5 text-muted-foreground/30" />
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Info */}
                                                        <div className="flex-1 min-w-0 space-y-1.5">
                                                            <div className="flex items-center justify-between gap-2">
                                                                <h3 className="font-semibold text-base truncate">
                                                                    {venue.name}
                                                                </h3>
                                                                {venueEvents.length > 0 && (
                                                                    <span className="text-xs text-muted-foreground shrink-0">
                                                                        {venueEvents.length}{' '}
                                                                        {venueEvents.length === 1 ? 'event' : 'events'}
                                                                    </span>
                                                                )}
                                                            </div>

                                                            <p className="text-sm text-muted-foreground line-clamp-2">
                                                                {venue.directions}
                                                            </p>
                                                        </div>
                                                    </button>
                                                </div>
                                            );
                                        })
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