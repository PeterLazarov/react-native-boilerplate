import { ExpoConfig } from 'expo/config';

// Expo app config. Kept as TS so env-driven values (API base URL, Sentry DSN)
// can be read at build time. Native projects are generated from this via
// `expo prebuild` (Continuous Native Generation) — we do not hand-edit ios/android.
const config: ExpoConfig = {
  name: 'App Boilerplate',
  slug: 'app-boilerplate',
  scheme: 'appboilerplate', // deep-link scheme — required by expo-router + push/tracking links
  version: '0.1.0',
  orientation: 'portrait',
  userInterfaceStyle: 'automatic', // follow the OS light/dark setting
  newArchEnabled: true, // mandatory on recent SDKs; stated explicitly for clarity
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.example.appboilerplate',
  },
  android: {
    package: 'com.example.appboilerplate',
  },
  web: {
    bundler: 'metro',
    output: 'static',
  },
  plugins: [
    'expo-router',
    'expo-secure-store',
    'expo-localization',
    // '@sentry/react-native/expo', // enable once SENTRY_DSN is configured
    // Stripe / maps / background-geo plugins get added in later phases (see PLAN.md)
  ],
  experiments: {
    typedRoutes: true, // typed Expo Router routes
  },
  extra: {
    apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://localhost:4000',
    sentryDsn: process.env.EXPO_PUBLIC_SENTRY_DSN ?? '',
  },
};

export default config;
