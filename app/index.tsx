import { Redirect } from 'expo-router';
import { View } from 'react-native';
import { useAuth } from '@/auth/AuthContext';

// Entry route: routes to the app or the auth flow once the session is known.
export default function Index() {
  const { status } = useAuth();

  if (status === 'loading') return <View className="flex-1 bg-background" />;
  return status === 'signedIn' ? (
    <Redirect href="/(app)" />
  ) : (
    <Redirect href="/(auth)/sign-in" />
  );
}
