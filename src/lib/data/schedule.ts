export type EventCategory = 'seminar' | 'competition' | 'cultural' | 'allday';

export interface ScheduleEvent {
  id: string;
  time: string;
  startTime: string; // For sorting (24h format HH:MM)
  endTime: string; // For sorting (24h format HH:MM)
  name: string;
  venue: string;
  category: EventCategory;
  description?: string;
  isAllDay?: boolean;
  isMultiPeriod?: boolean; // Spans multiple time periods
  prizes?: {
    first?: string;
    second?: string;
    third?: string;
  };
  registrationFee?: string;
}

export interface DaySchedule {
  day: number;
  date: string;
  events: ScheduleEvent[];
  allDayEvents: ScheduleEvent[];
}

export const venues = [
  { id: 'aryabhatta', name: 'Aryabhatta Hall', shortName: 'ARYABHATTA' },
  { id: 'ems', name: 'EMS Hall', shortName: 'EMS' },
  { id: 'ems-side', name: 'EMS Side Hall', shortName: 'EMS Hall' },
  { id: 'ccsit', name: 'CCSIT/SC Block', shortName: 'CCSIT' },
  { id: 'ccsit-lab', name: 'CCSIT Lab', shortName: 'CCSIT LAB' },
  { id: 'trap', name: 'Student Trap', shortName: 'TRAP' },
];

export const categories: { id: EventCategory; name: string; color: string }[] = [
  { id: 'seminar', name: 'Seminar/Talk', color: 'event-seminar' },
  { id: 'competition', name: 'Competition', color: 'event-competition' },
  { id: 'cultural', name: 'Cultural', color: 'event-cultural' },
  { id: 'allday', name: 'All Day', color: 'event-allday' },
];

// Time period definitions for categorization
export const timePeriods = {
  morning: { start: '09:00', end: '12:00', label: 'Morning (9 AM - 12 PM)' },
  afternoon: { start: '12:00', end: '17:00', label: 'Afternoon (12 PM - 5 PM)' },
  evening: { start: '17:00', end: '23:59', label: 'Evening (5 PM onwards)' },
};

// Helper to check if an event falls within a time period
export function eventFallsInPeriod(
  event: ScheduleEvent,
  periodStart: string,
  periodEnd: string
): boolean {
  const eventStart = event.startTime;
  const eventEnd = event.endTime;

  // Event overlaps with period if:
  // - Event starts before period ends AND
  // - Event ends after period starts
  return eventStart < periodEnd && eventEnd > periodStart;
}

