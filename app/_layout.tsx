import '../global.css';
import '@/i18n';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PortalHost } from '@rn-primitives/portal';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { queryClient, persister } from '@/data/queryClient';
import { RepositoriesProvider } from '@/data/repositories/context';
import { AuthProvider } from '@/auth/AuthContext';
import { RealtimeProvider } from '@/realtime/RealtimeProvider';
import { initSentry } from '@/lib/sentry';

initSentry();

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
        <RepositoriesProvider>
          <AuthProvider>
            <RealtimeProvider>
              <StatusBar style="auto" />
              <Stack screenOptions={{ headerShown: false }} />
              {/* Overlay host for rn-primitives (Dialog, Select, Toast, …). */}
              <PortalHost />
            </RealtimeProvider>
          </AuthProvider>
        </RepositoriesProvider>
      </PersistQueryClientProvider>
    </SafeAreaProvider>
  );
}
