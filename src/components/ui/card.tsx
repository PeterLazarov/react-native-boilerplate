import type { ComponentProps } from 'react';
import { View, type ViewProps } from 'react-native';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

function Card({ className, ...props }: ViewProps) {
  return (
    <View
      className={cn('rounded-lg border border-border bg-card shadow-sm', className)}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: ViewProps) {
  return <View className={cn('flex flex-col gap-1.5 p-6', className)} {...props} />;
}

function CardTitle({ className, ...props }: ComponentProps<typeof Text>) {
  return (
    <Text
      role="heading"
      className={cn(
        'text-2xl font-semibold leading-none tracking-tight text-card-foreground',
        className,
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: ComponentProps<typeof Text>) {
  return <Text className={cn('text-sm text-muted-foreground', className)} {...props} />;
}

function CardContent({ className, ...props }: ViewProps) {
  return <View className={cn('p-6 pt-0', className)} {...props} />;
}

function CardFooter({ className, ...props }: ViewProps) {
  return (
    <View className={cn('flex flex-row items-center p-6 pt-0', className)} {...props} />
  );
}

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
