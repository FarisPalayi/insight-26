import { useState, useMemo } from 'react';
import type { UnifiedEvent, EventCategory, EventDay } from '@/lib/data/unifiedEvents';
import { getFilteredAndGroupedEvents, hasAnyEvents } from '@/components/features/schedule/eventUtils';

/**
 * Custom hook for managing schedule state and filtering
 * 
 * This hook handles:
 * - Day selection (Day 1 / Day 2)
 * - Category filtering
 * - Event grouping by time period (NO DUPLICATES)
 */
export function useScheduleState(events: UnifiedEvent[] | undefined | null) {
    // State for selected day
    const [selectedDay, setSelectedDay] = useState<EventDay>('1');

    // State for selected categories (empty array = show all)
    const [selectedCategories, setSelectedCategories] = useState<EventCategory[]>([]);

    // Handler for day change
    const handleDayChange = (day: string) => {
        if (day === '1' || day === '2') {
            setSelectedDay(day);
        }
    };

    // Handler for category toggle
    const handleToggleCategory = (category: EventCategory) => {
        setSelectedCategories((prev) => {
            if (prev.includes(category)) {
                // Remove category
                return prev.filter((c) => c !== category);
            } else {
                // Add category
                return [...prev, category];
            }
        });
    };

    // Memoized filtered and grouped events
    // THIS IS THE CRITICAL PART - uses the NEW assignment-based logic
    const eventsByPeriod = useMemo(() => {
        const result = getFilteredAndGroupedEvents(
            events,
            selectedDay,
            selectedCategories
        );

        console.log('useScheduleState: Grouped events', {
            day: selectedDay,
            categories: selectedCategories,
            morning: result.morning.length,
            afternoon: result.afternoon.length,
            evening: result.evening.length,
            allday: result.allday.length,
            total: result.totalCount,
        });

        // Return just the grouped events (without totalCount)
        return {
            morning: result.morning,
            afternoon: result.afternoon,
            evening: result.evening,
            allday: result.allday,
        };
    }, [events, selectedDay, selectedCategories]);

    // Check if there are any events
    const hasEventsToDisplay = useMemo(() => {
        return hasAnyEvents(eventsByPeriod);
    }, [eventsByPeriod]);

    return {
        selectedDay,
        selectedCategories,
        handleDayChange,
        handleToggleCategory,
        eventsByPeriod,
        hasEvents: hasEventsToDisplay,
    };
}