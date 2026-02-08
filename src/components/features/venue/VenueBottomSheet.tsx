import { Navigation, ExternalLink, MapPin, Calendar, ChevronRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { type Venue, getGoogleMapsDirectionsUrl, getGoogleMapsViewUrl } from '@/data/venueData';
import type { UnifiedEvent } from '@/data/unifiedEvents';
import { categoryLabels } from '@/data/unifiedEvents';

interface VenueBottomSheetProps {
  venue: Venue | null;
  events: UnifiedEvent[];
  onClose: () => void;
}

const categoryColors: Record<string, string> = {
  seminar: 'bg-event-seminar/20 text-event-seminar',
  competition: 'bg-event-competition/20 text-event-competition',
  cultural: 'bg-event-cultural/20 text-event-cultural',
  allday: 'bg-event-allday/20 text-event-allday',
};

export function VenueBottomSheet({ venue, events, onClose }: VenueBottomSheetProps) {
  if (!venue) return null;

  return (
    <AnimatePresence>
      {venue && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 lg:hidden"
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 lg:hidden max-h-[85vh] flex flex-col rounded-t-2xl border-t bg-card overflow-hidden safe-area-inset-bottom"
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-muted hover:bg-muted/80 transition-colors z-10"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Hero section with image */}
              {venue.imageUrl && (
                <div className="relative h-36 mx-3 mt-1 rounded-xl overflow-hidden">
                  <img
                    src={venue.imageUrl}
                    alt={venue.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
              )}

              <div className="px-4 pt-3 pb-2 space-y-3">
                {/* Venue name & directions */}
                <div>
                  <h3 className="text-lg font-bold text-foreground">{venue.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-start gap-1.5 mt-1">
                    <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-primary/70" />
                    {venue.directions}
                  </p>
                </div>

                {/* PRIMARY CTA - Get Directions */}
                <Button
                  size="lg"
                  className="w-full gap-2.5 h-12 text-base font-semibold btn-glow"
                  onClick={() => window.open(getGoogleMapsDirectionsUrl(venue), '_blank', 'noopener,noreferrer')}
                >
                  <Navigation className="w-5 h-5" />
                  Get Directions
                </Button>

                {/* Secondary: View on Maps */}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full gap-2 h-9"
                  onClick={() => window.open(getGoogleMapsViewUrl(venue), '_blank', 'noopener,noreferrer')}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  View on Google Maps
                </Button>

                {/* Events at this venue */}
                {events.length > 0 && (
                  <div className="pt-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                      Events here
                    </p>
                    <div className="space-y-1">
                      {events.map((event) => (
                        <Link
                          key={event.id}
                          to={`/events/${event.id}`}
                          className="flex items-center justify-between p-2.5 rounded-lg bg-secondary/40 hover:bg-secondary/70 active:bg-secondary transition-colors"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <Badge
                              variant="secondary"
                              className={`${categoryColors[event.category]} text-[10px] px-1.5 py-0 shrink-0`}
                            >
                              {categoryLabels[event.category]}
                            </Badge>
                            <span className="text-sm truncate font-medium">{event.name}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
