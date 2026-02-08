import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ExternalLink, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CAMPUS_CENTER, venueData, type Venue, getGoogleMapsViewUrl, getGoogleMapsDirectionsUrl } from '@/data/venueData';

interface GoogleMapsEmbedProps {
    selectedVenue: Venue | null;
    onVenueSelect?: (venueId: string) => void;
}

export function GoogleMapsEmbed({ selectedVenue, onVenueSelect }: GoogleMapsEmbedProps) {
    const [isLoading, setIsLoading] = useState(true);

    // Build map URL with all venue markers
    const mapUrl = useMemo(() => {
        const coords = selectedVenue?.coordinates || CAMPUS_CENTER;
        const zoom = selectedVenue ? 18 : 17;

        // Create markers for all venues
        const markers = venueData
            .map((v, i) => `markers=color:${v.id === selectedVenue?.id ? 'red' : 'blue'}%7Clabel:${i + 1}%7C${v.coordinates.lat},${v.coordinates.lng}`)
            .join('&');

        // Use Google Maps Static API style embed (works without API key for basic use)
        // Fallback to OpenStreetMap which is more reliable without keys
        return `https://www.openstreetmap.org/export/embed.html?bbox=${coords.lng - 0.006},${coords.lat - 0.004},${coords.lng + 0.006},${coords.lat + 0.004}&layer=mapnik&marker=${coords.lat},${coords.lng}`;
    }, [selectedVenue]);

    const handleOpenInMaps = () => {
        if (selectedVenue) {
            window.open(getGoogleMapsViewUrl(selectedVenue), '_blank', 'noopener,noreferrer');
        } else {
            window.open(`https://www.google.com/maps/search/?api=1&query=${CAMPUS_CENTER.lat},${CAMPUS_CENTER.lng}`, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div className="relative w-full h-full min-h-[300px] rounded-xl overflow-hidden bg-muted">
            {/* Loading State */}
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-10 flex items-center justify-center bg-muted"
                    >
                        <Loader2 className="w-6 h-6 text-muted-foreground animate-spin" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Map */}
            <iframe
                key={selectedVenue?.id || 'campus'}
                src={mapUrl}
                className="absolute inset-0 w-full h-full border-0"
                onLoad={() => setIsLoading(false)}
                title="Campus Map"
                loading="lazy"
            />

            {/* Venue Quick Select Chips - Mobile Friendly */}
            <div className="absolute top-3 left-3 right-3 z-20">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {venueData.map((venue) => (
                        <button
                            key={venue.id}
                            onClick={() => onVenueSelect?.(venue.id)}
                            className={`
                 shrink-0 px-3 py-1.5 rounded-full text-xs font-medium
                 transition-all duration-200 shadow-md backdrop-blur-sm
                 ${venue.id === selectedVenue?.id
                                    ? 'bg-primary text-primary-foreground scale-105'
                                    : 'bg-card/90 text-foreground hover:bg-card'
                                }
               `}
                        >
                            {venue.name.split(' ')[0]}
                        </button>
                    ))}
                </div>
            </div>

            {/* Selected Venue Overlay */}
            <AnimatePresence mode="wait">
                {selectedVenue && (
                    <motion.div
                        key={selectedVenue.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-3 left-3 right-3 z-20"
                    >
                        <div className="bg-card/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border">
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0 flex-1">
                                    <h4 className="font-semibold text-sm truncate">{selectedVenue.name}</h4>
                                    <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{selectedVenue.directions}</p>
                                </div>
                                <div className="flex gap-2 shrink-0">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={handleOpenInMaps}
                                        className="h-9 w-9 p-0"
                                        title="View in Maps"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="default"
                                        onClick={() => window.open(getGoogleMapsDirectionsUrl(selectedVenue), '_blank', 'noopener,noreferrer')}
                                        className="h-9 gap-1.5"
                                    >
                                        <Navigation className="w-4 h-4" />
                                        <span className="hidden sm:inline">Directions</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hint when no venue selected */}
            <AnimatePresence>
                {!selectedVenue && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute bottom-3 left-3 right-3 z-20"
                    >
                        <div className="bg-card/80 backdrop-blur-sm rounded-lg px-3 py-2 text-center">
                            <p className="text-xs text-muted-foreground">Tap a venue above or below to see it on the map</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
