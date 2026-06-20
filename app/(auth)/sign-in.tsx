import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { z } from 'zod';
import { useAuth } from '@/auth/AuthContext';
import { Form } from '@/components/form/Form';
import { FormInput } from '@/components/form/FormInput';
import { Screen } from '@/components/Screen';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

const schema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
  password: z.string().min(6, 'Min 6 characters'),
});

type FormValues = z.infer<typeof schema>;

export default function SignIn() {
  const { t } = useTranslation();
  const { signIn } = useAuth();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = form.handleSubmit(() => {
    void signIn({ accessToken: 'dev-access', refreshToken: 'dev-refresh' });
  });

  return (
    <Screen scroll className="justify-center gap-8">
      <Text className="text-center text-2xl font-semibold">{t('auth.signIn')}</Text>
      <Form form={form}>
        <View className="gap-4">
          <FormInput<FormValues>
            name="email"
            label={t('auth.email')}
            placeholder="you@example.com"
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <FormInput<FormValues>
            name="password"
            label={t('auth.password')}
            placeholder="••••••"
            secureTextEntry
          />
          <Button onPress={onSubmit} disabled={form.formState.isSubmitting}>
            <Text>{t('auth.signIn')}</Text>
          </Button>
        </View>
      </Form>
    </Screen>
  );
}
