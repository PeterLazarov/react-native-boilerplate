import type { ComponentProps } from 'react';
import type { FieldPath, FieldValues } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FormField } from './FormField';

type FormInputProps<T extends FieldValues> = {
  name: FieldPath<T>;
  label?: string;
} & Omit<ComponentProps<typeof Input>, 'value' | 'onChangeText' | 'onBlur'>;

function FormInput<T extends FieldValues>({
  name,
  label,
  ...inputProps
}: FormInputProps<T>) {
  return (
    <FormField<T>
      name={name}
      label={label}
      render={(field) => (
        <Input
          value={(field.value as string | undefined) ?? ''}
          onChangeText={field.onChange}
          onBlur={field.onBlur}
          {...inputProps}
        />
      )}
    />
  );
}

export { FormInput };
