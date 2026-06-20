import type { ReactNode } from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center gap-2 p-6">
      <Text className="text-lg font-semibold">{title}</Text>
      {description ? (
        <Text className="text-center text-muted-foreground">{description}</Text>
      ) : null}
      {action}
    </View>
  );
}

export { EmptyState };
