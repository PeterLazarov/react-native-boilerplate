import { http } from './http';
import { Repositories } from './repositories/types';
import { RestBookingsRepository } from './repositories/rest/bookings.rest';

/**
 * THE SWAP POINT. Names the live implementation of each repository. Switching a
 * domain from REST to SQLite later is a one-line change here — nothing upstream
 * (hooks, screens) changes, because they depend on the interface, not this file.
 */
export const repositories: Repositories = {
  bookings: new RestBookingsRepository(http),
  // bookings: new SqliteBookingsRepository(db),  // <- future
};
