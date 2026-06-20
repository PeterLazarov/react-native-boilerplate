import { Booking, BookingQuery, CreateBooking } from '@/domain/booking';
import { Http } from '@/data/http';
import { BookingsRepository } from '../types';

// Wire format from the REST API. Stays confined to this file — mapped to the
// domain Booking below so the API's shape never leaks into the app.
interface BookingDto {
  id: string;
  service_id: string;
  status: string;
  scheduled_at: string;
}

function toBooking(dto: BookingDto): Booking {
  return {
    id: dto.id,
    serviceId: dto.service_id,
    status: dto.status as Booking['status'],
    scheduledAt: dto.scheduled_at,
  };
}

export class RestBookingsRepository implements BookingsRepository {
  constructor(private http: Http) {}

  async list(params: BookingQuery): Promise<Booking[]> {
    const search = params.status ? { status: params.status } : undefined;
    const dtos = await this.http
      .get('bookings', { searchParams: search })
      .json<BookingDto[]>();
    return dtos.map(toBooking);
  }

  async get(id: string): Promise<Booking> {
    const dto = await this.http.get(`bookings/${id}`).json<BookingDto>();
    return toBooking(dto);
  }

  async create(input: CreateBooking): Promise<Booking> {
    const dto = await this.http
      .post('bookings', {
        json: { service_id: input.serviceId, scheduled_at: input.scheduledAt },
      })
      .json<BookingDto>();
    return toBooking(dto);
  }
}
