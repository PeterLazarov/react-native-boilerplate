import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@/auth/AuthContext';

// Signed-out stack. Bounces to the app if already authenticated.
export default function AuthLayout() {
  const { status } = useAuth();
  if (status === 'signedIn') return <Redirect href="/(app)" />;
  return <Stack screenOptions={{ headerShown: false }} />;
}
