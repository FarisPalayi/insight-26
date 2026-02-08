import { useState, useMemo, useCallback } from 'react';
import type { EventCategory, EventDay, UnifiedEvent } from '@/lib/data/unifiedEvents';
import {
    getFilteredAndGroupedEvents,
    hasAnyEvents,
    isValidEventDay,
    isValidEventCategory,
} from '../components/features/schedule/ScheduleUtils';

/**
 * Custom hook for managing schedule state and filtering logic
 * Centralizes all state management and memoization
 */
export function useScheduleState(events: UnifiedEvent[] | undefined | null) {
    // State
    const [selectedDay, setSelectedDay] = useState<EventDay>('1');
    const [selectedCategories, setSelectedCategories] = useState<EventCategory[]>([]);

    // Safely update selected day with validation
    const handleDayChange = useCallback((day: string) => {
        if (isValidEventDay(day)) {
            setSelectedDay(day);
        } else {
            console.warn(`useScheduleState: Invalid day value "${day}", defaulting to "1"`);
            setSelectedDay('1');
        }
    }, []);

    // Toggle category selection with validation
    const handleToggleCategory = useCallback((category: EventCategory) => {
        if (!isValidEventCategory(category)) {
            console.warn(`useScheduleState: Invalid category "${category}"`);
            return;
        }

        setSelectedCategories((prev) => {
            // Ensure prev is an array
            if (!Array.isArray(prev)) {
                console.warn('useScheduleState: selectedCategories is not an array, resetting');
                return [category];
            }

            return prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category];
        });
    }, []);

    // Clear all category filters
    const handleClearCategories = useCallback(() => {
        setSelectedCategories([]);
    }, []);

    // Memoized filtered and grouped events
    const eventsByPeriod = useMemo(() => {
        try {
            return getFilteredAndGroupedEvents(events, selectedDay, selectedCategories);
        } catch (error) {
            console.error('useScheduleState: Error getting filtered events', error);
            return {
                morning: [],
                afternoon: [],
                evening: [],
                allday: [],
                totalCount: 0,
            };
        }
    }, [events, selectedDay, selectedCategories]);

    // Memoized check for any events
    const hasEvents = useMemo(() => {
        try {
            return hasAnyEvents(eventsByPeriod);
        } catch (error) {
            console.error('useScheduleState: Error checking for events', error);
            return false;
        }
    }, [eventsByPeriod]);

    return {
        // State
        selectedDay,
        selectedCategories,

        // Handlers
        handleDayChange,
        handleToggleCategory,
        handleClearCategories,

        // Computed
        eventsByPeriod,
        hasEvents,
        totalEventCount: eventsByPeriod.totalCount,
    };
}