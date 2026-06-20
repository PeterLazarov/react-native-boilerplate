import { TextInput, type TextInputProps } from 'react-native';
import { cn } from '@/lib/utils';

function Input({ className, ...props }: TextInputProps) {
  return (
    <TextInput
      className={cn(
        'native:h-12 h-10 rounded-md border border-input bg-background px-3 text-base text-foreground web:w-full web:py-2',
        props.editable === false && 'opacity-50',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
