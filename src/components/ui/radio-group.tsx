import * as RadioGroupPrimitive from '@rn-primitives/radio-group';
import type { ComponentProps } from 'react';
import { View } from 'react-native';
import { cn } from '@/lib/utils';

function RadioGroup({
  className,
  ...props
}: ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return <RadioGroupPrimitive.Root className={cn('gap-2', className)} {...props} />;
}

function RadioGroupItem({
  className,
  ...props
}: ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        'h-5 w-5 items-center justify-center rounded-full border border-primary',
        props.disabled && 'opacity-50',
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="items-center justify-center">
        <View className="h-2.5 w-2.5 rounded-full bg-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
