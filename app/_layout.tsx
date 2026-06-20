import '../global.css';
import '@/i18n';

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
  type Theme,
} from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '@/auth/AuthContext';
import { persister, queryClient } from '@/data/queryClient';
import { RepositoriesProvider } from '@/data/repositories/context';
import { NAV_THEME } from '@/lib/constants';
import { initSentry } from '@/lib/sentry';
import { useColorScheme, useInitColorScheme } from '@/lib/useColorScheme';
import { RealtimeProvider } from '@/realtime/RealtimeProvider';

initSentry();

const LIGHT_THEME: Theme = { ...DefaultTheme, colors: NAV_THEME.light };
const DARK_THEME: Theme = { ...DarkTheme, colors: NAV_THEME.dark };

export default function RootLayout() {
  useInitColorScheme();
  const { isDarkColorScheme } = useColorScheme();

  return (
    <SafeAreaProvider>
      <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
        <RepositoriesProvider>
          <AuthProvider>
            <RealtimeProvider>
              <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
                <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
                <Stack screenOptions={{ headerShown: false }} />
                <PortalHost />
              </ThemeProvider>
            </RealtimeProvider>
          </AuthProvider>
        </RepositoriesProvider>
      </PersistQueryClientProvider>
    </SafeAreaProvider>
  );
}
