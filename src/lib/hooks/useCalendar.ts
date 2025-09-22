// hooks/useCalendar.ts

import {
  useState,
  useCallback,
  useEffect,
  useTransition,
  useOptimistic,
} from "react";
import {
  CalendarEvent,
  CreateEventRequest,
  UpdateEventRequest,
  UseCalendarReturn,
  ApiResponse,
  EventsResponse,
} from "@/types";

// API functions (przykłady)
class CalendarAPI {
  private static baseUrl = "/api/calendar";

  static async getEvents(
    startDate: string,
    endDate: string,
  ): Promise<CalendarEvent[]> {
    const response = await fetch(
      `${this.baseUrl}/events?start=${startDate}&end=${endDate}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }

    const data: ApiResponse<EventsResponse> = await response.json();
    return data.data.events;
  }

  static async createEvent(event: CreateEventRequest): Promise<CalendarEvent> {
    const response = await fetch(`${this.baseUrl}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });

    if (!response.ok) {
      throw new Error("Failed to create event");
    }

    const data: ApiResponse<CalendarEvent> = await response.json();
    return data.data;
  }

  static async updateEvent(event: UpdateEventRequest): Promise<CalendarEvent> {
    const response = await fetch(`${this.baseUrl}/events/${event.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });

    if (!response.ok) {
      throw new Error("Failed to update event");
    }

    const data: ApiResponse<CalendarEvent> = await response.json();
    return data.data;
  }

  static async deleteEvent(eventId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/events/${eventId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete event");
    }
  }
}

export const useCalendar = (
  initialEvents: CalendarEvent[] = [],
): UseCalendarReturn => {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // React 19 - useTransition dla lepszego UX
  const [isPending, startTransition] = useTransition();

  // React 19 - useOptimistic dla optimistic updates
  const [optimisticEvents, addOptimisticEvent] = useOptimistic(
    events,
    (state: CalendarEvent[], newEvent: CalendarEvent) => [...state, newEvent],
  );

  const handleError = useCallback((err: unknown): void => {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    setError(errorMessage);
    console.error("Calendar error:", err);
  }, []);

  const clearError = useCallback((): void => {
    setError(null);
  }, []);

  const fetchEvents = useCallback(
    async (startDate: string, endDate: string): Promise<void> => {
      setLoading(true);
      clearError();

      try {
        const fetchedEvents = await CalendarAPI.getEvents(startDate, endDate);
        setEvents(fetchedEvents);
      } catch (err) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    },
    [handleError, clearError],
  );

  const createEvent = useCallback(
    async (eventData: CreateEventRequest): Promise<CalendarEvent> => {
      setLoading(true);
      clearError();

      try {
        const newEvent = await CalendarAPI.createEvent(eventData);
        setEvents((prev) => [...prev, newEvent]);
        return newEvent;
      } catch (err) {
        handleError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [handleError, clearError],
  );

  const updateEvent = useCallback(
    async (eventData: UpdateEventRequest): Promise<CalendarEvent> => {
      setLoading(true);
      clearError();

      try {
        const updatedEvent = await CalendarAPI.updateEvent(eventData);
        setEvents((prev) =>
          prev.map((event) =>
            event.id === updatedEvent.id ? updatedEvent : event,
          ),
        );
        return updatedEvent;
      } catch (err) {
        handleError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [handleError, clearError],
  );

  const deleteEvent = useCallback(
    async (eventId: string): Promise<void> => {
      setLoading(true);
      clearError();

      try {
        await CalendarAPI.deleteEvent(eventId);
        setEvents((prev) => prev.filter((event) => event.id !== eventId));
      } catch (err) {
        handleError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [handleError, clearError],
  );

  const refreshEvents = useCallback(async (): Promise<void> => {
    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const oneMonthLater = new Date(now.getFullYear(), now.getMonth() + 2, 0);

    await fetchEvents(
      oneMonthAgo.toISOString().split("T")[0],
      oneMonthLater.toISOString().split("T")[0],
    );
  }, [fetchEvents]);

  // Automatyczne ładowanie wydarzeń na początku
  useEffect(() => {
    if (initialEvents.length === 0) {
      refreshEvents();
    }
  }, [initialEvents.length, refreshEvents]);

  return {
    events,
    loading,
    error,
    createEvent,
    updateEvent,
    deleteEvent,
    fetchEvents,
    refreshEvents,
  };
};

// Hook dla filtrowania wydarzeń
export const useEventFilters = (events: CalendarEvent[]) => {
  const [filters, setFilters] = useState({
    categories: [] as string[],
    searchQuery: "",
    dateRange: null as { start: string; end: string } | null,
  });

  const filteredEvents = useCallback(() => {
    return events.filter((event) => {
      // Filtr kategorii
      if (filters.categories.length > 0) {
        const eventCategory = event.extendedProps?.category;
        if (!eventCategory || !filters.categories.includes(eventCategory)) {
          return false;
        }
      }

      // Filtr wyszukiwania
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesTitle = event.title.toLowerCase().includes(query);
        const matchesDescription = event.extendedProps?.description
          ?.toLowerCase()
          .includes(query);
        const matchesLocation = event.extendedProps?.location
          ?.toLowerCase()
          .includes(query);

        if (!matchesTitle && !matchesDescription && !matchesLocation) {
          return false;
        }
      }

      // Filtr daty
      if (filters.dateRange) {
        const eventStart = new Date(event.start);
        const rangeStart = new Date(filters.dateRange.start);
        const rangeEnd = new Date(filters.dateRange.end);

        if (eventStart < rangeStart || eventStart > rangeEnd) {
          return false;
        }
      }

      return true;
    });
  }, [events, filters]);

  return {
    filters,
    setFilters,
    filteredEvents: filteredEvents(),
  };
};

// Hook dla ustawień kalendarza
export const useCalendarSettings = () => {
  const [settings, setSettings] = useState({
    defaultView: "dayGridMonth",
    firstDayOfWeek: 1, // Monday
    locale: "pl",
    timeZone: "Europe/Warsaw",
    businessHours: {
      daysOfWeek: [1, 2, 3, 4, 5], // Monday - Friday
      startTime: "09:00",
      endTime: "17:00",
    },
  });

  const updateSettings = useCallback(
    (newSettings: Partial<typeof settings>) => {
      setSettings((prev) => ({ ...prev, ...newSettings }));
    },
    [],
  );

  return {
    settings,
    updateSettings,
  };
};
