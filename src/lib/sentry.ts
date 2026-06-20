import Constants from 'expo-constants';
import * as Sentry from '@sentry/react-native';

const dsn = (Constants.expoConfig?.extra?.sentryDsn as string | undefined) ?? '';

/**
 * Initialise crash/error reporting. No-ops when no DSN is configured so local
 * dev and CI don't ship noise. Call once, as early as possible (root layout).
 */
export function initSentry() {
  if (!dsn) return;
  Sentry.init({
    dsn,
    enableAutoSessionTracking: true,
    tracesSampleRate: 0.2,
  });
}

export { Sentry };
