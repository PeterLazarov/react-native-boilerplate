import type { ReactNode } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';
import { cn } from '@/lib/utils';

const KEYBOARD_TOOLBAR_HEIGHT = 42;
const KEYBOARD_BOTTOM_OFFSET = KEYBOARD_TOOLBAR_HEIGHT + 16;

type ScreenProps = {
  children: ReactNode;
  scroll?: boolean;
  edges?: Edge[];
  className?: string;
};

function Screen({
  children,
  scroll = false,
  edges = ['top', 'bottom'],
  className,
}: ScreenProps) {
  return (
    <SafeAreaView edges={edges} className="flex-1 bg-background">
      {scroll ? (
        <KeyboardAwareScrollView
          bottomOffset={KEYBOARD_BOTTOM_OFFSET}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View className={cn('grow p-4', className)}>{children}</View>
        </KeyboardAwareScrollView>
      ) : (
        <View className={cn('flex-1 p-4', className)}>{children}</View>
      )}
    </SafeAreaView>
  );
}

export { Screen };
