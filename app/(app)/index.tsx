import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/auth/AuthContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary">
            <Text>Open dialog</Text>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog</DialogTitle>
            <DialogDescription>Rendered through the root PortalHost.</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Button variant="outline" onPress={signOut}>
        <Text>Sign out</Text>
      </Button>
    </View>
  );
}
