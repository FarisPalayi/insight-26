import {
  Navigation,
  ExternalLink,
  MapPin,
  ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  type VenueData,
  getGoogleMapsDirectionsUrl,
  getGoogleMapsViewUrl,
} from '@/lib/data/venueData';
import type { UnifiedEvent } from '@/lib/data/unifiedEvents';
import { categoryLabels } from '@/lib/data/unifiedEvents';

interface VenueBottomSheetProps {
  venue: VenueData | null;
  events: UnifiedEvent[];
  onClose: () => void;
}

const categoryColors: Record<string, string> = {
  seminar: 'bg-event-seminar/20 text-event-seminar',
  competition: 'bg-event-competition/20 text-event-competition',
  cultural: 'bg-event-cultural/20 text-event-cultural',
  allday: 'bg-event-allday/20 text-event-allday',
  inauguration: 'bg-event-inauguration/20 text-event-inauguration',
};

export function VenueBottomSheet({
  venue,
  events,
  onClose,
}: VenueBottomSheetProps) {
  return (
    <Drawer open={!!venue} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="max-h-[85vh]">
        {venue && (
          <>
            {/* Hero Image */}
            {venue.imageUrl && (
              <div className="relative h-40 w-full mx-3 mt-1 rounded-xl overflow-hidden">
                <img
                  src={venue.imageUrl}
                  alt={venue.name}
                  className="w-full h-full object-cover  rounded-xl"
                  onError={(e) => {
                    e.currentTarget.parentElement!.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              </div>
            )}

            {/* Header */}
            <DrawerHeader className="text-left pb-2">
              <DrawerTitle className="text-xl">{venue.name}</DrawerTitle>
              <DrawerDescription className="flex items-start gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-primary/70" />
                {venue.directions}
              </DrawerDescription>
            </DrawerHeader>

            {/* Content */}
            <ScrollArea className="flex-1 px-4">
              <div className="space-y-3 pb-6">
                {/* Primary CTA - Get Directions */}
                <Button
                  size="lg"
                  className="w-full gap-2.5 h-12 text-base font-semibold"
                  onClick={() =>
                    window.open(
                      getGoogleMapsDirectionsUrl(venue),
                      '_blank',
                      'noopener,noreferrer'
                    )
                  }
                >
                  <Navigation className="w-5 h-5" />
                  Get Directions
                </Button>

                {/* Secondary - View on Maps */}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full gap-2 h-9"
                  onClick={() =>
                    window.open(
                      getGoogleMapsViewUrl(venue),
                      '_blank',
                      'noopener,noreferrer'
                    )
                  }
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  View on Google Maps
                </Button>

                {/* Events at this Venue */}
                {events.length > 0 && (
                  <div className="pt-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                      Events here ({events.length})
                    </p>
                    <div className="space-y-1.5">
                      {events.map((event) => (
                        <Link
                          key={event.id}
                          to={`/events/${event.id}`}
                          className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent transition-colors group"
                        >
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            <Badge
                              variant="secondary"
                              className={`${
                                categoryColors[event.category]
                              } text-[10px] px-1.5 py-0.5 shrink-0`}
                            >
                              {categoryLabels[event.category]}
                            </Badge>
                            <span className="text-sm truncate font-medium">
                              {event.name}
                            </span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}