import { Pressable } from 'react-native';
import { MoonStar, Sun } from '@/lib/icons';
import { useColorScheme } from '@/lib/useColorScheme';

export function ThemeToggle() {
  const { isDarkColorScheme, toggleColorScheme } = useColorScheme();
  const Icon = isDarkColorScheme ? Sun : MoonStar;

  return (
    <Pressable
      role="button"
      accessibilityLabel="Toggle color scheme"
      onPress={toggleColorScheme}
      className="rounded-md p-2 active:opacity-70"
    >
      <Icon className="text-foreground" size={22} />
    </Pressable>
  );
}
