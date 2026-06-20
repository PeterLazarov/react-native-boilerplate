import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@/auth/AuthContext';

// Signed-in stack. Guards every route behind authentication.
export default function AppLayout() {
  const { status } = useAuth();
  if (status === 'signedOut') return <Redirect href="/(auth)/sign-in" />;
  return <Stack />;
}