export const scheduleData: DaySchedule[] = [
  {
    day: 1,
    date: 'Day One',
    allDayEvents: [
      {
        id: 'd1-spot',
        time: 'Full Day',
        startTime: '00:00',
        endTime: '23:59',
        name: 'Spot Events',
        venue: 'Student TRAP',
        category: 'allday',
        isAllDay: true,
        description: 'Various spot events and activities throughout the day',
      },
    ],
    events: [
      {
        id: 'd1-seminar',
        time: '09:30 AM - 11:00 AM',
        startTime: '09:30',
        endTime: '11:00',
        name: 'Opening Seminar',
        venue: 'Aryabhatta Hall',
        category: 'seminar',
        description: 'Keynote seminar by Mubashir',
        registrationFee: '₹1,000',
      },
      {
        id: 'd1-technova',
        time: '11:00 AM - 05:00 PM',
        startTime: '11:00',
        endTime: '17:00',
        name: 'Technova',
        venue: 'EMS (Side Hall)',
        category: 'competition',
        isMultiPeriod: true,
        description: 'Premier tech competition showcasing innovation',
        registrationFee: '₹1,000',
        prizes: {
          first: '₹5,000',
          second: '₹3,000',
          third: '₹1,000',
        },
      },
      {
        id: 'd1-talenx',
        time: '11:00 AM - 05:00 PM',
        startTime: '11:00',
        endTime: '17:00',
        name: "Talen'X",
        venue: 'CCSIT/SC Block',
        category: 'competition',
        isMultiPeriod: true,
        description: 'Showcase your unique talents',
        registrationFee: '₹1,000',
        prizes: {
          first: '₹2,500',
          second: '₹1,000',
        },
      },
      {
        id: 'd1-paper',
        time: '01:30 PM - 03:00 PM',
        startTime: '13:30',
        endTime: '15:00',
        name: 'Paper Presentation',
        venue: 'Aryabhatta Hall',
        category: 'seminar',
        description: 'Research paper presentations and discussions',
        prizes: {
          first: '₹3,000',
        },
      },
      {
        id: 'd1-debate',
        time: '01:30 PM - 03:00 PM',
        startTime: '13:30',
        endTime: '15:00',
        name: 'Debate',
        venue: 'TRAP',
        category: 'competition',
        description: 'Battle of words and ideas',
        registrationFee: '₹500',
        prizes: {
          first: '₹1,000',
        },
      },
      {
        id: 'd1-cultural',
        time: '07:00 PM - 10:00 PM',
        startTime: '19:00',
        endTime: '22:00',
        name: 'Cultural Evening',
        venue: 'Main Stage',
        category: 'cultural',
        description: 'Evening of performances and entertainment',
      },
    ],
  },
  {
    day: 2,
    date: 'Day Two',
    allDayEvents: [
      {
        id: 'd2-spot',
        time: 'Full Day',
        startTime: '00:00',
        endTime: '23:59',
        name: 'Spot Events',
        venue: 'TRAP',
        category: 'allday',
        isAllDay: true,
        description: 'Various spot events and activities throughout the day',
      },
      {
        id: 'd2-photo',
        time: 'Both Days',
        startTime: '00:00',
        endTime: '23:59',
        name: 'Photo Competition',
        venue: 'CU Campus',
        category: 'competition',
        isAllDay: true,
        description: 'Capture the best moments of the fest',
        prizes: {
          first: '₹1,000',
        },
      },
      {
        id: 'd2-video',
        time: 'Both Days',
        startTime: '00:00',
        endTime: '23:59',
        name: 'Video Competition',
        venue: 'CU Campus',
        category: 'competition',
        isAllDay: true,
        description: 'Create the best video coverage',
        prizes: {
          first: '₹1,000',
        },
      },
    ],
    events: [
      {
        id: 'd2-inaug',
        time: '10:00 AM - 11:00 AM',
        startTime: '10:00',
        endTime: '11:00',
        name: 'Inauguration Ceremony',
        venue: 'EMS Hall',
        category: 'seminar',
        description: 'Official opening ceremony of the fest',
      },
      {
        id: 'd2-seminar',
        time: '11:00 AM - 12:30 PM',
        startTime: '11:00',
        endTime: '12:30',
        name: 'Tech Seminar',
        venue: 'EMS Hall',
        category: 'seminar',
        description: 'Industry insights and future trends',
      },
      {
        id: 'd2-treasure',
        time: '12:30 PM - 05:00 PM',
        startTime: '12:30',
        endTime: '17:00',
        name: 'Treasure Hunt',
        venue: 'TRAP',
        category: 'competition',
        isMultiPeriod: false,
        description: 'Campus-wide treasure hunt adventure',
        registrationFee: '₹2,000',
        prizes: {
          first: '₹5,000',
          second: '₹2,000',
        },
      },
      {
        id: 'd2-prompt',
        time: '01:00 PM - 02:00 PM',
        startTime: '13:00',
        endTime: '14:00',
        name: 'Prompt Engineering',
        venue: 'CCSIT Lab',
        category: 'competition',
        description: 'Master the art of AI prompts',
        prizes: {
          first: '₹2,000',
          second: '₹1,000',
        },
      },
      {
        id: 'd2-vibe',
        time: '02:00 PM - 04:00 PM',
        startTime: '14:00',
        endTime: '16:00',
        name: 'Vibe Coding',
        venue: 'CCSIT Lab',
        category: 'competition',
        description: 'Collaborative coding session with vibes',
        prizes: {
          first: '₹2,500',
          second: '₹1,000',
        },
      },
      {
        id: 'd2-spotcomp',
        time: '04:00 PM - 05:00 PM',
        startTime: '16:00',
        endTime: '17:00',
        name: 'Spot Competitions',
        venue: 'TRAP',
        category: 'competition',
        description: 'Quick-fire spot competitions',
      },
      {
        id: 'd2-cultural',
        time: '07:00 PM - 10:00 PM',
        startTime: '19:00',
        endTime: '22:00',
        name: 'Cultural Night',
        venue: 'Main Stage',
        category: 'cultural',
        description: 'Grand finale cultural performances',
      },
    ],
  },
];
