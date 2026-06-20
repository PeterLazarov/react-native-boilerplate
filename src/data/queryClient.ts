import { QueryClient } from '@tanstack/react-query';
import type { PersistedClient, Persister } from '@tanstack/react-query-persist-client';
import { kv } from './kv/mmkv';

const PERSIST_KEY = 'rq-cache';

// Minimal synchronous persister backed by the KeyValueStore seam (MMKV). This is
// what gives "instant last-data on app open" without a local database.
export const persister: Persister = {
  persistClient: async (client: PersistedClient) => {
    kv.set(PERSIST_KEY, JSON.stringify(client));
  },
  restoreClient: async () => {
    const raw = kv.getString(PERSIST_KEY);
    return raw ? (JSON.parse(raw) as PersistedClient) : undefined;
  },
  removeClient: async () => {
    kv.delete(PERSIST_KEY);
  },
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 1000 * 60 * 60 * 24, // 24h — survives restarts via the persister
      retry: 2,
    },
  },
});
