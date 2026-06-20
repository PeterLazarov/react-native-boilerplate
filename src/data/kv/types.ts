/**
 * Key-value storage contract. The app depends on this interface, never on MMKV
 * directly — so the backing store (MMKV today, a SQLite-backed store later) can
 * be swapped in one place without touching call sites.
 */
export interface KeyValueStore {
  getString(key: string): string | null;
  set(key: string, value: string): void;
  delete(key: string): void;
}
