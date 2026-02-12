import {
  type UnifiedEvent,
  type EventCategory,
  type EventDay,
  timePeriods,
} from '@/lib/data/unifiedEvents';

// ============================================
// TYPE GUARDS & VALIDATION
// ============================================

/**
 * Validates if an event object has all required properties
 */
export function isValidEvent(event: unknown): event is UnifiedEvent {
  if (!event || typeof event !== 'object') return false;
  
  const e = event as Partial<UnifiedEvent>;
  
  return !!(
    e.id &&
    e.name &&
    e.schedule &&
    e.schedule.day &&
    e.schedule.startTime &&
    e.schedule.endTime &&
    e.category
  );
}

/**
 * Validates if a time string is in correct format (HH:MM)
 */
export function isValidTimeFormat(time: string): boolean {
  if (!time || typeof time !== 'string') return false;
  
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
}

/**
 * Safely validates event day
 */
export function isValidEventDay(day: unknown): day is EventDay {
  return day === '1' || day === '2' || day === 'both';
}

/**
 * Safely validates event category
 */
export function isValidEventCategory(category: unknown): category is EventCategory {
  return (
    category === 'seminar' ||
    category === 'competition' ||
    category === 'cultural' ||
    category === 'allday' ||
    category === 'inauguration'
  );
}

// ============================================
// FILTERING FUNCTIONS
// ============================================

/**
 * Safely filters events by day with validation
 */
export function filterEventsByDay(
  events: UnifiedEvent[] | undefined | null,
  day: EventDay
): UnifiedEvent[] {
  if (!events || !Array.isArray(events)) {
    console.warn('filterEventsByDay: Invalid events array provided');
    return [];
  }

  if (!isValidEventDay(day)) {
    console.warn(`filterEventsByDay: Invalid day "${day}"`);
    return [];
  }

  return events.filter((event) => {
    if (!isValidEvent(event)) {
      console.warn(`filterEventsByDay: Invalid event object`, event);
      return false;
    }

    const eventDay = event.schedule.day;
    return eventDay === day || eventDay === 'both';
  });
}

/**
 * Safely filters events by categories with validation
 */
export function filterEventsByCategories(
  events: UnifiedEvent[] | undefined | null,
  categories: EventCategory[]
): UnifiedEvent[] {
  if (!events || !Array.isArray(events)) {
    console.warn('filterEventsByCategories: Invalid events array provided');
    return [];
  }

  if (!categories || !Array.isArray(categories) || categories.length === 0) {
    // No categories selected means show all events
    return events.filter(isValidEvent);
  }

  return events.filter((event) => {
    if (!isValidEvent(event)) {
      console.warn(`filterEventsByCategories: Invalid event object`, event);
      return false;
    }

    return categories.includes(event.category);
  });
}

// ============================================
// TIME PERIOD ASSIGNMENT
// ============================================

/**
 * Time period configuration type
 */
export interface TimePeriodConfig {
  id: 'morning' | 'afternoon' | 'evening' | 'allday';
  start: string;
  end: string;
}

/**
 * Determines which time period an event belongs to based on its START time.
 * This ensures each event appears in only ONE section, even if it spans multiple periods.
 */
export function assignEventToPeriod(
  event: UnifiedEvent | undefined | null
): 'morning' | 'afternoon' | 'evening' | 'allday' | null {
  if (!event || !isValidEvent(event)) {
    return null;
  }

  // All-day events go to the allday section
  if (event.isAllDay) {
    return 'allday';
  }

  const { startTime } = event.schedule;

  // Validate time format
  if (!isValidTimeFormat(startTime)) {
    console.warn(
      `assignEventToPeriod: Invalid time format for event "${event.id}". Start: ${startTime}`
    );
    return null;
  }

  // Assign based on start time
  // Morning: 07:00 - 12:00
  if (startTime >= timePeriods.morning.start && startTime < timePeriods.afternoon.start) {
    return 'morning';
  }
  
  // Afternoon: 12:00 - 17:00
  if (startTime >= timePeriods.afternoon.start && startTime < timePeriods.evening.start) {
    return 'afternoon';
  }
  
  // Evening: 17:00 - 22:00
  if (startTime >= timePeriods.evening.start && startTime < '22:00') {
    return 'evening';
  }

  // Events starting before 07:00 or after 22:00 go to the closest period
  if (startTime < timePeriods.morning.start) {
    return 'morning';
  }
  
  return 'evening';
}

/**
 * Checks if an event spans multiple time periods.
 * This is used to display the "Multi-session" badge.
 */
