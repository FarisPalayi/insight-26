// src/components/venues/VenueCard.tsx
import { MapPin, Navigation, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { type VenueData, getGoogleMapsDirectionsUrl } from '@/lib/data/venueData';
import type { UnifiedEvent } from '@/lib/data/unifiedEvents';
import { cn } from '@/lib/utils';

interface VenueCardProps {
  venue: VenueData;
  events: UnifiedEvent[];
  isSelected: boolean;
  onClick: () => void;
}

export function VenueCard({
  venue,
  events,
  isSelected,
  onClick,
}: VenueCardProps) {
  const handleDirectionsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(
      getGoogleMapsDirectionsUrl(venue),
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <Card
      className={cn(
        'cursor-pointer transition-all duration-200 hover:shadow-md active:scale-[0.98] py-0',
        isSelected && 'ring-2 ring-primary border-primary shadow-md'
      )}
      onClick={onClick}
    >
      <CardContent className="p-3 flex gap-3 items-center">
        {/* Thumbnail */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0 bg-muted">
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
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold text-sm sm:text-base truncate text-foreground">
              {venue.name}
            </h3>
            {events.length > 0 && (
              <Badge
                variant="secondary"
                className="text-[10px] px-1.5 py-0 shrink-0 gap-1"
              >
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

        {/* Quick Directions Button (desktop only) */}
        <Button
          variant="ghost"
          size="icon"
          className="hidden sm:flex shrink-0 h-9 w-9"
          onClick={handleDirectionsClick}
          title="Get Directions"
        >
          <Navigation className="w-4 h-4" />
        </Button>
      </CardContent>
    </Card>
  );
}