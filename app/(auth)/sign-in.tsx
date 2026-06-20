import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/auth/AuthContext';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

export default function SignIn() {
  const { t } = useTranslation();
  const { signIn } = useAuth();

  return (
    <View className="flex-1 items-center justify-center gap-6 bg-background p-6">
      <Text className="text-2xl font-semibold">{t('auth.signIn')}</Text>
      <Button
        onPress={() => signIn({ accessToken: 'dev-access', refreshToken: 'dev-refresh' })}
      >
        <Text>{t('auth.signIn')} (dev)</Text>
      </Button>
    </View>
  );
}
