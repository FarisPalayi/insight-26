// ============================================
// UNIFIED EVENTS DATA - Single Source of Truth
// ============================================

// ================== TYPES ==================

export type EventCategory = 'competition' | 'cultural' | 'allday' | 'inauguration';
export type TeamSize = 'solo' | '2' | '4' | '5' | '2-5' | 'any';
export type EventDay = '1' | '2' | 'both';

export interface EventPrizes {
  first?: string;
  second?: string;
  third?: string;
  jackpotPrize?: string;
}

export interface EventCoordinator {
  name: string;
  phone?: string;
}

export interface EventSchedule {
  day: EventDay;
  startTime: string; // 24h format "HH:MM"
  endTime: string;   // 24h format "HH:MM"
  displayTime: string; // Human readable "09:30 AM - 11:00 AM"
}

export interface UnifiedEvent {
  // Core Identity
  id: string;
  name: string;
  fancyName?: string; // TODO: implement this
  tagline: string;
  description: string;
  category: EventCategory;

  // Schedule
  schedule: EventSchedule;

  // Location
  venue: VenueId | string; // Allow custom venue names for flexibility

  // Participation
  teamSize: TeamSize;
  entryFee: string;
  spotRegistration?: boolean;

  // Visual
  imageUrl: string;

  // Flags
  isFeatured?: boolean;
  isAllDay?: boolean;
  isMultiPeriod?: boolean; // Spans multiple time periods

  // Prizes
  prizePool?: string;
  prizes?: EventPrizes;

  // Contact
  coordinators?: EventCoordinator[];

  // Registration
  registrationLink?: string;
  registrationDeadline?: string; // ISO date string
  isFree?: boolean;

  // Other infos
  rulesAndGuidelines?: string[],
  eligibility?: string[],
  whatToBring?: string[]
  speaker?: string; // for seminars 
}

export interface TimelineOverview {
  id: string;
  name: string;
  displayTime: string;
  venue: VenueId | string;
}
// ================== LABELS ==================

export const categoryLabels: Record<EventCategory, string> = {
  competition: 'Competition',
  cultural: 'Cultural',
  allday: 'All Day',
  inauguration: 'Inauguration',
};

export const teamSizeLabels: Record<TeamSize, string> = {
  solo: 'Solo',
  '2': '2 Members',
  '4': '4 Members',
  '5': '5 Members',
  '2-5': '2-5 Members',
  any: 'Any Size',
};

export const dayLabels: Record<EventDay, string> = {
  1: 'Day 1',
  2: 'Day 2',
  both: 'Both Days',
};

// ================== TIME PERIODS ==================

export const timePeriods = {
  morning: { start: '09:00', end: '12:00', label: 'Morning (9 AM - 12 PM)' },
  afternoon: { start: '12:00', end: '17:00', label: 'Afternoon (12 PM - 5 PM)' },
  evening: { start: '17:00', end: '23:59', label: 'Evening (5 PM onwards)' },
} as const;

export type TimePeriod = keyof typeof timePeriods;

// ================== VENUES ==================

export interface VenueData {
  id: string;
  name: string;
  shortName: string;
  directions: string; // "Near Main Entrance, Ground Floor"
  coordinates: {
    lat: number;
    lng: number;
  };
  imageUrl?: string;  // Optional venue photo
}

