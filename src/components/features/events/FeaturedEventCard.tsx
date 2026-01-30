import { EventCard } from './EventCard';
import { type EventData } from '@/lib/data/events';

interface FeaturedEventCardProps {
  event: EventData;
  index?: number;
}

export function FeaturedEventCard({ event, index = 0 }: FeaturedEventCardProps) {
  return <EventCard event={event} featured index={index} />;
}
