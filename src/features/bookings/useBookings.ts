import { useQuery } from '@tanstack/react-query';
import { BookingQuery } from '@/domain/booking';
import { useRepositories } from '@/data/repositories/context';

/**
 * The UI's only surface for bookings data. Screens call this — never useQuery,
 * the repository, or http directly. That indirection is what lets the data
 * source (REST → SQLite) OR the fetching strategy (TanStack Query → SQLite live
 * query) change later without screens noticing.
 */
export function useBookings(params: BookingQuery = {}) {
  const { bookings } = useRepositories();
  return useQuery({
    queryKey: ['bookings', params],
    queryFn: () => bookings.list(params),
  });
}