export const venues: VenueData[] = [
  {
    id: 'aryabhatta',
    name: 'Aryabhatta Hall',
    shortName: 'ARYABHATTA',
    directions: 'Near Main Entrance, Ground Floor',
    coordinates: { lat: 11.0203, lng: 75.9364 },
    imageUrl: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=800&q=80'
  },
  {
    id: 'ems',
    name: 'EMS Hall',
    shortName: 'EMS',
    directions: 'Near Main Building, 2nd Floor',
    coordinates: { lat: 11.0205, lng: 75.9366 },
    imageUrl: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=800&q=80'
  },
  {
    id: 'ems-electron',
    name: 'EMS Hall - Electron',
    shortName: 'EMS HALL',
    directions: 'Near Main Building, 2nd Floor',
    coordinates: { lat: 11.0207, lng: 75.9368 },
    imageUrl: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=800&q=80'
  },
  {
    id: 'ccsit',
    name: 'CCSIT CU Campus',
    shortName: 'CCSIT',
    directions: 'Near Main Building, 2nd Floor',
    coordinates: { lat: 11.0209, lng: 75.9370 },
    imageUrl: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=800&q=80'
  },
  {
    id: 'ccsit-lab',
    name: 'CCSIT Computer Lab',
    shortName: 'CCSIT LAB',
    directions: 'Near Main Building, 2nd Floor',
    coordinates: { lat: 11.0211, lng: 75.9372 },
    imageUrl: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=800&q=80'
  },
  {
    id: 'ccsit-seminar',
    name: 'CCSIT Seminar Hall',
    shortName: 'CCSIT SEMINAR',
    directions: 'Near Main Building, 2nd Floor',
    coordinates: { lat: 11.0213, lng: 75.9374 },
    imageUrl: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=800&q=80'
  },
  {
    id: 'trap',
    name: 'Student TRAP',
    shortName: 'STUDENT TRAP',
    directions: 'Near Main Building, 2nd Floor',
    coordinates: { lat: 11.0215, lng: 75.9376 },
    imageUrl: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=800&q=80'
  },
  {
    id: 'main-stage',
    name: 'Silver Jubilee Auditorium',
    shortName: 'MAIN STAGE',
    directions: 'Near Main Entrance, Ground Floor',
    coordinates: { lat: 11.0217, lng: 75.9378 },
    imageUrl: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=800&q=80'
  },
  {
    id: 'campus',
    name: 'Campus Wide',
    shortName: 'CAMPUS',
    directions: 'Throughout the Campus',
    coordinates: { lat: 11.0219, lng: 75.9380 },
    imageUrl: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=800&q=80'
  },
] as const;

// Strict VenueId type
export type VenueId = typeof venues[number]["id"];

// O(1) lookup map
export const venueMap: Record<VenueId, (typeof venues)[number]> =
  Object.fromEntries(venues.map(v => [v.id, v])) as Record<
    VenueId,
    (typeof venues)[number]
  >;

// Helper functions to get venue details

export function getVenueName(id: VenueId) {
  return venueMap[id].name;
}

export function getVenueShortName(id: VenueId) {
  return venueMap[id].shortName;
}

// Helper to get venues used in events
export function getActiveVenues(events: UnifiedEvent[]): VenueData[] {
  const activeVenueIds = new Set(events.map(e => e.venue));
  return venues.filter(v => activeVenueIds.has(v.id));
}

/** Get all events for a specific day */
export function getEventsByDay(day: EventDay, events: UnifiedEvent[]): UnifiedEvent[] {
  return events.filter(
    (event) => event.schedule.day === day || event.schedule.day === 'both'
  );
}

/** Get events by category */
export function getEventsByCategory(category: EventCategory, events: UnifiedEvent[]): UnifiedEvent[] {
  return events.filter((event) => event.category === category);
}

/** Get featured events */
export function getFeaturedEvents(events: UnifiedEvent[]): UnifiedEvent[] {
  return events.filter((event) => event.isFeatured);
}

/** Get all-day events for a specific day */
export function getAllDayEvents(day: EventDay, events: UnifiedEvent[]): UnifiedEvent[] {
  return events?.filter(
    (event) =>
      event.isAllDay &&
      (event.schedule.day === day || event.schedule.day === 'both')
  );
}

/** Get scheduled (non all-day) events for a specific day */
export function getScheduledEvents(day: EventDay, events: UnifiedEvent[]): UnifiedEvent[] {
  return events
    ?.filter(
      (event) =>
        !event.isAllDay &&
        (event.schedule.day === day || event.schedule.day === 'both')
    )
    .sort((a, b) => a.schedule.startTime.localeCompare(b.schedule.startTime));
}

/** Check if an event falls within a time period */
export function eventFallsInPeriod(
  event: UnifiedEvent,
  periodStart: string,
  periodEnd: string
): boolean {
  const { startTime, endTime } = event.schedule;
  return startTime < periodEnd && endTime > periodStart;
}

/** Get events grouped by time period for a specific day */
export function getEventsByTimePeriod(day: '1' | '2', events: UnifiedEvent[]) {
  const scheduled = getScheduledEvents(day, events);

  return {
    morning: scheduled.filter((e) =>
      eventFallsInPeriod(e, timePeriods.morning.start, timePeriods.morning.end)
    ),
    afternoon: scheduled.filter((e) =>
      eventFallsInPeriod(e, timePeriods.afternoon.start, timePeriods.afternoon.end)
    ),
    evening: scheduled.filter((e) =>
      eventFallsInPeriod(e, timePeriods.evening.start, timePeriods.evening.end)
    ),
  };
}

/** Get unique categories that have events */
export function getActiveCategories(events: UnifiedEvent[]): EventCategory[] {
  const categories = new Set(events.map((e) => e.category));
  return Array.from(categories);
}
