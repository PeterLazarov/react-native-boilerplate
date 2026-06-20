import * as CheckboxPrimitive from '@rn-primitives/checkbox';
import type { ComponentProps } from 'react';
import { Check } from '@/lib/icons';
import { cn } from '@/lib/utils';

function Checkbox({
  className,
  ...props
}: ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        'h-5 w-5 shrink-0 rounded border border-primary',
        props.checked && 'bg-primary',
        props.disabled && 'opacity-50',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="h-full w-full items-center justify-center">
        <Check size={14} strokeWidth={3} className="text-primary-foreground" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
