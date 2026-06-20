import { View } from 'react-native';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

type ErrorStateProps = {
  title?: string;
  description?: string;
  onRetry?: () => void;
};

function ErrorState({
  title = 'Something went wrong',
  description,
  onRetry,
}: ErrorStateProps) {
  return (
    <View className="flex-1 items-center justify-center gap-3 p-6">
      <Text className="text-lg font-semibold">{title}</Text>
      {description ? (
        <Text className="text-center text-muted-foreground">{description}</Text>
      ) : null}
      {onRetry ? (
        <Button variant="outline" onPress={onRetry}>
          <Text>Try again</Text>
        </Button>
      ) : null}
    </View>
  );
}

export { ErrorState };
