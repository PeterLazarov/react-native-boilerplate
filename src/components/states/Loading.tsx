import { View } from 'react-native';
import { Skeleton } from '@/components/ui/skeleton';

function Loading() {
  return (
    <View className="gap-3 p-4">
      <Skeleton className="h-6 w-2/3" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
    </View>
  );
}

export { Loading };
