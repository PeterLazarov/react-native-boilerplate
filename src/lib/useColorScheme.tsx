import { useColorScheme as useNativewindColorScheme } from 'nativewind';
import { useEffect } from 'react';
import { kv } from '@/data/kv/mmkv';

const THEME_KEY = 'app.theme';
export type Scheme = 'light' | 'dark';

function getStoredScheme(): Scheme | null {
  const v = kv.getString(THEME_KEY);
  return v === 'light' || v === 'dark' ? v : null;
}

export function useInitColorScheme() {
  const { setColorScheme } = useNativewindColorScheme();
  useEffect(() => {
    const stored = getStoredScheme();
    if (stored) setColorScheme(stored);
  }, [setColorScheme]);
}

export function useColorScheme() {
  const { colorScheme, setColorScheme: setNativewind } = useNativewindColorScheme();
  const scheme: Scheme = colorScheme === 'dark' ? 'dark' : 'light';

  function setColorScheme(next: Scheme) {
    setNativewind(next);
    kv.set(THEME_KEY, next);
  }

  function toggleColorScheme() {
    setColorScheme(scheme === 'dark' ? 'light' : 'dark');
  }

  return {
    colorScheme: scheme,
    isDarkColorScheme: scheme === 'dark',
    setColorScheme,
    toggleColorScheme,
  };
}
