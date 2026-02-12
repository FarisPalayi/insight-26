// src/components/venues/GoogleMapsEmbed.tsx
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Loader2,
  ExternalLink,
  Navigation,
  ChevronDown,
  ChevronUp,
  Maximize2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  CCSIT,
  venueData,
  type VenueData,
  getGoogleMapsViewUrl,
  getGoogleMapsDirectionsUrl,
} from '@/lib/data/venueData';
import { cn } from '@/lib/utils';

interface GoogleMapsEmbedProps {
  selectedVenue: VenueData | null;
  venues?: VenueData[];
  onVenueSelect?: (venueId: string) => void;
}

export function GoogleMapsEmbed({
  selectedVenue,
  venues = venueData,
  onVenueSelect,
}: GoogleMapsEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  // Build map URL with venue markers
  const mapUrl = useMemo(() => {
    const coords = selectedVenue?.coordinates || CCSIT;
    
    return `https://maps.google.com/maps?q=${coords.lat},${coords.lng}&z=17&output=embed`;
  }, [selectedVenue]);

  const handleOpenInMaps = () => {
    if (selectedVenue) {
      window.open(
        getGoogleMapsViewUrl(selectedVenue),
        '_blank',
        'noopener,noreferrer'
      );
    } else {
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${CCSIT.lat},${CCSIT.lng}`,
        '_blank',
        'noopener,noreferrer'
      );
    }
  };

  return (
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded} className="w-full">
      {/* Map Container */}
      <div
        className={cn(
          'relative w-full rounded-xl overflow-hidden bg-muted transition-all duration-300',
          isExpanded ? 'h-[400px] lg:h-[500px]' : 'h-[200px] lg:h-[500px]'
        )}
      >
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

        {/* Map Iframe */}
        <iframe
          key={selectedVenue?.id || 'campus'}
          src={mapUrl}
          className="absolute inset-0 w-full h-full border-0"
          onLoad={() => setIsLoading(false)}
          title="Campus Map"
          loading="lazy"
        />

        {/* Collapsed State Overlay - Shows when map is collapsed (Mobile only) */}
        {!isExpanded && (
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent pointer-events-none lg:hidden z-[5]" />
        )}

        {/* Venue Quick Select Chips */}
        <div className="absolute top-3 left-3 right-3 z-30">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {venues.map((venue) => (
              <button
                key={venue.id}
                onClick={() => onVenueSelect?.(venue.id)}
                className={cn(
                  'shrink-0 px-3 py-1.5 rounded-full text-xs font-medium',
                  'transition-all duration-200 shadow-md backdrop-blur-sm',
                  venue.id === selectedVenue?.id
                    ? 'bg-primary text-primary-foreground scale-105'
                    : 'bg-card/90 text-foreground hover:bg-card'
                )}
              >
                {venue.shortName || venue.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Expand/Collapse Toggle - Mobile Only */}
        <div className="absolute bottom-3 left-3 z-40 lg:hidden">
          <CollapsibleTrigger asChild>
            <Button
              variant="secondary"
              size="sm"
              className="gap-2 shadow-lg backdrop-blur-sm bg-card/95 hover:bg-card border-border"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  <span className="text-xs">Collapse</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  <span className="text-xs">Expand</span>
                </>
              )}
            </Button>
          </CollapsibleTrigger>
        </div>

        {/* Selected Venue Overlay */}
        <AnimatePresence mode="wait">
          {selectedVenue && (
            <motion.div
              key={selectedVenue.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className={cn(
                'absolute z-40',
                // Mobile: position based on expanded state
                'bottom-3 left-3 right-3',
                // Desktop: always at bottom-right
                'lg:bottom-3 lg:left-auto lg:right-3 lg:max-w-sm'
              )}
            >
              <div className="bg-card/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border-border">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-sm truncate">
                      {selectedVenue.name}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                      {selectedVenue.directions}
                    </p>
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
                      onClick={() =>
                        window.open(
                          getGoogleMapsDirectionsUrl(selectedVenue),
                          '_blank',
                          'noopener,noreferrer'
                        )
                      }
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
      </div>

      {/* Quick Actions Bar - Shows when collapsed on mobile */}
      <AnimatePresence>
        {!isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-3 flex gap-2 lg:hidden"
          >
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="flex-1 gap-2" size="sm">
                <Maximize2 className="w-4 h-4" />
                View Full Map
              </Button>
            </CollapsibleTrigger>
            <Button
              variant="outline"
              size="sm"
              onClick={handleOpenInMaps}
              className="gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Open
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </Collapsible>
  );
}