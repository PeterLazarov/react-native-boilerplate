import type { ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';
import { cn } from '@/lib/utils';

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
        <ScrollView
          contentContainerClassName={cn('grow p-4', className)}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      ) : (
        <View className={cn('flex-1 p-4', className)}>{children}</View>
      )}
    </SafeAreaView>
  );
}

export { Screen };
