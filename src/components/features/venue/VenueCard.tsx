import { motion } from 'framer-motion';
import { MapPin, Navigation, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { type Venue, getGoogleMapsDirectionsUrl } from '@/data/venueData';
import type { UnifiedEvent } from '@/data/unifiedEvents';

interface VenueCardProps {
  venue: Venue;
  events: UnifiedEvent[];
  isSelected: boolean;
  onClick: () => void;
}

export function VenueCard({ venue, events, isSelected, onClick }: VenueCardProps) {
  return (
    <motion.button
      layout
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`
        w-full text-left rounded-xl overflow-hidden transition-all duration-200
        flex gap-3 p-3 items-center
        border active:scale-[0.98]
        ${isSelected
          ? 'ring-2 ring-primary bg-primary/5 border-primary/30'
          : 'bg-card border-border hover:border-primary/30 hover:bg-card/80'
        }
      `}
    >
      {/* Thumbnail */}
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0 bg-muted">
        {venue.imageUrl ? (
          <img
            src={venue.imageUrl}
            alt={venue.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <MapPin className="w-5 h-5 text-muted-foreground/30" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold text-sm sm:text-base truncate text-foreground">
            {venue.name}
          </h3>
          {events.length > 0 && (
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 shrink-0 gap-1">
              <Calendar className="w-2.5 h-2.5" />
              {events.length}
            </Badge>
          )}
        </div>

        <p className="text-xs sm:text-sm text-muted-foreground truncate flex items-center gap-1">
          <MapPin className="w-3 h-3 shrink-0 text-primary/60" />
          {venue.directions}
        </p>
      </div>

      {/* Quick Directions (desktop only) */}
      <div
        className="hidden sm:flex shrink-0"
        onClick={(e) => {
          e.stopPropagation();
          window.open(getGoogleMapsDirectionsUrl(venue), '_blank', 'noopener,noreferrer');
        }}
      >
        <div className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer" title="Get Directions">
          <Navigation className="w-4 h-4 text-primary" />
        </div>
      </div>
    </motion.button>
  );
}
