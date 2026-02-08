import { VenueCard } from './VenueCard';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { type VenueData } from '@/lib/data/venueData';
import type { UnifiedEvent } from '@/lib/data/unifiedEvents';

interface VenueListProps {
  venues: VenueData[];
  selectedVenueId: string | null;
  eventsByVenue: Map<string, UnifiedEvent[]>;
  onVenueSelect: (venueId: string) => void;
}

export function VenueList({
  venues,
  selectedVenueId,
  eventsByVenue,
  onVenueSelect,
}: VenueListProps) {
  if (venues.length === 0) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No venues found</AlertTitle>
        <AlertDescription>
          Try adjusting your search or check back later for venue updates.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {venues.map((venue) => {
        const venueEvents = eventsByVenue.get(venue.id) || [];

        return (
          <VenueCard
            key={venue.id}
            venue={venue}
            events={venueEvents}
            isSelected={venue.id === selectedVenueId}
            onClick={() => onVenueSelect(venue.id)}
          />
        );
      })}
    </div>
  );
}