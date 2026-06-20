// Domain model — the transport-agnostic shape the app reasons about. REST DTOs
// are mapped into this at the repository boundary; SQLite rows would map into
// the same shape later. UI/hooks only ever see this, never the wire format.
export type BookingStatus =
  | 'scheduled'
  | 'en_route'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export interface Booking {
  id: string;
  serviceId: string;
  status: BookingStatus;
  scheduledAt: string; // ISO 8601
}

export interface BookingQuery {
  status?: BookingStatus;
}

export interface CreateBooking {
  serviceId: string;
  scheduledAt: string;
}
