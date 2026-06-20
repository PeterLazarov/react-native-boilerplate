import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { Pressable } from 'react-native';
import { TextClassContext } from '@/components/ui/text';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'group flex items-center justify-center rounded-md web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring',
  {
    variants: {
      variant: {
        default: 'bg-primary active:opacity-90 web:hover:opacity-90',
        destructive: 'bg-destructive active:opacity-90 web:hover:opacity-90',
        outline: 'border border-input bg-background active:bg-accent web:hover:bg-accent',
        secondary: 'bg-secondary active:opacity-80 web:hover:opacity-80',
        ghost: 'active:bg-accent web:hover:bg-accent',
        link: '',
      },
      size: {
        default: 'h-10 native:h-12 px-4 py-2 native:px-5 native:py-3',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 native:h-14 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
);

const buttonTextVariants = cva(
  'text-sm native:text-base font-medium text-foreground web:whitespace-nowrap web:transition-colors',
  {
    variants: {
      variant: {
        default: 'text-primary-foreground',
        destructive: 'text-destructive-foreground',
        outline: 'group-active:text-accent-foreground',
        secondary: 'text-secondary-foreground',
        ghost: 'group-active:text-accent-foreground',
        link: 'text-primary group-active:underline',
      },
      size: {
        default: '',
        sm: '',
        lg: 'native:text-lg',
        icon: '',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
);

type ButtonProps = ComponentProps<typeof Pressable> & VariantProps<typeof buttonVariants>;

function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <TextClassContext.Provider value={buttonTextVariants({ variant, size })}>
      <Pressable
        role="button"
        className={cn(
          props.disabled && 'opacity-50 web:pointer-events-none',
          buttonVariants({ variant, size }),
          className,
        )}
        {...props}
      />
    </TextClassContext.Provider>
  );
}

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };
