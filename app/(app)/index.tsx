import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/auth/AuthContext';

// Home placeholder. Real discovery/booking screens arrive in Phases 2–3.
// Data is fetched via domain hooks (e.g. `useBookings()` in
// src/features/bookings) — wired in once the backend exists.
export default function Home() {
  const { t } = useTranslation();
  const { signOut } = useAuth();

  return (
    <View className="flex-1 items-center justify-center gap-4 bg-background p-6">
      <Text className="text-2xl font-semibold text-foreground">{t('home.title')}</Text>
      <Text className="text-center text-muted-foreground">
        {t('home.skeletonNotice')}
      </Text>
      <Pressable className="rounded-lg border border-border px-4 py-2" onPress={signOut}>
        <Text className="text-foreground">Sign out</Text>
      </Pressable>
    </View>
  );
}
