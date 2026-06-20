import { TextInput, type TextInputProps } from 'react-native';
import { cn } from '@/lib/utils';

function Textarea({ className, ...props }: TextInputProps) {
  return (
    <TextInput
      multiline
      textAlignVertical="top"
      className={cn(
        'min-h-20 rounded-md border border-input bg-background px-3 py-2 text-base text-foreground',
        props.editable === false && 'opacity-50',
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
