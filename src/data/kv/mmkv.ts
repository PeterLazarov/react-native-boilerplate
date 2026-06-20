import { MMKV } from 'react-native-mmkv';
import { KeyValueStore } from './types';

const mmkv = new MMKV({ id: 'app-storage' });

// MMKV-backed implementation of the KeyValueStore seam.
export const kv: KeyValueStore = {
  getString: (key) => mmkv.getString(key) ?? null,
  set: (key, value) => mmkv.set(key, value),
  delete: (key) => mmkv.delete(key),
};
