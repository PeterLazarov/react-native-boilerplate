import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/auth/AuthContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

export default function Home() {
  const { t } = useTranslation();
  const { signOut } = useAuth();

  return (
    <View className="flex-1 items-center justify-center gap-4 bg-background p-6">
      <ThemeToggle />
      <Text className="text-2xl font-semibold">{t('home.title')}</Text>
      <Text className="text-center text-muted-foreground">
        {t('home.skeletonNotice')}
      </Text>
      <Button variant="outline" onPress={signOut}>
        <Text>Sign out</Text>
      </Button>
    </View>
  );
}
