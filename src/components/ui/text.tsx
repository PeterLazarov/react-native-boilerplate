import * as Slot from '@rn-primitives/slot';
import { createContext, useContext } from 'react';
import { Text as RNText, type TextProps } from 'react-native';
import { cn } from '@/lib/utils';

const TextClassContext = createContext<string | undefined>(undefined);

type Props = TextProps & {
  asChild?: boolean;
};

function Text({ className, asChild = false, ...props }: Props) {
  const textClass = useContext(TextClassContext);
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      className={cn('text-base text-foreground web:select-text', textClass, className)}
      {...props}
    />
  );
}

export { Text, TextClassContext };
