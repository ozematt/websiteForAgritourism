"use client"; // Ważne dla Next.js 15 App Router

import { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DateSelectArg, EventClickArg, EventApi } from "@fullcalendar/core";

interface Event {
  id: string;
  title: string;
  start: string;
  end?: string;
  color?: string;
}

const MyCalendar = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Meeting z klientem",
      start: "2024-12-20T10:00:00",
      end: "2024-12-26T11:00:00",
      color: "#3b82f6",
    },
    {
      id: "2",
      title: "Prezentacja projektu",
      start: "2024-12-20T14:00:00",
      end: "2024-12-24T15:30:00",
      color: "#ef4444",
    },
    {
      id: "3",
      title: "Prezentacja projektu",
      start: "2024-12-20T14:00:00",
      end: "2024-12-24T15:30:00",
      color: "#ef5252",
    },
    {
      id: "4",
      title: "Prezentacja projektu",
      start: "2024-12-20T14:00:00",
      end: "2024-12-24T15:30:00",
      color: "#ef5252",
    },
  ]);

  const calendarRef = useRef<FullCalendar>(null);

  // Obsługa wyboru daty/czasu
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    const title = prompt("Wprowadź tytuł wydarzenia:");

    if (title) {
      const newEvent: Event = {
        id: Date.now().toString(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        color: "#10b981",
      };

      setEvents((prev) => [...prev, newEvent]);
    }

    selectInfo.view.calendar.unselect();
  };

  // Obsługa kliknięcia w wydarzenie
  const handleEventClick = (clickInfo: EventClickArg) => {
    if (confirm(`Czy chcesz usunąć wydarzenie '${clickInfo.event.title}'?`)) {
      setEvents((prev) =>
        prev.filter((event) => event.id !== clickInfo.event.id),
      );
    }
  };

  // Obsługa przeciągnięcia wydarzenia
  const handleEventDrop = (dropInfo: any) => {
    const updatedEvent: Event = {
      id: dropInfo.event.id,
      title: dropInfo.event.title,
      start: dropInfo.event.startStr,
      end: dropInfo.event.endStr,
      color: dropInfo.event.backgroundColor,
    };

    setEvents((prev) =>
      prev.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event,
      ),
    );
  };

  return (
    <div className="mx-auto max-w-6xl pt-4">
      {/* Kalendarz */}
      <div className="rounded-panel-medium bg-white p-4 shadow-lg">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev next today",
            center: "",
            right: "title",
          }}
          firstDay={1}
          events={events}
          selectable={true}
          selectMirror={true}
          editable={true}
          droppable={true}
          select={handleDateSelect}
          eventClick={handleEventClick}
          eventDrop={handleEventDrop}
          height="auto"
          locale="pl"
          buttonText={{
            today: "Wróć do dziś",
          }}
          dayHeaderFormat={{ weekday: "short" }}
          eventTimeFormat={{
            hour: "2-digit",
            minute: "2-digit",
            meridiem: false,
          }}
        />
      </div>

      {/* Lista wydarzeń */}
      <div className="mt-6 rounded-lg bg-gray-50 p-4">
        <h3 className="mb-3 text-lg font-semibold">Nadchodzące wydarzenia:</h3>
        {events.length === 0 ? (
          <p className="text-gray-500">Brak wydarzeń</p>
        ) : (
          <div className="space-y-2">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex items-center gap-3 rounded bg-white p-2"
              >
                <div
                  className="h-4 w-4 rounded"
                  style={{ backgroundColor: event.color }}
                />
                <span className="font-medium">{event.title}</span>
                <span className="text-sm text-gray-500">
                  {new Date(event.start).toLocaleDateString("pl-PL")}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCalendar;
