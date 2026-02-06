// ============================================
// UNIFIED EVENTS DATA - Single Source of Truth
// ============================================

// ================== TYPES ==================

export type EventCategory = 'seminar' | 'competition' | 'cultural' | 'allday';
export type TeamSize = 'solo' | '2-3' | '2-4' | '3-5' | '4-6' | 'any';
export type EventDay = 1 | 2 | 'both';

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
  venue: string;

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

  // Other infos
  rulesAndGuidelines?: string[],
  eligibility?: string[],
  whatToBring?: string[]
}

// ================== LABELS ==================

export const categoryLabels: Record<EventCategory, string> = {
  seminar: 'Seminar',
  competition: 'Competition',
  cultural: 'Cultural',
  allday: 'All Day',
};

export const teamSizeLabels: Record<TeamSize, string> = {
  solo: 'Solo',
  '2-3': '2-3 Members',
  '2-4': '2-4 Members',
  '3-5': '3-5 Members',
  '4-6': '4-6 Members',
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

export const venues = [
  { id: 'aryabhatta', name: 'Aryabhatta Hall', shortName: 'ARYABHATTA', mapLink: "", },
  { id: 'ems', name: 'EMS Hall', shortName: 'EMS', mapLink: "", },
  { id: 'ems-side', name: 'EMS Side Hall', shortName: 'EMS (SIDE)', mapLink: "" },
  { id: 'ccsit', name: 'CCSIT/SC Block', shortName: 'CCSIT', mapLink: "", },
  { id: 'ccsit-lab', name: 'CCSIT Lab', shortName: 'CCSIT LAB', mapLink: "", },
  { id: 'trap', name: 'Student TRAP', shortName: 'TRAP', mapLink: "", },
  { id: 'main-stage', name: 'Main Stage', shortName: 'MAIN STAGE', mapLink: "", },
  { id: 'campus', name: 'Campus Wide', shortName: 'CAMPUS', mapLink: "", },
] as const;

// ================== EVENTS DATA ==================

export const unifiedEvents: UnifiedEvent[] = [
  // ============ DAY 1 EVENTS ============
  {
    id: 'technova',
    name: 'Technova 8.0',
    fancyName: 'Technova 8.0',
    tagline: 'The ultimate tech showdown',
    description: 'Premier technology competition showcasing innovation and coding prowess. Battle it out with the best minds in a 6-hour hackathon.',
    category: 'competition',
    schedule: {
      day: 1,
      startTime: '11:00',
      endTime: '17:00',
      displayTime: '11:00 AM - 05:00 PM',
    },
    venue: 'EMS Hall',
    teamSize: '2-4',
    entryFee: '1,000',
    imageUrl: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=800&q=80',
    isFeatured: true,
    isMultiPeriod: true,
    prizePool: '15,000',
    prizes: { jackpotPrize: '25,000', first: '8,000', second: '5,000', third: '2,000' },
  },
  {
    id: 'opening-seminar',
    name: 'Opening Seminar',
    tagline: 'Kickstart the fest with inspiration',
    description: 'Keynote seminar featuring industry leaders sharing insights on the future of technology.',
    category: 'seminar',
    schedule: {
      day: 1,
      startTime: '09:30',
      endTime: '11:00',
      displayTime: '09:30 AM - 11:00 AM',
    },
    venue: 'Aryabhatta Hall',
    teamSize: 'any',
    entryFee: 'Free',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
  },
  {
    id: 'talenx',
    name: "Talen'X",
    fancyName: "Talen'x",
    tagline: 'Showcase your unique talents',
    description: 'A platform to display your hidden talents - be it singing, dancing, mimicry, or any special skill.',
    category: 'competition',
    schedule: {
      day: 1,
      startTime: '11:00',
      endTime: '17:00',
      displayTime: '11:00 AM - 05:00 PM',
    },
    venue: 'CCSIT Block',
    teamSize: 'solo',
    entryFee: '500',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80',
    isMultiPeriod: true,
    prizePool: '3,500',
    prizes: { first: '2,500', second: '1,000' },
    isFeatured: true,
  },
  {
    id: 'debate',
    name: 'Debate',
    tagline: 'Battle of words and ideas',
    description: 'Put your argumentative skills to the test in this intense debate competition on contemporary topics.',
    category: 'competition',
    schedule: {
      day: 1,
      startTime: '13:30',
      endTime: '15:00',
      displayTime: '01:30 PM - 03:00 PM',
    },
    venue: 'TRAP',
    teamSize: '2-3',
    entryFee: '500',
    imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80',
    prizePool: '1,500',
    prizes: { first: '1,000', second: '500' },
  },
  {
    id: 'cultural-evening-d1',
    name: 'Cultural Evening',
    tagline: 'Evening of performances',
    description: 'Evening of performances and entertainment featuring talented artists.',
    category: 'cultural',
    schedule: {
      day: 1,
      startTime: '19:00',
      endTime: '22:00',
      displayTime: '07:00 PM - 10:00 PM',
    },
    venue: 'Main Stage',
    teamSize: 'any',
    entryFee: 'Free',
    imageUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80',
  },

  // ============ DAY 2 EVENTS ============
  {
    id: 'inauguration',
    name: 'Inauguration',
    tagline: 'Official opening of the fest',
    description: 'Official opening ceremony of the fest with distinguished guests and dignitaries.',
    category: 'seminar',
    schedule: {
      day: 2,
      startTime: '10:00',
      endTime: '11:00',
      displayTime: '10:00 AM - 11:00 AM',
    },
    venue: 'EMS Hall',
    teamSize: 'any',
    entryFee: 'Free',
    imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
  },
  {
    id: 'tech-seminar',
    name: 'Tech Seminar',
    tagline: 'Industry insights & trends',
    description: 'Learn about the latest technology trends and industry best practices from experienced professionals.',
    category: 'seminar',
    schedule: {
      day: 2,
      startTime: '11:00',
      endTime: '12:30',
      displayTime: '11:00 AM - 12:30 PM',
    },
    venue: 'EMS Hall',
    teamSize: 'any',
    entryFee: 'Free',
    imageUrl: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&q=80',
  },
  {
    id: 'treasure-hunt',
    fancyName: 'Scavenge Squad',
    name: 'Treasure Hunt',
    tagline: 'Campus-wide adventure awaits',
    description: 'Navigate through clues scattered across the campus. Work with your team to find the ultimate treasure!',
    category: 'competition',
    schedule: {
      day: 2,
      startTime: '12:30',
      endTime: '17:00',
      displayTime: '12:30 PM - 05:00 PM',
    },
    venue: 'Campus Wide',
    teamSize: '3-5',
    entryFee: '2,000',
    imageUrl: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2000&auto=format&fit=crop',
    isMultiPeriod: true,
    prizePool: '7,000',
    prizes: { first: '5,000', second: '2,000' },
  },
  {
    id: 'prompt-engineering',
    fancyName: 'AskRight',
    name: 'Prompt Engineering',
    tagline: 'Master the art of AI prompts',
    description: 'Test your skills in crafting the perfect prompts to get the best results from AI models.',
    category: 'competition',
    schedule: {
      day: 2,
      startTime: '13:00',
      endTime: '14:00',
      displayTime: '01:00 PM - 02:00 PM',
    },
    venue: 'CCSIT Lab',
    teamSize: 'solo',
    entryFee: '300',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    prizePool: '3,000',
    prizes: { first: '2,000', second: '1,000' },
  },
  {
    id: 'vibe-coding',
    fancyName: 'Vibe-coding',
    name: 'Vibe Coding',
    tagline: 'Code with the vibes',
    description: 'Collaborative coding session where you build projects while enjoying good music and vibes.',
    category: 'competition',
    schedule: {
      day: 2,
      startTime: '14:00',
      endTime: '16:00',
      displayTime: '02:00 PM - 04:00 PM',
    },
    venue: 'CCSIT Lab',
    teamSize: '2-3',
    entryFee: '400',
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
    prizePool: '3,500',
    prizes: { first: '2,500', second: '1,000' },
  },

  // ============ ALL-DAY / BOTH DAYS EVENTS ============
  {
    id: 'spot-events-d1',
    name: 'Spot Events',
    tagline: 'Fun activities all day',
    description: 'Various spot events and activities throughout the day. No prior registration required!',
    category: 'allday',
    schedule: {
      day: 1,
      startTime: '00:00',
      endTime: '23:59',
      displayTime: 'Full Day',
    },
    venue: 'Student TRAP',
    teamSize: 'any',
    entryFee: 'Varies',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
    isAllDay: true,
  },
  {
    id: 'photo-competition',
    name: 'Photo Competition',
    fancyName: 'Lenza',
    tagline: 'Capture the moment',
    description: 'Capture the best moments of the fest through your lens. Best photographs will be featured and awarded.',
    category: 'competition',
    schedule: {
      day: 'both',
      startTime: '00:00',
      endTime: '23:59',
      displayTime: 'All Day',
    },
    venue: 'Campus Wide',
    teamSize: 'solo',
    entryFee: 'Free',
    imageUrl: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=80',
    isAllDay: true,
    prizePool: '1,000',
    prizes: { first: '1,000' },
  },
  {
    id: 'video-competition',
    name: 'Video Competition',
    tagline: 'Create the best coverage',
    description: 'Create the best video coverage of the fest. Showcase your videography and editing skills.',
    category: 'competition',
    schedule: {
      day: 'both',
      startTime: '00:00',
      endTime: '23:59',
      displayTime: 'All Day',
    },
    venue: 'Campus Wide',
    teamSize: 'solo',
    entryFee: 'Free',
    imageUrl: 'https://images.unsplash.com/photo-1579566346927-c68383817a25?w=800&q=80',
    isAllDay: true,
    prizePool: '1,000',
    prizes: { first: '1,000' },
  },
];

// ================== HELPER FUNCTIONS ==================

/** Get all events for a specific day */
export function getEventsByDay(day: EventDay): UnifiedEvent[] {
  return unifiedEvents.filter(
    (event) => event.schedule.day === day || event.schedule.day === 'both'
  );
}

/** Get events by category */
export function getEventsByCategory(category: EventCategory): UnifiedEvent[] {
  return unifiedEvents.filter((event) => event.category === category);
}

/** Get featured events */
export function getFeaturedEvents(): UnifiedEvent[] {
  return unifiedEvents.filter((event) => event.isFeatured);
}

/** Get event by ID */
export function getEventById(id: string): UnifiedEvent | undefined {
  return unifiedEvents.find((event) => event.id === id);
}

/** Get all-day events for a specific day */
export function getAllDayEvents(day: 1 | 2): UnifiedEvent[] {
  return unifiedEvents.filter(
    (event) =>
      event.isAllDay &&
      (event.schedule.day === day || event.schedule.day === 'both')
  );
}

/** Get scheduled (non all-day) events for a specific day */
export function getScheduledEvents(day: 1 | 2): UnifiedEvent[] {
  return unifiedEvents
    .filter(
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
export function getEventsByTimePeriod(day: 1 | 2) {
  const scheduled = getScheduledEvents(day);

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
export function getActiveCategories(): EventCategory[] {
  const categories = new Set(unifiedEvents.map((e) => e.category));
  return Array.from(categories);
}
