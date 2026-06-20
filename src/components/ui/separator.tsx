import { View, type ViewProps } from 'react-native';
import { cn } from '@/lib/utils';

type SeparatorProps = ViewProps & {
  orientation?: 'horizontal' | 'vertical';
};

function Separator({ className, orientation = 'horizontal', ...props }: SeparatorProps) {
  return (
    <View
      role="none"
      className={cn(
        'shrink-0 bg-border',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        className,
      )}
      {...props}
    />
  );
}

export { Separator };
