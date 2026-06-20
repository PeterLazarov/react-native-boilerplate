import * as SwitchPrimitive from '@rn-primitives/switch';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

function Switch({ className, ...props }: ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        'h-6 w-11 shrink-0 flex-row items-center rounded-full border-2 border-transparent px-0.5',
        props.checked ? 'bg-primary' : 'bg-input',
        props.disabled && 'opacity-50',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          'h-5 w-5 rounded-full bg-background shadow',
          props.checked ? 'translate-x-5' : 'translate-x-0',
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
