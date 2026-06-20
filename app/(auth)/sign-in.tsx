import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/auth/AuthContext';

// Placeholder sign-in. Real OTP/password flow lands in Phase 1 (see PLAN.md).
// The dev button injects fake tokens so the signed-in stack is reachable.
export default function SignIn() {
  const { t } = useTranslation();
  const { signIn } = useAuth();

  return (
    <View className="flex-1 items-center justify-center gap-6 bg-background p-6">
      <Text className="text-2xl font-semibold text-foreground">{t('auth.signIn')}</Text>
      <Pressable
        className="rounded-lg bg-primary px-6 py-3"
        onPress={() => signIn({ accessToken: 'dev-access', refreshToken: 'dev-refresh' })}
      >
        <Text className="font-medium text-primary-foreground">
          {t('auth.signIn')} (dev)
        </Text>
      </Pressable>
    </View>
  );
}
