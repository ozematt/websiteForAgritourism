export interface User {
  id?: string;
  name?: string;
  password?: string;
}

export interface AuthCredentials {
  name: string;
  password: string;
}

export interface Property {
  id: number;
  name: string;
  description: string | null;
  address: string | null;
  pricePerNight: number | null;
  maxGuests: number | null;
  isActive: boolean | null;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface PanelProps {
  properties: Property[];
}

export interface ModifiedImageData {
  propertyId: number | SQL<unknown>;
  imageUrl: string | SQL<unknown>;
  thumbnailUrl: string | SQL<unknown>;
  caption: string | null;
  isPrimary: boolean;
  createdAt?: Date;
}

// types/calendar.ts

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end?: string;
  allDay?: boolean;
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  extendedProps?: EventExtendedProps;
}

export interface EventExtendedProps {
  description?: string;
  location?: string;
  category?: EventCategory;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
  attendees?: Attendee[];
  reminder?: ReminderSettings;
}

export enum EventCategory {
  MEETING = "meeting",
  TASK = "task",
  REMINDER = "reminder",
  PERSONAL = "personal",
  HOLIDAY = "holiday",
  BIRTHDAY = "birthday",
}

export interface Attendee {
  id: string;
  name: string;
  email: string;
  status: AttendeeStatus;
}

export enum AttendeeStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  DECLINED = "declined",
  TENTATIVE = "tentative",
}

export interface ReminderSettings {
  enabled: boolean;
  minutesBefore: number;
  type: ReminderType;
}

export enum ReminderType {
  EMAIL = "email",
  PUSH = "push",
  SMS = "sms",
}

export interface CalendarProps {
  initialEvents?: CalendarEvent[];
  onEventCreate?: (event: Omit<CalendarEvent, "id">) => Promise<CalendarEvent>;
  onEventUpdate?: (event: CalendarEvent) => Promise<CalendarEvent>;
  onEventDelete?: (eventId: string) => Promise<void>;
  onDateSelect?: (
    selectInfo: import("@fullcalendar/core").DateSelectArg,
  ) => void;
  editable?: boolean;
  selectable?: boolean;
  businessHours?: BusinessHours;
  validRange?: ValidRange;
}

export interface BusinessHours {
  daysOfWeek: number[]; // 0=Sunday, 1=Monday, etc.
  startTime: string; // '09:00'
  endTime: string; // '17:00'
}

export interface ValidRange {
  start?: string;
  end?: string;
}

export interface CalendarSettings {
  defaultView: ViewType;
  firstDayOfWeek: number;
  slotMinTime: string;
  slotMaxTime: string;
  slotDuration: string;
  snapDuration: string;
  locale: string;
  timeZone: string;
}

export enum ViewType {
  DAY_GRID_MONTH = "dayGridMonth",
  TIME_GRID_WEEK = "timeGridWeek",
  TIME_GRID_DAY = "timeGridDay",
  LIST_WEEK = "listWeek",
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

export interface EventsResponse {
  events: CalendarEvent[];
  totalCount: number;
  page: number;
  limit: number;
}

export interface CreateEventRequest {
  title: string;
  start: string;
  end?: string;
  allDay?: boolean;
  description?: string;
  location?: string;
  category: EventCategory;
  attendees?: string[]; // user IDs
  reminder?: ReminderSettings;
}

export interface UpdateEventRequest extends Partial<CreateEventRequest> {
  id: string;
}

// Hook types
export interface UseCalendarReturn {
  events: CalendarEvent[];
  loading: boolean;
  error: string | null;
  createEvent: (event: CreateEventRequest) => Promise<CalendarEvent>;
  updateEvent: (event: UpdateEventRequest) => Promise<CalendarEvent>;
  deleteEvent: (eventId: string) => Promise<void>;
  fetchEvents: (startDate: string, endDate: string) => Promise<void>;
  refreshEvents: () => Promise<void>;
}

// Context types
export interface CalendarContextType {
  events: CalendarEvent[];
  settings: CalendarSettings;
  currentDate: Date;
  currentView: ViewType;
  setCurrentDate: (date: Date) => void;
  setCurrentView: (view: ViewType) => void;
  addEvent: (event: CalendarEvent) => void;
  updateEvent: (event: CalendarEvent) => void;
  removeEvent: (eventId: string) => void;
}

// Filter types
export interface EventFilter {
  categories?: EventCategory[];
  dateRange?: {
    start: string;
    end: string;
  };
  searchQuery?: string;
  userId?: string;
}

export interface CalendarState {
  events: CalendarEvent[];
  filters: EventFilter;
  settings: CalendarSettings;
  ui: {
    sidebarOpen: boolean;
    selectedEvent: CalendarEvent | null;
    loading: boolean;
    error: string | null;
  };
}
