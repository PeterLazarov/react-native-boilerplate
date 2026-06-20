import { Booking, BookingQuery, CreateBooking } from '@/domain/booking';

// The data-access contract. Implementations: rest/ today, sqlite/ later.
// Add methods only as real screens need them — don't pre-build a generic CRUD
// surface (see PLAN.md, "Guardrails").
export interface BookingsRepository {
  list(params: BookingQuery): Promise<Booking[]>;
  get(id: string): Promise<Booking>;
  create(input: CreateBooking): Promise<Booking>;
}

// The full set of repositories the app exposes. Grows one domain at a time.
export interface Repositories {
  bookings: BookingsRepository;
}