export function detectMultiPeriodEvent(event: UnifiedEvent): boolean {
  if (!event || !isValidEvent(event)) {
    return false;
  }

  if (event.isAllDay) {
    return false; // All-day events are already marked as such
  }

  const { startTime, endTime } = event.schedule;

  if (!isValidTimeFormat(startTime) || !isValidTimeFormat(endTime)) {
    return false;
  }
  
  // Count how many periods the event touches
  let periodsSpanned = 0;
  
  if (startTime < timePeriods.afternoon.start && endTime > timePeriods.morning.start) {
    periodsSpanned++;
  }
  if (startTime < timePeriods.evening.start && endTime > timePeriods.afternoon.start) {
    periodsSpanned++;
  }
  if (startTime < '22:00' && endTime > timePeriods.evening.start) {
    periodsSpanned++;
  }

  return periodsSpanned > 1;
}

/**
 * Safely groups events by time periods.
 * Each event is assigned to exactly ONE period based on its start time.
 */
export function groupEventsByTimePeriod(
  events: UnifiedEvent[] | undefined | null
): {
  morning: UnifiedEvent[];
  afternoon: UnifiedEvent[];
  evening: UnifiedEvent[];
  allday: UnifiedEvent[];
} {
  const emptyResult = {
    morning: [],
    afternoon: [],
    evening: [],
    allday: [],
  };

  if (!events || !Array.isArray(events)) {
    console.warn('groupEventsByTimePeriod: Invalid events array provided');
    return emptyResult;
  }

  // Validate events
  const validEvents = events.filter(isValidEvent);

  try {
    const result = {
      morning: [] as UnifiedEvent[],
      afternoon: [] as UnifiedEvent[],
      evening: [] as UnifiedEvent[],
      allday: [] as UnifiedEvent[],
    };

    // Assign each event to exactly one period
    for (const event of validEvents) {
      const period = assignEventToPeriod(event);
      
      if (period) {
        result[period].push(event);
      } else {
        console.warn(`groupEventsByTimePeriod: Could not assign period for event "${event.id}"`);
      }
    }

    return result;
  } catch (error) {
    console.error('groupEventsByTimePeriod: Error grouping events', error);
    return emptyResult;
  }
}

// ============================================
// COMBINED FILTERING & GROUPING
// ============================================

/**
 * Main function to filter and group events safely
 * Returns events for a specific day, optionally filtered by categories, grouped by time period
 */
export function getFilteredAndGroupedEvents(
  allEvents: UnifiedEvent[] | undefined | null,
  selectedDay: EventDay,
  selectedCategories: EventCategory[]
): {
  morning: UnifiedEvent[];
  afternoon: UnifiedEvent[];
  evening: UnifiedEvent[];
  allday: UnifiedEvent[];
  totalCount: number;
} {
  try {
    // Step 1: Filter by day
    const dayEvents = filterEventsByDay(allEvents, selectedDay);

    // Step 2: Filter by categories (if any selected)
    const filteredEvents = filterEventsByCategories(dayEvents, selectedCategories);

    // Step 3: Group by time period (each event goes to exactly one period)
    const grouped = groupEventsByTimePeriod(filteredEvents);

    // Step 4: Calculate total count
    const totalCount =
      grouped.morning.length +
      grouped.afternoon.length +
      grouped.evening.length +
      grouped.allday.length;

    return {
      ...grouped,
      totalCount,
    };
  } catch (error) {
    console.error('getFilteredAndGroupedEvents: Fatal error', error);
    return {
      morning: [],
      afternoon: [],
      evening: [],
      allday: [],
      totalCount: 0,
    };
  }
}

// ============================================
// HELPER UTILITIES
// ============================================

/**
 * Safely checks if there are any events in the grouped result
 */
export function hasAnyEvents(grouped: {
  morning: UnifiedEvent[];
  afternoon: UnifiedEvent[];
  evening: UnifiedEvent[];
  allday: UnifiedEvent[];
}): boolean {
  try {
    return (
      grouped.morning.length > 0 ||
      grouped.afternoon.length > 0 ||
      grouped.evening.length > 0 ||
      grouped.allday.length > 0
    );
  } catch (error) {
    console.error('hasAnyEvents: Error checking events', error);
    return false;
  }
}

/**
 * Gets event count for a specific period
 */
export function getPeriodEventCount(
  events: UnifiedEvent[] | undefined | null
): number {
  if (!events || !Array.isArray(events)) return 0;
  return events.filter(isValidEvent).length;
}